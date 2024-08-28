import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="flex items-center justify-between p-2 bg-black text-white rounded-xl my-4 fixed top-0 w-[calc(100%-32px)] z-[100]">
      <div className="flex items-center p-2">
        <Link
          href="/"
          className="text-xl text-wrap font-bold flex items-center"
        >
          SellerROI
        </Link>
      </div>
      <div className="flex space-x-6 bg-zinc-800 p-2 rounded-lg text-white px-8">
        <NavLink href="/calculator">Calculator</NavLink>
        <NavLink href="/reports">Reports</NavLink>
        <NavLink href="/documents">Documents</NavLink>
        <NavLink href="/history">History</NavLink>
        <NavLink href="/settings">Settings</NavLink>
      </div>
      <div className="flex space-x-2">
        {isSignedIn ? (
          <div className="pr-2 flex justify-center items-center">
          <UserButton appearance={
          {
            elements: {
              userButtonAvatarBox: {
                height: 40,
                width: 40,
              }
          },
          }} />
          </div>
        ) : (
          <SignUpButton mode="modal">
            <Button
              variant="outline"
              className="bg-white text-black rounded-lg p-5"
            >
              Sign In / Up
            </Button>
          </SignUpButton>
        )}
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
};

export default Navbar;
