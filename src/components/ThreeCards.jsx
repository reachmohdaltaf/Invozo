import React from 'react';
import { Card } from './ui/card';
import { Skeleton } from "@/components/ui/skeleton"


const ThreeCards = () => {
  return (
    <div className="mt-20 relative group">
      <Card
        className=" h-80  gap-4   flex flex-col relative rotate-6  p-4 w-60 border-none  bg-gradient-to-r from-blue-400 to-blue-600 
        transform transition-all duration-300 group-hover:rotate-12 translate-x-10 group-hover:translate-x-40"
      >
        <Skeleton className="w-full h-[50px]  p-10" />
       <div className='flex gap-1'>
       <Skeleton className="w-[10px] h-[20px]  p-10" />
       <Skeleton className="w-full h-[20px]  " />
       </div>
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />

      </Card>
      <Card
        className=" flex flex-col shadow-[0px_0px_100px_4px_rgba(59,_130,_246,_0.5)]
 shadow-blue-900 gap-4 h-80  z-10 absolute top-0 rotate-0 p-4 border-none w-60 bg-gradient-to-r from-blue-400 to-blue-600 
        transform transition-all duration-300 group-hover:rotate-0 group-hover:-translate-y-5  "
      >
        <Skeleton className="w-full h-[50px]  p-10" />
       <div className='flex gap-1'>
       <Skeleton className="w-[10px] h-[20px]  p-10" />
       <Skeleton className="w-full h-[20px] p-10 " />
       </div>
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-10  " />
        
      </Card>
      <Card
        className=" h-80   flex flex-col  gap-4 absolute top-0 -rotate-6 p-4 border-none w-60 bg-gradient-to-r from-blue-400 to-blue-600 
        transform transition-all duration-300 group-hover:-rotate-12 -translate-x-10 group-hover:-translate-x-40  "
      >
         <Skeleton className="w-full h-[50px]  p-10" />
       <div className='flex gap-1'>
       <Skeleton className="w-[10px] h-[20px]  p-10" />
       <Skeleton className="w-full h-[20px] p-10 " />
       </div>
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-5  " />
       <Skeleton className="w-full h-10  " />
      </Card>
    </div>
  );
};

export default ThreeCards;
