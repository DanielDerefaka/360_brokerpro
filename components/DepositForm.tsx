"use client";
import React, { useEffect, useRef, useState } from "react";
import HeaderBox from "./HeaderBox";
import CryptoSelect from "./CryptoSelect";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
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
import { Input } from "./ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loader2 } from "lucide-react";
import {
  UserDeposit,
  getLoggedInUser,
  getWallet,
} from "../lib/actions/user.actions";
import FileUploaderMain from "./FileUploaderMain";
import Image from "next/image";
import FileUpload from "./global/file-upload";
import { useRouter } from "next/navigation";

interface WalletType {
  usdt?: string;
  btc?: string;
  trx?: string;
}

// Define the form schema with zod
const FormSchema = z.object({
  deposit: z.string().nonempty("Please select a coin.").min(1),
  amount: z.string().nonempty("Please enter an amount.").min(1),
  proof: z.string().min(1),
});
const DepositForm = (wallet: any) => {
  const loggedIn = getLoggedInUser();
  // Define state to store the selected value
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast()
  const router = useRouter()
  

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  console.log(wallet);

  const handleCoinSelection = (value: string) => {
    setSelectedCoin(value);
    // You can use the selected value here to perform any desired action
    console.log("Selected Coin:", value);

    // console.log(wallet.btc)
    // Example wallet addresses for selected coins
    if (value === "usdt") {
      return "USDT";
    }

    if (value === "btc") {
      return "BTC";
    }

    if (value === "trx") {
      return "TCS";
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      deposit: "",
      amount: "",
      proof: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        deposit: data.deposit,
        amount: data.amount,
        proof: data?.proof,
      };

      const newUser = await UserDeposit(userData);
      setDeposit(newUser);

      if(!newUser){
        return toast({
          title: "Deposit Failed ",
          description: "Try Again",
          className:"bg-red-500"
        })
      }

      if(newUser){
        router.push('/transaction-history')
   
        return toast({
          title: "Deposit Sucessful ",
          description: "",
          className:"bg-green-700"
        })

      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      // Alternatively, you can use the Clipboard API
      // navigator.clipboard.writeText(inputRef.current.value);
      alert("Copied to clipboard");
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

        <div className=" flex justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <Tabs defaultValue="account" className="md:w-[600px] w-full">
                {/* <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList> */}
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fund your Account</CardTitle>
                      <CardDescription>
                        fund your account to continue with your investment
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <FormField
                        rules={{ required: 'This field is required' }} // Add validation rules here
 
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="form-label">
                                Amount
                              </FormLabel>
                              <div className="flex w-full flex-col">
                                <FormControl>
                                  <Input
                                    placeholder="100"
                                    className="input-class"
                                    type="text"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e); // Call the original field.onChange
                                      handleAmountChange(e); // Also update the local state
                                    }}
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
                          rules={{ required: 'This field is required' }} // Add validation rules here
                          name="deposit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=" mb-5">Coin</FormLabel>
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
                                  <SelectItem
                                    value="btc"
                                    className="cursor-pointer"
                                  >
                                    Bitcoin (BTC)
                                  </SelectItem>
                                  <SelectItem
                                    value="usdt"
                                    className="cursor-pointer"
                                  >
                                    USDT
                                  </SelectItem>
                                  <SelectItem
                                    value="trx"
                                    className="cursor-pointer"
                                  >
                                    TRX
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="form-message mt-2" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <TabsList className="">
                        <TabsTrigger  value="password"     disabled={!selectedCoin} className="form-btn">
                          
                            Proceed to Payment
                          
                        </TabsTrigger>
                      </TabsList>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="password" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Confirm Fund Deposit</CardTitle>
                      <CardDescription>
                        You are to make payment of ${amount} using your selected
                        payment method. Screenshot and upload the proof of
                        payment
                        {selectedCoin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex w-full items-center">
                          <input
                            id="new"
                            type="text"
                            ref={inputRef}
                            value={
                              (selectedCoin === "btc" && wallet.wallet.btc) ||
                              (selectedCoin === "usdt" && wallet.wallet.usdt) ||
                              (selectedCoin === "trx" && wallet.wallet.trx)
                            }
                            // disabled
                            className="border w-full rounded px-4 py-2"
                          />
                          <button
                            onClick={handleCopyClick}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-muted-foreground">
                          {selectedCoin === "usdt" && (
                            <p className="font-[12px]">Network Type: TRC20</p>
                          )}
                        </p>
                      </div>
                      <Label htmlFor="new">Or scan the QR Code below</Label>
                      <div className="space-y-1 w-full flex justify-center">
                        
                       
                        {selectedCoin === "usdt" && (
                         <Image src="/icons/usdt.jpg" alt="wallet" className="w-[400px] mt-4" width={100} height={50} />
                         )}
                        {selectedCoin === "btc" && (
                          <Image src="/icons/btc.jpg" alt="wallet"  className="w-[400px]"  width={100} height={50} />
                        )}
                        {selectedCoin === "trx" && (
                          <Image src="/icons/trx.jpg" alt="wallet"  className="w-[400px]"   width={100} height={50} />
                        )}
                      </div>

                      <div>
                      <FormField
                      rules={{ required: 'This field is required' }} // Add validation rules here
 
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="proof"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Screenshot of Payment </FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="proof"
                          value={field.value}
                          onChange={field.onChange}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                      </div>
                    </CardContent>
                    <CardFooter>
                    <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  )  : (
                    "Complete Desposit"
                  )}
                </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default DepositForm;
