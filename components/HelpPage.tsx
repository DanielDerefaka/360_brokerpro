"use client";

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
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
// import Loading from "../global/Loading";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { UserDeposit, getLoggedInUser, getuserpro, supportMessage, updateDetails } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";



const FormSchema = z.object({
  message: z.string(),
  
});

const HelpPage = ({user}:ProfileParam) => {
 
  // Define state to store the selected value
//   const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()
//   const getuser = getuserpro()
  // console.log(user.value.email)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

      message: '',
    },
  });

//   console.log(getuser?.firstName)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    // const userI  = loggedIn.userId
   

    try {

        const userData = {
            
            message: data.message
          };
    
          const newUser = await supportMessage(userData);

          if(!newUser){
            return toast({
              title: "Profile Update Failed ",
              description: "Try Again",
              className:"bg-red-500"
            })
          }
    
          if(newUser){
          form.reset()
       
            return toast({
              title: "Profile Update Sucessful ",
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
      <Card className="w-full  justify-center">
        <CardHeader>
          <CardTitle> 360 Broker Fx</CardTitle>
          <CardDescription>For inquiries, suggestions or complains. Mail us</CardDescription>
          <CardDescription>support@360broker.company</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Message </FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

   

              <Button className="form-btn" type="submit">
                {isLoading ? (
                  <Loader2 /> 
                ) : (
                  "Save User Details"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;
