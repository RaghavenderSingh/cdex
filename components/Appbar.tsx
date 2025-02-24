"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

export const Appbar = () => {
  const session = useSession();
  return (
    <header className="py-4 border-b md:border-none fixed top-0 left-0 right-0 z-10 bg-white md:bg-white/0">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center md:border md:p-2.5 rounded-xl max-w-2xl lg:max-w-4xl mx-auto md:bg-white/90 md:backdrop:blur-sm">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center">
              {/* <Logo className="h-8 w-8" fill="#000000" /> */}
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <Link
                className="text-black/70 hover:text-black transition"
                href="#"
              >
                Products
              </Link>
              <Link
                className="text-black/70 hover:text-black transition"
                href="#"
              >
                API & Docs
              </Link>
              <Link
                className="text-black/70 hover:text-black transition"
                href="#"
              >
                FAQ
              </Link>
              <Link
                className="text-black/70 hover:text-black transition"
                href="#"
              >
                Company
              </Link>
              <Link
                className="hidden lg:block text-black/70 hover:text-black transition"
                href="#"
              >
                Blogs
              </Link>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            {session.data?.user ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button onClick={() => signIn()}>SignIn</Button>
            )}
            <span className="md:hidden">
              <Menu />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
