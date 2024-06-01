import AdminSupport from '@/components/AdminSupport'
import HeaderBox from '@/components/HeaderBox'
import { getSupport } from '@/lib/actions/user.actions'
import React from 'react'

const page = async () => {
   

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
           Support Desk
          </h2>
          <p className="header-box-subtext"> 1</p>
        </div>
      </div>
    </div>
    <div>
        <AdminSupport />
    </div>
    </section>
  )
}

export default page