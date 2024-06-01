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







const UserTicketoverview =  (supportList:any) => {

 



  
  return (
    <div>
        {/* {supportList.supportList.message} */}
        <Card className="w-full mb-2" >
          <CardHeader>
            <CardTitle>Message</CardTitle>
            {/* <CardDescription>{supportList.supportList.ticketId}</CardDescription> */}
          </CardHeader>
         
          <CardContent>

            <Textarea value={supportList.supportList.message} disabled/>
           
           <div className="mt-3">
            <p className="font-bold mb-3 text-black-1"> Admin Reply </p>
            {supportList.supportList.responce ? (
                <Textarea disabled value={supportList.supportList.responce}   />
         
            ) :  'Admin has not replied yet'}
             </div>
          </CardContent>
         
      
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
       
        
          </CardFooter>
         
        </Card>
    </div>
  )
}

// export default UserTicketoverview

export default UserTicketoverview