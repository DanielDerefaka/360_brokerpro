import React from 'react'
import CryptoWidget from '../CryptoWidget'
import Image from 'next/image'
import { CheckCircle2Icon } from 'lucide-react'

const About = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap mt-6 ">

<div className='flex flex-col gap-5 md:flex-row w-full px-5 p-5'>

    <div className='w-full'>
    <Image src="/icons/invc.gif" className='w-[90%]' alt="image" width={100} height={100} />
    </div>
    <div className='w-full'>
        
    <section className="flex  flex-col gap-4 md:mt-20 ">
      <h2 className="text-5xl  font-bold "> 
     What we do
      </h2>
      <p className="text-muted-foreground   ">
      Our user-friendly, trade-everything platform empowers you to invest in the stocks,
cryptocurrencies and metals you want, with any amount of money. </p>
<div className='mt-5'>
    <p className='text-2xl flex gap-4'> <CheckCircle2Icon/> Buy, sell or swap 3,000+ digital assets like crypto, stocks, precious metals, ETFs and crypto indices.</p>
    <p className='text-2xl flex gap-4 mt-4'> <CheckCircle2Icon/> Automate regular investments with savings plans.</p>
    <p className='text-2xl  flex gap-4 mt-4'> <CheckCircle2Icon/> Invest in any asset on 360Broker Plans.</p>
    <p className='text-2xl  flex gap-4 mt-4'> <CheckCircle2Icon/> Wide range of payment and payout providers.</p>
</div>
      </section>
    </div>


</div>
    </div>
  )
}

export default About