import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { getAdminLoggedInUser } from "@/lib/actions/user.actions";
import { redirect} from 'next/navigation'
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileNav from "@/components/AdminMobileSidebar";

export  default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const loggedIn = await getAdminLoggedInUser()

  if(!loggedIn){
    console.log('no user')
    redirect('/admin/sign-in')
  } 

  return (
    <html lang="en">
      <main className="flex h-screen w-full font-inter">
        <AdminSidebar user={loggedIn} />
        <div className="flex size-full flex-col ">
          <div className="root-layout">
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            <div>
            <AdminMobileNav user={loggedIn} />
            </div>
          </div>
          {children}
        </div>

        
      </main>
    </html>
  );
}
