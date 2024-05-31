import React from "react";
import { ModeToggle } from "./site/modetoggle";
import WidgetMain from "./WidgetMain";

const RightSidebar = ({ user }: any) => {
  return (
    <aside className="right-sidebar">
           <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">{user.firstName[0]}</span>
          </div>
 
          <div className="profile-details">
            <h1 className='profile-name'>
              {user.firstName} {user.lastName}
            </h1>
            <p className="profile-email">
              {user.email}
            </p>

          </div>
          {/* <ModeToggle/> */}
        </div>

        <div className="mt-20">
          <WidgetMain/>
        </div>
      </section>

      {/* <section className="banks">
        <div className="flex w-full justify-between">
        <h2 className="header-2">
            My Account
        </h2>
        </div>

      </section> */}
    </aside>
  );
};

export default RightSidebar;
