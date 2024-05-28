"use client";
import React from "react";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckIcon, Loader2 } from "lucide-react";
import {
  UserDeposit,
  UserUpdateStatus,
  getUserTransaction,
  getUserTransactionTest,
} from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  status: z.string({
    required_error: "Please a coin.",
  }),

  transactionId: z.string({}),
  userId: z.string({}),
  amount: z.string({}),
});


const SpecificWithdrawal = ({ userlist, userData }: any) => {
  // Define state to store the selected value
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(""); 
  // Define state to store the selected value
  const [selectedCoin, setSelectedCoin] = useState("");


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "",
      transactionId: '',
      userId: "",
      amount: "",
    },
  });

  const handleCoinSelection = (value: string) => {
    setSelectedCoin(value);
    // You can use the selected value here to perform any desired action
  };

  const userId = userData.userId;
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
    const texttransacttion = getUserTransactionTest();

    // const test = texttransacttion.status

    // console.log(test)

    try {

        const { status, transactionId,  amount } = data;
      const userData = {
        status: status,
        transactionId: selectedTransactionId,
        userId: userId,
        amount: amount,
      };

      //   const tran = await getUserTransactionbyId(userId)
      //   console.log(tran)

      const newUser = await UserUpdateStatus(userData);

      console.log(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <Table>
            <TableHeader className="bg-[#f9fafb]">
              <TableRow>
                <TableHead className="px-2">UserId</TableHead>
                <TableHead className="px-2">Amount</TableHead>
                {/* <TableHead className="px-2">Deposit</TableHead> */}
                <TableHead className="px-2">Amount</TableHead>
                <TableHead className="px-2">Status</TableHead>
                <TableHead className="px-2">Approve</TableHead>
              </TableRow>
            </TableHeader>

            {userlist.map((transaction: any) => {
              const userIdd = transaction.user;

              return (
                <TableBody key={transaction.user}>
                  <TableRow>
                    {/* <TableCell className="font-medium">
                      {transaction.deposit}
                    </TableCell> */}
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell className="">{transaction.walletAddress} </TableCell>
                    <TableCell className="">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(newValue) => {
                                // Update state and call the function
                                setSelectedCoin(newValue);
                                handleCoinSelection(newValue);
                                // Also update the form field value if needed
                                field.onChange(newValue);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={transaction.status} />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="sucessful">
                                  <div className={cn("category-badge")}>
                                    <div
                                      className={cn(
                                        "size-2 rounded-full",
                                        "bg-green-700"
                                      )}
                                    />
                                    <p
                                      className={cn(
                                        "text-[12px] font-medium",
                                        "text-green-700"
                                      )}
                                    >
                                      Successful
                                    </p>
                                  </div>
                                </SelectItem>
                                <SelectItem value="pending">
                                  {" "}
                                  <div className={cn("category-badge")}>
                                    <div
                                      className={cn(
                                        "size-2 rounded-full",
                                        "bg-orange-700"
                                      )}
                                    />
                                    <p
                                      className={cn(
                                        "text-[12px] font-medium",
                                        "text-orange-700"
                                      )}
                                    >
                                      Pending
                                    </p>
                                  </div>{" "}
                                </SelectItem>
                                <SelectItem value="cancel">
                                  <div className={cn("category-badge")}>
                                    <div
                                      className={cn(
                                        "size-2 rounded-full",
                                        "bg-red-700"
                                      )}
                                    />
                                    <p
                                      className={cn(
                                        "text-[12px] font-medium",
                                        "text-red-700"
                                      )}
                                    >
                                      Cancel
                                    </p>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      {/* <FormField
                        control={form.control}
                        name="transactionId"
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={transaction.transactionId}
                            // className="hidden"
                            onChange={(e) => setSelectedTransactionId(e.target.value)} 
                            defaultValue={transaction.transactionId} 
                          />
                        )}
                      /> */}

                      <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={transaction.user}
                            type="hidden"

                          />
                        )}
                      />
                      
                          <Input
                          name="transactionId"
                            value={transaction.transactionId}
                            type="hidden"
                            defaultValue={transaction.transactionId} 
                          />
                   
                    </TableCell>
                    <TableCell className="">
                      <Button type="submit" className="flex items-center">
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckIcon className="text-green-700 cursor-pointer font-bold" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </form>
      </Form>
    </div>
  );
};



export default SpecificWithdrawal