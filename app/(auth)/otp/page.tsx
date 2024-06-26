"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { emailOtp, getLoggedInUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

interface PageProps {
  searchParams: { userid: string }; // Define the type for searchParams
}

const page =  ({ searchParams }: PageProps) => {
  const { toast } = useToast()
  const router = useRouter()
  // console.log(loggedIn.userId)
  console.log(searchParams.userid);
  const userId = searchParams.userid;
  console.log(userId);

  const [isLoading, setIsLoading] = useState(false)
    const [isauthenticated, setisauthenticated] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    
   

    // const userIdp = userId.userId.userId

    try {
      const userData = {
        otp: values.otp,
        userId: userId
        
      };

     
      
      const newUser = await emailOtp(userData);
      if(!newUser){
        return toast({
          title: "Authentication Failed ",
          description: "Input the correct otp code sent to your email.",
          className:"bg-red-500"
        })
      }

      if(newUser){
      form.reset()
       router.push('/')
        return toast({
          title: "Authentication Sucessful ",
          description: "You will be redirected shortly.",
          className:"bg-green-700"
        })

        
      }
      setisauthenticated(newUser!);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    };

  }
  return (
    <section className="flex-center size-full max-sm:px-6">
  <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/sign" className="  cusor-pointer flex items-center gap-1 ">
          <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">
            {" "}
            360 Broker{" "}
          </h1>
        </Link>


        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-26 font-semibold text-gray-900">
            Authentication Otp
          </h1>
          
        </div>

      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Authentication Otp</FormLabel> */}
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
         <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  ) :(
                    "Submit"
                  )
                    
                  }
                </Button>
              </div>
        </form>
      </Form>
    </section>
    </section>
  );
};

export default page;
