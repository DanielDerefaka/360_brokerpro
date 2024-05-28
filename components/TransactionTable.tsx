import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getLoggedInUser, getUserTransaction } from '@/lib/actions/user.actions'
  
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"


const TransactionTable = async  () => {

  // const {
  //   borderColor,
  //   backgroundColor,
  //   textColor,
  //   chipBackgroundColor,
  //  } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
   

  let counter = 0;
  const loggedIn = await getLoggedInUser()

  const userlist = await getUserTransaction({userId: loggedIn.userId})

  return (
    <Table>
 
  <TableHeader className='bg-[#f9fafb]'>
    <TableRow>
      <TableHead className="px-2">S/N</TableHead>
      <TableHead className="px-2">Amount</TableHead>
      <TableHead className="px-2">Crypto</TableHead>
      <TableHead className="px-2">Transaction Type</TableHead>
      <TableHead className="px-2">Status</TableHead>
  
    </TableRow>
  </TableHeader>

  {userlist.map((user:any, item:any) => (

  <TableBody key={user.user}>
    <TableRow>
      <TableCell className="max-w-[250px] pl-2 pr-10">
      <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {item + 1}
                  </h1>
                </div>
      </TableCell>
      <TableCell>${user.amount}.00</TableCell>
      <TableCell>{user.deposit}</TableCell>
      <TableCell className="">{user.typeofTransaction}</TableCell>
      <TableCell className="">
                      <div className={cn("category-badge")}>
                      <div className={cn("size-2 rounded-full", user.status === 'Successful' ? "bg-green-700" : "bg-red-700")} />
                        <p
                          className={cn(
                            "text-[12px] font-medium",
                            user.status == 'Successful' ? "text-green-700" : "text-red-700"
                          
                          )}
                        >
{user.status}
                        </p>
                      </div>
                    </TableCell>
    </TableRow>
  </TableBody>
    ))}
</Table>

  )
}

export default TransactionTable