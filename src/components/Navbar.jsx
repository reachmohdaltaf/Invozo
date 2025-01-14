import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='border-2 flex items-center justify-between p-3 rounded-lg border-[#27272A]'>
        <div>
       <Link href='/'><h1 className='font-extrabold text-3xl'>Invozo</h1></Link> 
        </div>
        <div className='flex items-center gap-4'>
        

            <Button variant="">
                USD
            </Button>
            <Button variant="secondary" className='hover:-translate-y-1 transition duration-200 '>
                Generate Invoice
            </Button>
        </div>
    </nav>
  )
}

export default Navbar