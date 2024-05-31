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
import { UserDeposit, getLoggedInUser, getuserpro, updateDetails } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";



const FormSchema = z.object({
  Firstname: z.string(),
  password: z.string(),
  Lastname: z.string()
});

const ProfileSetting = ({user}:ProfileParam) => {
 
  // Define state to store the selected value
//   const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()
//   const getuser = getuserpro()
  // console.log(user.value.email)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Firstname: user.firstName,
      Lastname: user.lastName,

      password: '',
    },
  });

//   console.log(getuser?.firstName)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    // const userI  = loggedIn.userId
   

    try {

        const userData = {
            lastName: data.Lastname,
            firstName: data.Firstname,
            password: data.password
          };
    
          const newUser = await updateDetails(userData);

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Add or update your information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className=" gap-5 flex flex-col md:flex-row">
                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="Firstname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> First Name</FormLabel>
                      <FormControl>
                        <Input  placeholder={user.firstName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="Lastname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Last Name</FormLabel>
                      <FormControl>
                        <Input  placeholder={user.lastName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <FormField
                // disabled
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder={user.email}  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <p>{user.email} </p> */}

              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> Password</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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

export default ProfileSetting;
