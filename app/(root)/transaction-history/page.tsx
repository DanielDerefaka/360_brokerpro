import BillingAlert from "@/components/BillingAlert";
import HeaderBox from "@/components/HeaderBox";
import TransactionTable from "@/components/TransactionTable";
import { getLoggedInUser, getUserInfoParams } from "@/lib/actions/user.actions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TransactionWithdrawalTable from "@/components/TransactionWithdrawalTable";

const page = async () => {
  const loggedIn = await getLoggedInUser();

  const userlist = await getUserInfoParams({ userId: loggedIn.userId });

  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Transaction History"
          // user={loggedIn?.name || "Guest"}
          subtext="See all your transactions  ."
        />
      </div>

      <div className="space-y-6 ">
        <div className="transactions-account ">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-18 font-bold text-white"> Account Balannce</h2>
            <div className="transactions-account-balance">
              <p className="text-14 ">Current Balance</p>
              <p className="text-24 text-center font-bold">
                ${userlist.balance}.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList>
          
          <TabsTrigger value="deposit">
            <Button className="form-btn"> Deposits </Button>
          </TabsTrigger>
          <TabsTrigger value="withdrawal">
            <Button className="form-btn"> Withdrawal </Button>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <section className="w-full flex flex-col gap-6">
            <TransactionTable />
          </section>
        </TabsContent>

        <TabsContent value="withdrawal">
        <TransactionWithdrawalTable />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default page;
