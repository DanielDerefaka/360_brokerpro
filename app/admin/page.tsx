import { redirect } from 'next/navigation'
// import {  } from 'next/router'
import React from 'react'

const page = () => {
  redirect('/admin/pages/dashboard')
  return (
    <div>page</div>
  )
}

export default page