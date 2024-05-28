import AdminUserTable from "@/components/AdminUser";
import HeaderBox from "@/components/HeaderBox";
import TransactionTable from "@/components/TransactionTable";
import { adminGetUsers } from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
  const userlist = await adminGetUsers()
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Application Users"
          // user={loggedIn?.name || "Guest"}
          subtext="See all users."
        />
      </div>

      <div className="space-y-6 ">
        <div className="transactions-account ">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-18 font-bold text-white"> Users</h2>
            <div className="transactions-account-balance">
          <p className="text-14 ">Number of Users </p>
          <p className="text-24 text-center font-bold">
            {userlist.length}
          </p>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full flex flex-col gap-6">
<AdminUserTable/>
      </section>
    </section>
  );
};

export default page;
