import { DocsSearch } from "@/components/DocsSearch";
import { Icons } from "@/components/Icons";
import MainNav from "@/components/MainNav";
import { DocsSidebarNav } from "@/components/sidebar-nav";
import { SiteFooter } from "@/components/site-footer";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import React from "react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <DocsSearch />
            </div>
            <nav className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-7 w-7 border-border border-2 rounded-full " />
                <span className="sr-only">GitHub</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
