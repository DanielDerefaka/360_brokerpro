import React from 'react'
import Link from 'next/link'
import TransactionTable from './TransactionTable'

const RecentTransactions = () => {
  return (
   <section className='recent-transactions'>
    <header className='flex items-center justify-between'>
    <h2 className='recent-transactions-label'>
        Recent Transactions
    </h2>

    <Link href={`/transaction-history`} className='view-all-btn'>
    View All
    </Link>
    </header>
    <TransactionTable/>
   </section>
  )
}

export default RecentTransactions