"use client"

import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from 'postcss';
import { ReplySupport } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";





const FormSchema = z.object({

    reply: z.string()
  });


const TicketReply =  (supportList:any) => {

 


  // Define state to store the selected value
//   const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()
//   const getuser = getuserpro()
  // console.log(user.value.email)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reply: '',
      
    },
  });

//   console.log(getuser?.firstName)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    // const userI  = loggedIn.userId
   

    try {

        const userData = {
            
            reply: data.reply,
            ticketId: supportList.supportList.ticketId
          };
    
          const newUser = await ReplySupport(userData);

          if(!newUser){
            return toast({
              title: "Message Failed to send ",
              description: "Try Again",
              className:"bg-red-500"
            })
          }
    
          if(newUser){
          form.reset()
       
            return toast({
              title: "Message Sent Sucessful ",
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
  
  return (
    <div>
        {/* {supportList.supportList.message} */}
        <Card className="w-full mb-2" >
          <CardHeader>
            <CardTitle>Message</CardTitle>
            {/* <CardDescription>{supportList.supportList.ticketId}</CardDescription> */}
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent>

            <Textarea value={supportList.supportList.message} disabled/>
            <div className="">
            <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="reply"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-3">
                      <FormLabel> Reply </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Type a message ........ " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </CardContent>
         
      
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button className="form-btn" type="submit">
                {isLoading ? (
                  <Loader2 /> 
                ) : (
                  "Reply"
                )}
              </Button>
        
          </CardFooter>
          </form>
          </Form>
        </Card>
    </div>
  )
}

export default TicketReply