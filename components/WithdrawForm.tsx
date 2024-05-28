"use client";

import React, { useEffect , useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CrossIcon, Loader2, Wallet } from "lucide-react";
// import { v4 } from "uuid";
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


import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import FileUpload from "@/components/global/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UserDeposit, UserWithdraw } from "@/lib/actions/user.actions";



const FormSchema = z.object({
    walletAddress: z.string({
      required_error: "Please a coin.",
    }),
  
    amount: z.coerce.number({
      required_error: "Please enter an amount.",
    }),
  
   
  
  });


const WithdrawForm = (balance:any) => {
    const [selectedCoin, setSelectedCoin] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [deposit, setdeposit] = useState(null);
  

  const { toast } = useToast();
  const router = useRouter();

  // const [deletingAgency, setDeletingAgency] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    walletAddress: "",
      amount: 0,
    },
  });

 
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    setisLoading(true);



    try {


      const userData = {
        
        walletAddress: data.walletAddress,
        amount: data.amount,
      
       
      }
      const amount = data.amount

     
const balanced = balance.balance


if ( amount <= balanced) {
  const newUser = await UserWithdraw(userData, balance);

  form.reset()
  toast({
    title: "Withdrawal Successfully Placed", 
  });
  
} else {
  toast({
    title: "Insufficient balance",
  });
}
      
console.log(balance, amount)

     

    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false);
  }
  }
 

  

  return (
    
      <Card className="p-4 flex-1">
        <CardHeader>
          <CardTitle>Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p>
              {" "}
              To withdraw funds input your wallet address, please
              contact our support team to assist you with your deposit.
            </p>
            <Separator className="mt-5 mb-2" />
            <p> You may contact us via email at support@complextrading.com</p>
          </CardDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Amount in USD ($) </FormLabel>
                    <FormControl>
                      <Input required placeholder="Amount" {...field}
                    type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> Wallet Address </FormLabel>
                    <FormControl>
                    <Input required placeholder="Wallet Address" {...field}  />
                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                



              <Button disabled={form.formState.isSubmitting} type="submit" className="form-btn">
                {form.formState.isSubmitting ? (
                  <Loader2 />
             
                ) : (
                  "Withdaw funds"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
 
  )
}

export default WithdrawForm