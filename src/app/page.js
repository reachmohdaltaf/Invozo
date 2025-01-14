'use client'
import ThreeCards from '@/components/ThreeCards'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'

const page = () => {
    return (
      <div className='mt-10'>
   <div className='flex flex-col items-center gap-10 justify-center'>
    <Button className='text-xs'><span className='text-xs'>Trusted by 💙 10,000+ freelancers</span></Button>
   <h1 className='text-center font-bold text-6xl'>Create Invoices in <span className='text-blue-500'>minutes</span> <br/>    not in hours.</h1>
    <p className='w-2/4 text-center text-sm'>A Simple Invoice Generator for Freelancers and Businesses and enterprises.
Effortlessly create, manage, and send professional invoices.
</p>
<div className='flex gap-4'>
  <Link href='/generate'><Button variant="secondary" className='hover:-translate-y-1 duration-1000 hover:scale-105 transition'>Get Started</Button></Link>
  <Link href='/generate'><Button variant="ghost" className="hover:bg-transparent transition  hover:-translate-y-1 duration-700 hover:text-blue-400 -1 hover:underline ">Try for Free</Button></Link>
</div>
   </div>

<section className='flex  flex-col items-center justify-center gap-10'>
<div className='flex h-screen justify-center opacity-90 '>
  <ThreeCards/>
  
  
</div>

    <div className=' flex flex-col gap-4'>
    <h3>Multi-Currency Support</h3>
    <div className='flex gap-3'>
    <Button variant="">$</Button>
    <Button variant="">$</Button>
    <Button variant="">$</Button>

    </div>
  </div>
</section>
    </div>
  )
}

export default page

