import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./modetoggle";

const sidebar = () => {
  return (
    <div className="p-4 fixed top-0 left-0 dark:bg-[#020818] right-0 z-10 flex items-center justify-between">
      <aside className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="image" width={40} height={40} />
        <span className="text-xl font-bold ">360 Broker Fx.</span>
      </aside>

      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%]  translate-y-[-50%] ">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"/"}> Home </Link>
          <Link href={"#"}> About </Link>
          <Link href={"#"}> Trading with us </Link>
          <Link href={"#"}> Company </Link>
          <Link href={"#"}> Contact </Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        {/* <Link
          href="/sign-up"
          className=" border-[2px] border-black p-2 text-black  hover:bg-gray-200/80 px-4 rounded-md"
        >
          Sign Up
        </Link> */}

        <Link
          href="/sign-in"
          className="bg-primary text-white  px-4  rounded-md"
        >
          <Button className="text-white font-bold text-[12px]">Login</Button>
        </Link>

        {/* <UserButton afterSignOutUrl="/"/>  */}
        <ModeToggle/>
      </aside>
    </div>
  );
};

export default sidebar;
