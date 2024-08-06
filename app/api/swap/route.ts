import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db"
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import { connection } from "@/lib/constants";

export async function POST(req: NextRequest) {
    console.log("123")
    const session = await getServerSession(authConfig)
    const data: {
        quoteResponse: any
    } = await req.json();
    if (!session?.user) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 401
        })
    }
    const solWallet = await db.db1.solWallet.findFirst({
        where: { userId: session.user.uid }
    })
    console.log("solWallet", solWallet)
    if (!solWallet) {
        return NextResponse.json({
            message: "Couldnt find associated solana wallet"
        }, {
            status: 401
        })
    }
    // get serialized transactions for the swap
    const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // quoteResponse from /quote api
                quoteResponse: data.quoteResponse,
                // user public key to be used for the swap
                userPublicKey: solWallet.publicKey,
                // auto wrap and unwrap SOL. default is true
                wrapAndUnwrapSol: true,
                // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
                // feeAccount: "fee_account_public_key"
            })
        })
    ).json();
    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    console.log(transaction);

    const privateKet = getPrivateKeyFromDb(solWallet.privateKey);

    // sign the transaction
    transaction.sign([privateKet]);
    const latestBlockHash = await connection.getLatestBlockhash();

    // Execute the transaction
    const rawTransaction = transaction.serialize()
    const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2
    });
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
    });
    console.log(`https://solscan.io/tx/${txid}`);
    return NextResponse.json({
        txid
    })


}

function getPrivateKeyFromDb(privateKey: string) {
    const arr = privateKey.split(",").map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}