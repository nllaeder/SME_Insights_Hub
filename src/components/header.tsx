
"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={user ? "/dashboard" : "/"} className="mr-auto flex items-center gap-2">
          <Image
            src="/logo.png"
            width={130}
            height={65}
            alt="Logo"
            className="h-[65px] w-auto"
          />
          <span className="font-bold">SME Insights Hub</span>
        </Link>
        <div className="flex items-center gap-2">
            <ModeToggle />
            {user && <UserNav />}
        </div>
      </div>
    </header>
  );
}
