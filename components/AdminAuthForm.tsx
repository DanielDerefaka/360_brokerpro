"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { adminformSchema, authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { adminSignIn } from "@/lib/actions/user.actions";


const AdminAuthForm = () => {
const router = useRouter();
const formSchema = adminformSchema()
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        
  
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
    try {
      

      
        const response = await adminSignIn({
            email: data.email,
            password: data.password 
        })

        if(response) router.push('/admin/pages/dashboard')
       

    } catch (error) {
        console.log(error)
    } finally {
        setisLoading(false);
    }
   
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/sign" className="  cusor-pointer flex items-center gap-1 ">
          <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">
            {" "}
            Admin 360 Broker{" "}
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-26 font-semibold text-gray-900">
            Sign In
          </h1>
          
        </div>
      </header>
      
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your Email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your Password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          
        </>
    
    </section>
  );
};

export default AdminAuthForm;
