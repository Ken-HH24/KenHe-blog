import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import MobileMenu from './MobileMenu';
import ThemeButton from "./ThemeButton";

interface NavItemProps {
  href: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, text }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={`${
          isActive
            ? "font-semibold text-gray-800 dark:text-gray-200"
            : "font-normal text-gray-600 dark:text-gray-400"
        } hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'`}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
};

interface IProps {
  children: ReactNode;
}

const Container: React.FC<IProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <div className="ml-[-0.60rem]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/blog" text="Blog" />
          </div>
          <ThemeButton />
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      >
        {children}
      </main>
    </div>
  );
};

export default Container;
