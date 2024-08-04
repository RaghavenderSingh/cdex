import { ProfileCard } from "@/components/ProfileCard";
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

async function getUserWallet() {
  const session = await getServerSession(authConfig);
  const userWallet = await db.solWallet.findFirst({
    where: {
      userId: session?.user.uid,
    },
    select: {
      publicKey: true,
    },
  });
  if (!userWallet) {
    return { error: "No wallet found try to sign in again" };
  }
  return { error: null, userWallet };
}

export default async function () {
  const userWallet = await getUserWallet();
  if (userWallet.error) {
    return <>No Solana wallet found</>;
  }
  return (
    <div>
      <ProfileCard publicKey={userWallet.userWallet?.publicKey ?? ""} />
    </div>
  );
}
