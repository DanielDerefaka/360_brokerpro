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
import { authformSchema, otpformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { emailOtp } from "@/lib/actions/user.actions";

const EmailOtp = ({ type }: { type: string }) => {
    const router = useRouter();
    const formSchema = authformSchema(type)
    const [user, setuser] = useState(null);
    const [isLoading, setisLoading] = useState(false);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            
      
          otp: "",
         
        },
      });
    
      // 2. Define a submit handler.
      const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setisLoading(true);
        try {
           if(type === 'otp'){
           
                const newUser = await emailOtp(data);
    
                // setuser(newUser)  

                if(newUser) router.push('/')
            
           }
    
           
          
            // const response = await emailOtp({
            //     otp: data.otp
               
            // })

    
          
           
    
        } catch (error) {
            console.log(error)
        } finally {
            setisLoading(false);
        }
       
      }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <>
                
                <CustomInput
                    control={form.control}
                    name="otp"
                    label="Otp Code"
                    placeholder="otp"
                  />
                  
                 
                 
                  
                  
                </>
            
              
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  )  : (
                    "Enter Otp"
                  )}
                </Button>
              </div>
            </form>
          </Form>

    </div>
  )
}

export default EmailOtp