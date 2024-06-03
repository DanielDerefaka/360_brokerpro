import AdminUserTable from "@/components/AdminUser";
import AdminUserTransacTable from "@/components/AdminUserTransacTable";
import HeaderBox from "@/components/HeaderBox";
import InvestTransaction from "@/components/InvestTransaction";
import TransactionTable from "@/components/TransactionTable";
import {
  adminGetAllInvestment,
  adminGetAllTransaction,
} from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
  const userlist = await adminGetAllInvestment();
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Transactions"
          // user={loggedIn?.name || "Guest"}
          subtext="See all users transactions."
        />
      </div>

      <div className="space-y-6 ">
        <div className="transactions-account ">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-18 font-bold text-white"> Transactions</h2>
            <div className="transactions-account-balance">
              <p className="text-14 ">Number of Transactions </p>
              <p className="text-24 text-center font-bold">{userlist.length}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full flex flex-col gap-6">
        <InvestTransaction />
      </section>
    </section>
  );
};

export default page;
