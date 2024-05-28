"use client"

import { adminsidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Fotter from "./Fotter";

const AdminSidebar = ({ user }: SiderbarProps) => {

const pathname = usePathname()
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/admin/"
          className="mb-12 cusor-pointer flex items-center gap-2"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo"> 360 Broker </h1>
        </Link>

        {adminsidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          return (
            <Link href={item.route} key={item.label} className={cn('sidebar-link', {
                'bg-bankGradient': isActive
            })}>
              <div className="relative size-6">
                <Image src={item.imgURL} alt={item.label} fill className={cn({'brightness-[3] invert-0': isActive})} />
              
              </div>
              <p className={cn('sidebar-label', {
               ' !text-white': isActive
              } )}>
              {item.label}
              </p>
            </Link>
          );
        })}

        USER

      </nav>


      <Fotter user={user}/>
    </section>
  );
};

export default AdminSidebar;
