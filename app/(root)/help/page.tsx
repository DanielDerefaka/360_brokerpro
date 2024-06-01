import HeaderBox from '@/components/HeaderBox'
import HelpPage from '@/components/HelpPage';
import UserSupport from '@/components/UserSupport';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const page = async () => {
    const loggedIn = await  getLoggedInUser();
    // const userId = loggedIn.userId
    // const getuser = getuserpro()
    console.log(loggedIn.userId)
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Support "
          // user={loggedIn?.name || "Guest"}
          subtext="User Support page."
        />
      </div>

<HelpPage user={loggedIn}  />
<UserSupport/>

    </section>
  )
}

export default page