
import About from '@/components/site/About'
import Billing from '@/components/site/Billing'
import Hero from '@/components/site/Hero'
import Testimony from '@/components/site/Testimony'
import React from 'react'

const page = () => {
  return (
    <>
    <section className="h-full w-full pt-10 xl:pt-36 lg:pt-36  relative flex items-center justify-center flex-col">
       <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00052d_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

<Hero/>

 </section>
 <Testimony/>
 <About/>
 <Billing/>
 </>
  )
}

export default page