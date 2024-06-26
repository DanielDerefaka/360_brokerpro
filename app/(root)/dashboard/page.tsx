import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { adminGetAllInvestment, getLoggedInUser, getUserInfoParams } from "@/lib/actions/user.actions";
import RecentTransactions from "@/components/RecentTransactions";
import LandingTrading from "@/components/LandingTrading";
import InvestDashboard from "@/components/InvestDashboard";

const page = async () => {
  const loggedIn = await getLoggedInUser();

  const userlist = await getUserInfoParams({userId: loggedIn.userId})
  const userlists = await adminGetAllInvestment()

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
        <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName  || "Guest"}
            subtext="Access and manage your account and Transactions efficiently."
          />

          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={userlist.balance}
          />
        </header>
       <InvestDashboard user={userlists}/>
       <LandingTrading/>
      </div>
    <RightSidebar user={loggedIn} />
    </section>
  );
};

export default page;
