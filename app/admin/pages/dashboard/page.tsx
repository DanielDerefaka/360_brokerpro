import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import {  getAdminLoggedInUser } from "@/lib/actions/user.actions";
import RecentTransactions from "@/components/RecentTransactions";

const page = async () => {
  const loggedIn = await getAdminLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
        <HeaderBox
            type="greeting"
            title="Welcome"
            user={ "Admin"}
            subtext="Access and manage your account and Transactions efficiently."
          />

          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35}
          />
        </header>
        {/* <RecentTransactions/> */}
      </div>
    <RightSidebar user={loggedIn} />
    </section>
  );
};

export default page;
