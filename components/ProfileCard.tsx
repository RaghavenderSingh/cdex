"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTokens } from "@/app/hooks/useTokens";
import { TokenList } from "./TokenList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Swap } from "./Swap";

export const ProfileCard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    // TODO: replace with a skeleton
    return <div>Loading...</div>;
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }
  return (
    <div className="flex justify-center pt-8">
      <div className="max-w-4xl bg-white rounded shadow w-full p-12">
        <Greeting
          image={session.data?.user?.image ?? ""}
          name={session.data?.user?.name ?? ""}
        />
        <Assets publicKey={publicKey} />
      </div>
    </div>
  );
};

function Greeting({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex p-12">
      <img src={image} className="rounded-full w-16 h-16 mr-4" />
      <div className="text-2xl font-semibold flex flex-col justify-center">
        Welcome back, {name}
      </div>
    </div>
  );
}
function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);
  const { tokenBalances, loading } = useTokens(publicKey);
  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);
  console.log("122", tokenBalances);
  if (loading) {
    return "Loading...";
  }
  return (
    <>
      <div className="text-slate-500 mt-4">
        Acccount Assets
        <br />
        <div className="flex justify-between">
          <div className="flex">
            <div className="text-5xl font-bold text-black">
              ${tokenBalances?.totalBalance}
            </div>
            <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
              USD
            </div>
          </div>
          <div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(publicKey);
                setCopied(true);
              }}
            >
              {copied ? "Copied" : "Wallet Address"}
            </Button>
          </div>
        </div>
        <Tabs defaultValue="account" className="w-full mt-5">
          <TabsList className="w-full justify-evenly p-6">
            <TabsTrigger className="text-xl  " value="account">
              Send
            </TabsTrigger>
            <TabsTrigger disabled className="text-xl " value="addFunds">
              Add funds
            </TabsTrigger>
            <TabsTrigger disabled className="text-xl " value="withdraw">
              Withdraw
            </TabsTrigger>
            <TabsTrigger className="text-xl " value="swap">
              Swap
            </TabsTrigger>
          </TabsList>
          <div className="pt-4 bg-slate-50 p-12 mt-4">
            <TabsContent value="account">
              <TokenList tokens={tokenBalances?.tokens || []} />
            </TabsContent>
            <TabsContent value="addFunds">
              Change your password here.
            </TabsContent>
            <TabsContent value="withdraw">
              Change your password here.
            </TabsContent>
            <TabsContent value="swap">
              <Swap tokenBalances={tokenBalances} publicKey={publicKey} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
