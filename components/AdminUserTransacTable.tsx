// import React, { useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  
import Image from 'next/image'
import { adminGetAllTransaction, getUserTransaction } from '@/lib/actions/user.actions'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CheckCheck, CheckIcon, X } from 'lucide-react'
import AdminUserTableStats from "./AdminUserTableStats";
  

const AdminUserTransacTable = async () => {
    // const [selectedValue, setSelectedValue] = useState(''); // Initial value
    const userlist = await adminGetAllTransaction()
    // const userId = userlist[0].transactionId;
//     const userTransaction = await getUserTransaction(userId)
// console.log(userId)

  
   
  return (

<AdminUserTableStats userlist={userlist} />

  )
}



export default AdminUserTransacTable