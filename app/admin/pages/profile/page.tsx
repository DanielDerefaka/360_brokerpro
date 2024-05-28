import {
  getUserInfoParams,
  getUserTransaction,
  getUserWithdrawalTransaction,
} from "@/lib/actions/user.actions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderBox from "@/components/HeaderBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import UserProfileadmin from "@/components/UserProfile-admin";
import { cn } from "@/lib/utils";
import SpecificUserTransaction from "@/components/SpecificUserTransacction";
import SpecificWithdrawal from "@/components/SpecificWithdrawal";

interface PageProps {
  searchParams: { userId: string }; // Define the type for searchParams
  username: String; // Change 'username' to be inside 'params'
}

const page = async ({ searchParams, username }: PageProps) => {
  
  if (searchParams.userId) {
    console.log(searchParams.userId);
  }

  const getUserDetails = await getUserInfoParams({
    userId: searchParams.userId,
  });

  if (!getUserDetails) return null; // Return null or some other placeholder if userDetails are not available

  const userData = getUserDetails;

  const userlist = await getUserTransaction({ userId: searchParams.userId });
  const userlistWithdraw = await getUserWithdrawalTransaction({
    userId: searchParams.userId,
  });

  return (
    // <section className="home">
    //   <div className="home-content">
    //     {/* <div className="text-red-500">

    //       <p>User Email: {userData.firstName}</p>
    //     </div> */}

    //     <Tabs defaultValue="account" className="w-[400px]">
    //       <TabsList>
    //         <TabsTrigger value="account">Account</TabsTrigger>
    //         <TabsTrigger value="password">Password</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="account">
    //         Make changes to your account here.
    //       </TabsContent>
    //       <TabsContent value="password">Change your password here.</TabsContent>
    //     </Tabs>
    //   </div>
    // </section>
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="User Details"
          // user={loggedIn?.name || "Guest"}
          subtext=""
        />
      </div>

      <div className="space-y-6 ">
        <div className="transactions-account ">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-20 font-bold text-white">
              {" "}
              {userData.firstName} {userData.lastName}{" "}
            </h2>
            <p className="header-box-subtext">{userData.email}</p>
          </div>
        </div>
      </div>

      <section className="w-full flex flex-col gap-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">
              <Button className="form-btn">Profile</Button>
            </TabsTrigger>
            <TabsTrigger value="deposit">
              <Button className="form-btn"> Deposits </Button>
            </TabsTrigger>
            <TabsTrigger value="withdrawal">
              <Button className="form-btn"> Withdrawal </Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="mt-5">
              <UserProfileadmin
                userData={userData}
                firstname={userData.firstName}
                lastName={userData.lastName}
                DateofBirth={userData.dateofBirth}
                Address={userData.address}
                State={userData.state}
                Balance={userData.balance}
                Email={userData.email}
                UserId={searchParams.userId}
                balance={userData.balance}
              />
            </div>
          </TabsContent>
          <TabsContent value="deposit">
            {/* <Table>
              <TableHeader className="bg-[#f9fafb]">
                <TableRow>
                  <TableHead className="px-2">Image</TableHead>
                  <TableHead className="px-2">Amount</TableHead>
                  <TableHead className="px-2">Crypto</TableHead>
                  <TableHead className="px-2">Transaction Type</TableHead>
                  <TableHead className="px-2">Status</TableHead>
                </TableRow>
              </TableHeader>

              {userlist.map((user: any) => (
                <TableBody key={user.userId}>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="profile-img_admin">
                        <span className="text-2xl font-bold text-blue-500">
                          {}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user.amount}</TableCell>
                    <TableCell>{user.deposit}</TableCell>
                    <TableCell className="">
                      {user.typeofTransaction}{" "}
                    </TableCell>
                    <TableCell className="">
                      <div className={cn("category-badge")}>
                        <div
                          className={cn("size-2 rounded-full", "bg-orange-700")}
                        />
                        <p
                          className={cn(
                            "text-[12px] font-medium",
                            "text-orange-700"
                          )}
                        >
                          {user.status}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table> */}
            <SpecificUserTransaction userlist={userlist} userData={userData} />
          </TabsContent>
          <TabsContent value="withdrawal">
            <SpecificWithdrawal
              userlist={userlistWithdraw}
              userData={userData}
            />
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
};

export default page;
