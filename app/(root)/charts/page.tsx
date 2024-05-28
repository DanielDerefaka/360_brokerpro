import HeaderBox from '@/components/HeaderBox'
import TradingView from '@/components/TradingView'
import React from 'react'

const page = () => {
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          // type="greeting"
          title="Trading Charts"
          // user={loggedIn?.name || "Guest"}
          subtext="See all trading charts  ."
        />
      </div>

<TradingView/>

      </section>
  )
}

export default page