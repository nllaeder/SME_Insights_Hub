
"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/logo-dark.png"); // Default src

  useEffect(() => {
    // The theme is only known on the client, so we use useEffect to avoid hydration mismatches.
    setLogoSrc(theme === 'dark' ? '/logo-light.png' : '/logo-dark.png');
  }, [theme]);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={user ? "/dashboard" : "/"} className="mr-auto flex items-center gap-2">
          <Image
            src={logoSrc}
            width={130}
            height={65}
            alt="Logo"
            className="h-[65px] w-auto"
            key={logoSrc} // Add key to force re-render on src change
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
