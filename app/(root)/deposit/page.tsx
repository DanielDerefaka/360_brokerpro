"use client";
import React, { useEffect, useState } from "react";
import HeaderBox from "@/components/HeaderBox";
import CryptoSelect from "@/components/CryptoSelect";
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
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { UserDeposit, getLoggedInUser } from "@/lib/actions/user.actions";
import FileUploaderMain from "@/components/FileUploaderMain";

// Define the form schema with zod
const FormSchema = z.object({
  deposit: z.string().nonempty("Please select a coin."),
  amount: z.string().nonempty("Please enter an amount."),
  file: z.custom<File[]>(),
});

const page: React.FC<{ post: any }> = ({ post }) => {
  const loggedIn = getLoggedInUser();
  // Define state to store the selected value
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<any>();

  const handleCoinSelection = (value: string) => {
    setSelectedCoin(value);
    // You can use the selected value here to perform any desired action
    console.log("Selected Coin:", value);

    // Example wallet addresses for selected coins
    if (value === "USDT") {
      return "usdt wallet";
    }

    if (value === "BTC") {
      return "Btc Wallet";
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      deposit: "",
      amount: "",
      file: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        deposit: data.deposit,
        amount: data.amount,
        file: data.file,
      };

      const newUser = await UserDeposit(userData);
      setDeposit(newUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
          <HeaderBox
            type="greeting"
            title="Deposit"
            subtext="Deposit cryptocurrency into your account smoothly."
          />
        </header>
        <div className="gap-4 flex md:flex-row flex-col">
          <div className="border-[1px] border-gray-100 p-5 rounded-sm shadow-sm w-full">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="deposit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl font-bold mb-5">
                          Coin
                        </FormLabel>
                        <Select
                          onValueChange={(newValue) => {
                            // Update state and call the function
                            setSelectedCoin(newValue);
                            handleCoinSelection(newValue);
                            // Also update the form field value
                            field.onChange(newValue);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Pick a Coin to Deposit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="BTC" className="cursor-pointer">
                              Bitcoin (BTC)
                            </SelectItem>
                            <SelectItem value="USDT" className="cursor-pointer">
                              USDT
                            </SelectItem>
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
                      <FormItem>
                        <FormLabel className="form-label">Amount</FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="100"
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

                  {/* File upload */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">File</FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <FileUploaderMain
                              fieldChange={field.onChange}
                              mediaUrl={post?.mediaUrl}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="form-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading ...
                      </>
                    ) : (
                      "Deposit"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <p className="text-gray-300 text-[15px] mt-5">
              Coin will be deposited after 1 network confirmation.
            </p>
            <p className="text-gray-300 text-[15px] mt-3">
              Until 2 confirmations are made, an equivalent of your asset will
              be temporarily unavailable for withdrawal.
            </p>
          </div>

          <div className="border-[1px] bg-blue-600 border-gray-100 p-5 rounded-sm shadow-sm w-full">
            <div>
              <p className="text-2xl font-bold text-white">
                {selectedCoin} Address:
              </p>
              <p className="font-bold text-2xl text-white">
                {selectedCoin === "BTC" && "ndindkndkdnbibbwoiebebbebubepa"}
                {selectedCoin === "USDT" && "usdt wallet"}
              </p>
            </div>
            <div className="gap-4 mt-5 flex md:flex-row flex-col">
              <Button className="bg-blue-800 rounded-none w-full">
                Copy Address
              </Button>
              <Button className="bg-white rounded-none w-full">
                Show QR Code
              </Button>
            </div>
            <div className="mt-5">
              <p className="text-[15px] text-white">
                Send only {selectedCoin} to the deposit address.
              </p>
              <p className="text-[15px] text-white">
                Sending other than {selectedCoin} to the deposit address will
                result in loss of asset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
