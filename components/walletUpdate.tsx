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
import { UserDeposit, UserWithdraw, WalletAddress } from "@/lib/actions/user.actions";



const FormSchema = z.object({
    btc: z.string(),
    usdt: z.string(),
    trx: z.string(),
  
    
  
   
  
  });


const WalletUpdate = (balance:any) => {
    const [selectedCoin, setSelectedCoin] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [deposit, setdeposit] = useState(null);
  

  const { toast } = useToast();
  const router = useRouter();

  // const [deletingAgency, setDeletingAgency] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      btc: "",
      usdt: "",
      trx: "",
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
        
        btc: data.btc,
        usdt: data.usdt,
        trx: data.trx,
      
       
      }
     

     




  const newUser = await WalletAddress(userData);

  form.reset()
  toast({
    title: "Wallet Addresses Successfully Placed", 
  });


    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false);
  }
  }
 

  

  return (
    
      <Card className="p-4 flex-1">
        <CardHeader>
          <CardTitle>Wallet Section</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p>
              {" "}
              Update deposit wallelt addresses
            </p>
            <Separator className="mt-5 mb-2" />
            {/* <p> You may contact us via email at support@complextrading.com</p> */}
          </CardDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="usdt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>USDT WALLET ADDRESS </FormLabel>
                    <FormControl>
                      <Input required placeholder="" {...field}
                   
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="btc"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> BTC WALLET ADDRESS</FormLabel>
                    <FormControl>
                    <Input required placeholder="Wallet Address" {...field}  />
                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="trx"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> TRX WALLET ADDRESS</FormLabel>
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
                  "ADD"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
 
  )
}

export default WalletUpdate