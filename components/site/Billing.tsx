import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Billing = () => {
  return (
    <div>

    <section className="flex justify-center flex-col gap-4 md:!mt-60 mt-[40px] items-center ">
      <h2 className="text-4xl text-center "> 
      You get the best trading conditions 
      </h2>
      <p className="text-muted-foreground text-center">
      Fund your account easily and securely through our wide range of payment options. Your funds are held securely in Tier 1 banks. </p>
      </section>
      <div className="flex items-center justify-center gap-4 flex-wrap mt-6   ">
      {pricingCards.map((card) => (
        <Card key={card.title} className={clsx('w-[300px] flex flex-col justify-between', {"border-2 border-primary":card.title === 'Unlimited Saas'})}>
           <CardHeader>
            <CardTitle className={clsx('',{' text-muted-foreground':card.title!=="Unlimited Sass"})}>
              {card.title}
            </CardTitle>
            <CardDescription className=" ">
              {card.description}
            </CardDescription>
           </CardHeader>
           <CardContent>
            <span className="text-4xl font-bold">
          {card.price}
            </span>
            <span className=""></span>
           </CardContent>
           <CardFooter className="flex flex-col items-start gap-4">
          <div>
            {card.features.map((feature) => (
              <div key={feature} className="flex gap-2 items-center">
                <Check className="text-muted-foreground"/>
                <p className="text-xl">  {feature}</p>
              </div>
            ))}
          </div>
              <Link href="/sign-in" className='w-full text-center bg-primary p-2 rounded-md '>
              Get Started
              </Link>
           </CardFooter>
        </Card>
      ))}
      </div>
      </div>
  )
}

export default Billing