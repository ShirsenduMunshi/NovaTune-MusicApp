"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    // { name: "Playlists", href: "/playlists" },
    // { name: "Galaxy", href: "/galaxy" },
];

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        setDarkMode(theme === "dark");
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <nav className="w-full sticky top-0 left-0 px-4 py-2 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur z-10">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-foreground tracking-wide flex items-center justify-center">
                        <img src="/logo.png" alt="NovaTune Logo" className="w-8 h-8 mr-2" />
                        NovaTune
                    </span>
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <div className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition">
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2 mx-2">
                    <ModeToggle />
                    <MobileMenu navLinks={navLinks} />
                </div>
            </div>
        </nav>
    );
}

function MobileMenu({ navLinks }) {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open Menu">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
                            <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
                            <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
                        </svg>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="right"
                    className="flex flex-col gap-6 px-6 py-12 bg-background/80 backdrop-blur-lg border-l border-border shadow-xl rounded-l-xl"
                >
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-foreground">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold text-foreground tracking-wide flex items-center justify-center">
                                    <img src="/logo.png" alt="NovaTune Logo" className="w-8 h-8 mr-2" />
                                    NovaTune
                                </span>
                            </Link>
                        </h2>
                        <hr className="border-2 border-blue-700 my-4" />
                    </div>
                    {/* <Separator className="mx-2" /> */}
                    {/* <Separator orientation="vertical" /> */}
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="w-full h-auto rounded-2xl bg-[#1447e633] p-2 text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </SheetContent>

            </Sheet>
        </div>
    );
}
