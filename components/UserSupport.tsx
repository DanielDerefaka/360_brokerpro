import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { getSupport, getSupportById, getSupportByUserId } from "@/lib/actions/user.actions";
import Link from "next/link";

const UserSupport = async () => {
  const supportList = await getSupportByUserId();

  return (
    <section>
      {supportList.map((ticket: any) => (
        <div  key={ticket.userId}>
        <Card className="w-full mb-2" >
          <CardHeader>
            <CardTitle>Message</CardTitle>
            <CardDescription>{ticket.message}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <Link href={`/help/ticket/?ticketId=${ticket.ticketId}`}   >
            <Button>Reply</Button>
            </Link>
          </CardFooter>
        </Card>
        </div>
      ))}
    </section>
  );
};

// export default AdminSupport;

export default UserSupport