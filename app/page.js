"use client"
import { Layers, Layout, LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[url(/backgroundimages/Abstract-White-2.png)] bg-cover bg-center bg-no-repeat bg-fixed">

        <div className="">
          <Image
            src="/tnmmlogotransparent.PNG"
            width={40}
            height={40}
            alt="True North Logo Transparent"
            className="m-auto mb-2"
          />
          <h1 className=" text-5xl font-bold text-black mb-5">TrueNorth Progress & Accountability Tracker</h1>

          <div className="flex justify-center items-center gap-2">
            {!session && (<>
              <Link href="/signin">
                <button
                  type="button"
                  className="btn-sm bg-zinc-900 rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm mb-2 flex items-center gap-2 hover:cursor">
                  <LogIn size={15} className=" text-zinc-50" /> &nbsp; Sign in
                </button>
              </Link>
            </>)}

            {session && (
              <>
                <Link href="/dashboard">
                  <button
                    type="button"
                    className="btn-sm bg-cyan-900 rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm mb-2 flex items-center gap-2">
                    <Layout size={15} className=" text-zinc-50" /> &nbsp; Dashboard
                  </button>
                </Link>
              </>
            )}


            {session && (
              <>
                <button
                  onClick={() => signOut()}
                  type="button"
                  className="btn-sm bg-red-700 rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm mb-2 flex items-center gap-2">
                  <LogOut size={15} className=" text-zinc-50" /> &nbsp; Signout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
