import HeaderBox from "@/components/HeaderBox";
import InvestPage from "@/components/InvestPage";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const page = async (type:any) => {
  const loggedIn = await getLoggedInUser();
//   console.log(loggedIn.balance)
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
          <HeaderBox
            type="greeting"
            title="Investment Plan"
            //   user={loggedIn?.firstName  || "Guest"}
            subtext="Available package"
          />
        </header>
        <InvestPage user={loggedIn.balance}  />
      </div>
      
    </section>
  );
};

export default page;
