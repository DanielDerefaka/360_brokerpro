import React from 'react'
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
import { CrossIcon, Wallet } from "lucide-react";
import Link from 'next/link';
import WithdrawForm from '@/components/WithdrawForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const page = async () => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className="home">
      <div className="home-content">
    <div className="h-full relative">
      <div className="flex gap-4 xl:!flex-row flex-col">
        <Card className="xl:w-[400px] w-full  h-[200px] bg-blue-600">
          <CardHeader>
            <CardDescription className='text-2xl font-bold'>Balance</CardDescription>
            <CardTitle className="text-4xl mb-5 text-white">
              
            {loggedIn.balance}
            </CardTitle>

            <Separator className="" />

            <div className="flex flex-col gap-4 xl:flex-row mt-5">
              <Link href="/deposit">
                <Button className='bg-white'>
                  <CrossIcon  className='text-blue-600'/>
                  <span className="ml-2  font-bold">Deposit</span>
                </Button>
              </Link>

              <Link href="/withdraw">
                <Button className="bg-white hover:bg-none">
                  <Wallet className='' />
                  <span className="ml-2">Withdraw</span>
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
        <WithdrawForm balance={loggedIn.balance} />
      </div>
    </div>
    </div>
    </section>
  );
};
  

export default page