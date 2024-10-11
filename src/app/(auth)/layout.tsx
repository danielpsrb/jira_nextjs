"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children}: AuthLayoutProps) => {
    const pathname = usePathname();
    const hasSignIn = pathname === "/sign-in";

    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image src="/logo2.svg" alt="logo" width={152} height={56} />
                    <Button variant="secondary">
                        <Link href={hasSignIn ? "/sign-up" : "/sign-in"}>
                            { pathname === "/sign-in" ? "Sign Up" : "Login" }
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col justify-center items-center pt-4 md:pt-14">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default AuthLayout