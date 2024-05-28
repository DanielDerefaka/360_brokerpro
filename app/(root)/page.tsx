import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser, getUserInfoParams } from "@/lib/actions/user.actions";
import RecentTransactions from "@/components/RecentTransactions";

const page = async () => {
  const loggedIn = await getLoggedInUser();

  const userlist = await getUserInfoParams({userId: loggedIn.userId})

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
        <RecentTransactions/>
      </div>
    <RightSidebar user={loggedIn} />
    </section>
  );
};

export default page;
