"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "./ui/input";
import { useState } from "react";

const FormSchema = z.object({
  deposit: z.string({
    required_error: "Please a coin.",
  }),

  amount: z.string({
    required_error: "Please enter an amount.",
  }),
});

const CryptoSelect = () => {

   // Define state to store the selected value
   const [selectedCoin, setSelectedCoin] = useState("");


   const handleCoinSelection = (value: string) => {
    setSelectedCoin(value);
    // You can use the selected value here to perform any desired action
    console.log("Selected Coin:", value);
    // Call your function or perform any other action here

    if(value === 'USDT') {
      return 'usdt wallet'
    }

    if(value === 'BTC') {
      return 'Btc Wallet'
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }




  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

     <FormField
          control={form.control}
          name="deposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-bold mb-5">Coin</FormLabel>
              <Select onValueChange={(newValue) => {
            // Update state and call the function
            setSelectedCoin(newValue);
            handleCoinSelection(newValue);
            // Also update the form field value if needed
            field.onChange(newValue);
          }} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a Coin to Deposit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="BTC" className="cursor-pointer">
                    Bitcoin (BTC){" "}
                  </SelectItem>
                  <SelectItem value="USDT" className="cursor-pointer">
                    USDT{" "}
                  </SelectItem>
                  {/* <SelectItem value="m@support.com" className="cursor-pointer" >m@support.com</SelectItem> */}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount input */}

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <div className="form-item">
              <FormLabel className="form-label">Amount</FormLabel>
              <div className="flex w-fulll flex-col">
                <FormControl className="">
                  <Input
                    placeholder="1.00"
                    className="input-class"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="form-message mt-2" />
              </div>
            </div>
          )}
        />
       
       

        <Button type="submit" className="form-btn w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CryptoSelect;
