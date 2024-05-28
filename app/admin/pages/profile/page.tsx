import {
  getUserInfoParams,
  getUserTransaction,
  getUserWithdrawalTransaction,
} from "@/lib/actions/user.actions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderBox from "@/components/HeaderBox";
import { Button } from "@/components/ui/button";
import UserProfileadmin from "@/components/UserProfile-admin";
import SpecificUserTransaction from "@/components/SpecificUserTransacction";
import SpecificWithdrawal from "@/components/SpecificWithdrawal";

// Interface for PageProps
interface PageProps {
  searchParams: { userId: string }; // Define the type for searchParams
}

// Define the page component
const Page = async ({ searchParams }: PageProps) => {
  // Validate userId in searchParams
  const userId = searchParams?.userId;
  if (!userId) {
    console.error("UserId is required");
    return null;
  }

  // Fetch user details
  const getUserDetails = await getUserInfoParams({ userId });
  if (!getUserDetails) {
    return <p>User details not found</p>;
  }

  const userData = getUserDetails;

  // Fetch user transactions
  const userlist = await getUserTransaction({ userId });
  const userlistWithdraw = await getUserWithdrawalTransaction({ userId });

  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="User Details"
          subtext=""
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-20 font-bold text-white">
              {userData.firstName} {userData.lastName}
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
              <Button className="form-btn">Deposits</Button>
            </TabsTrigger>
            <TabsTrigger value="withdrawal">
              <Button className="form-btn">Withdrawal</Button>
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
                UserId={userId}
                balance={userData.balance}
              />
            </div>
          </TabsContent>
          <TabsContent value="deposit">
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

export default Page;
