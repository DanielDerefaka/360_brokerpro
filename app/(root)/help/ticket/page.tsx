import HeaderBox from '@/components/HeaderBox'
import TicketReply from '@/components/TicketReply';
import UserTicketoverview from '@/components/UserTicketoverview';
import { getSupportById } from '@/lib/actions/user.actions';
import React from 'react'

interface PageProps {
    searchParams: { ticketId: string }; // Define the type for searchParams
  }

  
const page = async ({ searchParams }: PageProps) => {

    const ticketId = searchParams.ticketId

    const supportList = await getSupportById(ticketId);
    

  return (
    <section className="transactions">
    <div className="transactions-header">
      <HeaderBox
        title="Support Desk"
        subtext=""
      />
    </div>

    <div className="space-y-6">
      <div className="transactions-account">
        <div className="flex flex-col gap-2">
          <h2 className="text-20 font-bold text-white">
            Ticket Id ({supportList.ticketId})
          </h2>
          {/* <p className="header-box-subtext"> 1</p> */}
        </div>
      </div>
    </div>
    <div>
    <UserTicketoverview supportList={supportList} />
    {/* {supportList.message} */}
    </div>
    </section>
  )
}

export default page