
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import {redirect} from 'next/navigation'
import Sidebar from '@/components/site/sidebar'
import { ThemeProvider } from "@/components/ThemeProvider";

export  default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  


  return (
    <html lang="en">
      <main className="h-full">
        
     
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > 
           <Sidebar/>
        
        {children}
        </ThemeProvider>

        
      </main>
    </html>
  );
}
