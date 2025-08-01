"use client"

import { CircleUser, Key, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Script from "next/script";

import { signIn, useSession } from "next-auth/react"

export default function Signin() {
    const { data: session } = useSession();
    console.log(session);

    session ? redirect("/") : null
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-[url(/backgroundimages/Abstract-White-2.png)] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="py-6 px-6 w-80 shadow-md rounded-md bg-white text-center">
                    <div className="mb-4 text-black font-sans font-bold">
                        <Link href="/">
                            <Image
                                src="/tnmmlogotransparent.PNG"
                                width={40}
                                height={40}
                                alt="True North Logo Transparent"
                                className="m-auto mb-2"
                            />
                        </Link>
                        <div className="my-0">Welcome!</div>
                        <span className="font-sans font-bold text-xs text-zinc-500" >Login to access your account</span>
                    </div>

                    <div className="hidden">
                        <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                            <CircleUser size={15} className="text-red-700" />
                            <input type="text" className="grow" placeholder="Email" />
                        </label>

                        <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-4">
                            <Key size={15} className="text-red-700" />
                            <input type="password" className="grow" placeholder="Password" />
                        </label>

                        <div className="flex justify-between items-center gap-3">
                            <Link href="/signup">
                                <button
                                    type="button"
                                    className="btn-xs text-red-700 rounded-full font-sans font-semibold">
                                    No credentials? Sign Up
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="btn-sm bg-red-700 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                Signin
                            </button>
                        </div>

                        <div className="font-sans font-bold text-xs text-zinc-500 my-4" >Or</div>
                    </div>

                    <button
                        onClick={() => signIn()}
                        type="button"
                        className="btn-sm bg-zinc-900 w-full rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm mb-2 ">
                        <i className="fas fa-user"></i> &nbsp; Continue with Credentials
                    </button>
                    <div className="flex justify-center items-center gap-3">
                        <Link href="/signup">
                            <button
                                type="button"
                                className="btn-xs text-xs text-red-700 rounded-full font-sans font-semibold">
                                No credentials? Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Script src="https://kit.fontawesome.com/dcd356c426.js" />
        </>
    );
}
