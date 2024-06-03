// import React from 'react';
"use client";
import React, { act, useEffect, useRef, useState } from "react";
import HeaderBox from "./HeaderBox";
import CryptoSelect from "./CryptoSelect";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast, useToast } from "./ui/use-toast";
// import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Message, getLoggedInUser } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  content: z.string().nonempty("Please select a coin.").min(1),
  subject: z.string().nonempty("Please enter an amount.").min(1),
});

const EmailForm = () => {
  const loggedIn = getLoggedInUser();
  // Define state to store the selected value
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<any>();
  const [amount, setAmount] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: "",
      content: "",
      //   plan: ""/
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        subject: data.subject,
        content: data.content,
      };

      const newUser = await Message(userData);
      setDeposit(newUser);

      if (!newUser) {
        return toast({
          title: "Investment Failed ",
          description: "Try Again",
          className: "bg-red-500",
        });
      }

      if (newUser) {
        return toast({
          title: "Investment Sucessful ",
          description: "",
          className: "bg-green-700",
        });

        //   router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          {/* <input type="hidden" {...form.register("plan")} value={activePlan} /> */}
          <p className="text-muted-foreground text-[12px]">Billing</p>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label"></FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Subject"
                      className="input-class"
                      type="text"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label"></FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Content"
                      className="input-class"
                      type="text"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-blue-600 mt-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Send Mails"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailForm;
