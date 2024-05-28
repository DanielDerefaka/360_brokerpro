"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Userprof from "./Userprof"


const UserProfileadmin = ({userData, firstname, lastName, DateofBirth, Address, State, Balance, Email, UserId, balance}:UserDataProps) => {
    

  return (
<section className="">
    <div className="container mx-auto px-4  rounded-md">
    <p className="text-3xl font-bold">All Personal Informations</p>
    <div className=" size-full pt-5">
        <Userprof userData={userData} firstname={firstname} lastName={lastName} Email={Email} DateofBirth={DateofBirth} Address={Address} State={State} Balance={Balance} UserId={UserId} balance={balance}/>

    </div>
    </div>
</section>
  )
}

export default UserProfileadmin