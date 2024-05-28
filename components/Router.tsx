"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { getAdminLoggedInUser } from '@/lib/actions/user.actions'

const Router = async () => {

    const Router = useRouter()

    const loggedIn = await getAdminLoggedInUser()

    if(!loggedIn) Router.push('/admin/sign-in')

}

export default Router