import HeaderBox from "@/components/HeaderBox";
import WalletUpdate from "@/components/walletUpdate";
import React from "react";

const page = () => {
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Wallet Update"
          // user={loggedIn?.name || "Guest"}
          subtext="See all wallet addreses."
        />
      </div>

      <div className="space-y-6 ">

        <WalletUpdate/>
      </div>
    </section>
  );
};

export default page;
