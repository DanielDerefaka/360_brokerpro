import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="z-10">
        <p className="text-center md:mt-1 mt-[40px] bg-gray-200 dark:bg-transparent border-[1px] border-gray-500 rounded-full p-4 cursor-pointer font-bold">
          Invest with your family and friends
        </p>
      </div>
      <div className="text-center justify-center text-3xl font-bold md:text-[60px] mt-5 ">
        <p className="md:mb-5 md:mt-5">Self-serve & transparent </p>
        <p> method for investing together </p>
      </div>
      {/* <p className="text-muted-foreground text-center sm:text-[12px] mt-5 md:mt-[30px]">
   Fund your trading account easily and securely with our diverse range of payment options <p>knowing your assets are fully protected in reputable, top-tier banks.</p> </p>
     */}
      <section className="flex justify-center flex-col gap-4 items-center ">
        <p className="text-muted-foreground text-center  mt-5 md:mt-[30px]">
          Fund your trading account easily and securely with our diverse range
          of payment options{" "}
          <p>
            knowing your assets are fully protected in reputable, top-tier
            banks.
          </p>{" "}
        </p>
      </section>

      <div className="justify-center flex mt-5 ">
        <Link href="/">
          <Button className="text-white p-4">Get Started</Button>
        </Link>
      </div>
      
    </>
  );
};

export default Hero;
