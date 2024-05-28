"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

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
import { authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import EmailOtp from "./EmailOtp";

const AuthForm = ({ type }: { type: string }) => {
  const { toast } = useToast()
const router = useRouter();
const formSchema = authformSchema(type)
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [apiError, setApiError] = useState<any>(null);
  
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
       if(type === 'sign-up'){

        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address: data.address!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateofBirth: data.dateofBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }
       
            const newUser = await signUp(userData);
            form.reset()
            setuser(newUser)  

            if(!newUser){
              return toast({
                title: "Sign Up Failed ",
                description: "An error occured please try again.",
                className:"bg-red-500"
              })
            }
        
       }

       if(type === 'sign-in'){
        const response = await signIn({
            email: data.email,
            password: data.password 
        })

        
        if(!response){
          return toast({
            variant: "destructive",
            title: "Sign In Failed ",
            description: "Invalid credentials. Please check the email and password.",
            className:"bg-red-500"
          },
         
          )
        }

        // if(error){
        //   setApiError(error.message)
        // }

        if(response) router.push('/')
       }

    } catch (error:any) {
        // setApiError(error.message)
        if (error.response) {
        const errorData = await error.response.json();
        setApiError(errorData.error); 
      } else {
        console.error("Unexpected error:", error);
      }
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
            360 Broker{" "}
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-26 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? (
                <div>
                    <p> We sent a confrimation emaill to the provided email </p>
                </div>
              )
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
           <Link href="/" >
           <Button type="submit" className="form-btn" disabled={isLoading}>
            Get Started
            </Button>
            </Link>
           
            </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                <div className="flex gap-4">
                <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First name"
                    placeholder="Enter your First Name"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                  />
                </div>
                 
                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter your specific Address"
                  />
                      <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your City"
                  />
                  <div className="flex gap-4 ">
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="Example: NY"
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="postalCode"
                    placeholder="Example: 11101"
                  />
                  </div>
                  <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="dateofBirth"
                    label="Date of Birth "
                    placeholder="YYYY-MM-DD"
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN "
                    placeholder="Example:1234"
                  />
                  </div>
                  
                </>
              )}
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
              {apiError && ( 
                 <FormMessage>
                  {apiError.message}
                 </FormMessage>
                )}
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600 ">
              {type === "sign-in"
                ? "Dont have an account? "
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
