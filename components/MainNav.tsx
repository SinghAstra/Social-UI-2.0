"use client";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import { Icons } from "./Icons";
import { MobileNav } from "./mobile-nav";

interface MainNavProps {
  items?: NavItem[];
  children?: React.ReactNode;
}

const MainNav = ({ items, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="md:flex items-center gap-2 hidden">
        <Icons.logo />
        <span className="hidden sm:inline-block md:text-2xl lg:text-2xl">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Icons.menu />
        <span className="font-semibold">SinghAstra</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
};

export default MainNav;
