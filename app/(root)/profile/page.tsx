import HeaderBox from "@/components/HeaderBox";
import ProfileSetting from "@/components/ProfileSetting";
import { getLoggedInUser, getuserpro } from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
    const loggedIn = await  getLoggedInUser();
    // const userId = loggedIn.userId
    // const getuser = getuserpro()
    console.log(loggedIn.userId)
    // console.log(getuser)
    
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Profile "
          // user={loggedIn?.name || "Guest"}
          subtext="User profile page."
        />
      </div>

<ProfileSetting user={loggedIn}  />

    </section>
  );
};

export default page;
