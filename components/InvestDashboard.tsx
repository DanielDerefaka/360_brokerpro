"use client";
import React, { act, useEffect, useRef, useState } from "react";
import HeaderBox from "./HeaderBox";
import CryptoSelect from "./CryptoSelect";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
 
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"

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
  } from "@/components/ui/alert-dialog"

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

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlertCircle, Loader2 } from "lucide-react";
import {
  UserDeposit,
  UserInvest,
  getLoggedInUser,
  getWallet,
} from "../lib/actions/user.actions";
import Image from "next/image";
import FileUpload from "./global/file-upload";
import { useRouter } from "next/navigation";
import { getCurrentDate } from "@/lib/utils";
import BlurPage from "./BlurPage";

const FormSchema = z.object({
//   plan: z.string().nonempty("Please select a coin.").min(1),
  amount: z.string().nonempty("Please enter an amount.").min(1),
});



const InvestDashboard = ({ user }: { user:any }) => {
    // console.log(...type)
  const loggedIn = getLoggedInUser();
  // Define state to store the selected value
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [showInsufficientBalanceDialog, setShowInsufficientBalanceDialog] = useState<boolean>(false); // State for showing insufficient balance dialog



  const plans = [
    { title: "Bronze", amount: "$500", minDeposit: "$200", maxDeposit: "$500", minReturn: "$600", maxReturn: "$10000", bonus: "$20", duration: "72 Hours" },
    { title: "Silver", amount: "$3000", minDeposit: "$3000", maxDeposit: "$9950", minReturn: "$30000", maxReturn: "$150000", bonus: "$500", duration: "72 Hours" },
    { title: "Gold", amount: "$5000", minDeposit: "$5000", maxDeposit: "$20000", minReturn: "$100000", maxReturn: "$300000", bonus: "$1000", duration: "72 Hours" },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    
     
      amount:"",  
    //   plan: ""/
    },
  });

  const balance = user
  console.log(balance)
  

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {

           const userData = {

        amount: data.amount,
        Plan:activePlan!,
        date: getCurrentDate(),

        
      };

      const amounts = data.amount


      if ( amounts <= balance) {

        const newUser = await UserInvest(userData, balance);
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
  
          router.push("/dashboard");
       
      }

      }else {

        setShowInsufficientBalanceDialog(true);

      }

      

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <div className="flex md:flex-row flex-col gap-5">
        {plans.map((plan, index) => (
          <div key={index} className="w-full p-5">
            <Card>
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center flex justify-center">
                  <p className="font-bold text-5xl">{plan.amount}</p>
                </div>
                <div className="mt-10 space-y-3">
                  <div className="flex justify-between">
                    <p>Minimum Possible Deposit:</p>
                    <p>{plan.minDeposit}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Maximum Possible Deposit:</p>
                    <p>{plan.maxDeposit}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Minimum Return:</p>
                    <p>{plan.minReturn}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Maximum Return:</p>
                    <p>{plan.maxReturn}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Gift Bonus:</p>
                    <p>{plan.bonus}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Duration:</p>
                    <p>{plan.duration}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link  href="/invest" className="w-full" >
                <Button  className="w-full bg-blue-600 mt-3">
                  Select {plan.title}
                </Button>
                </Link>
               
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      {activePlan && (
        <div className="w-full p-5 mt-5">
          <Card>
            <CardHeader>
              <CardTitle>{activePlan} Plan</CardTitle>
            </CardHeader>
            <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                  {/* <input type="hidden" {...form.register("plan")} value={activePlan} /> */}
                  <p className="text-muted-foreground text-[12px]">
                  Amount to invest 
                  </p>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label"></FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="$.."
                              className="input-class"
                              type="number"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button className="w-full bg-blue-600 mt-3" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Join Plan"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}

{/* <BlurPage></BlurPage> */}
<AlertDialog open={showInsufficientBalanceDialog} onOpenChange={setShowInsufficientBalanceDialog}>
    
        <AlertDialogTrigger asChild>
          <div />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You have insufficient balance. Please ensure you have enough funds before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowInsufficientBalanceDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowInsufficientBalanceDialog(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </section>
  );
};

export default InvestDashboard;
