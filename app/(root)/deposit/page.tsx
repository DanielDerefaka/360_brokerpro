import React from 'react'
import DepositForm from '@/components/DepositForm'
import { getWallet } from '@/lib/actions/user.actions'

const page = async () => {
  const wallet =  await getWallet() 
  return (
   <DepositForm wallet={wallet}/>
  )
}

export default page