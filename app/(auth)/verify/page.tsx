import { verifyMagicUrl } from '@/lib/actions/user.actions';
import React from 'react'

interface PageProps {
    searchParams: { userId: string , secret: string}; // Define the type for searchParams
  }
  

const page = ({ searchParams }: PageProps) => {

 const userId = searchParams?.userId;
 const secret = searchParams?.secret;

//   if (!userId) {
//     console.error("UserId is required");
//     return null;
//   }

  const verify = verifyMagicUrl( )

  return (
    <div>page</div>
  )
}

export default page