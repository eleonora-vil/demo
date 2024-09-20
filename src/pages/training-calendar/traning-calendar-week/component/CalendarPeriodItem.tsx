import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import IndicatorIcons from '@/components/icons/indicator-icons';
import OtherIcons from '@/components/icons/other-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/syllabus-detail-api';
import React, { useEffect, useState } from 'react'

const CalendarPeriodItem = ({item}:any) => {
    
    console.log(item);
    const[data,setData]=useState<any>()
    const getData=async()=>{
        try {
            const result=await axiosClient.get(`/api/Class/Detail/${item.classID}`)
            console.log(result.data.result);
            
            setData(result.data.result)
            
        } catch (error) {
            return handleApiError(error)
        }
    }
    useEffect(()=>{
        getData()
    },[item])
    console.log(data);
    
  return (
    <>
     <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
        <div
    className="bg-primary rounded-xl cursor-default text-white py-2 px-4 text-sm break-words  w-full "
  >
   {item.className}
  </div>
        </TooltipTrigger>
        <TooltipContent>
        <div className="rounded w-[150px]">
       <div className='flex justify-between  lg:flex-row  sm:flex-col'>
         <div className="flex flex-row   ">
           <OtherIcons icon="domain" />
           Room
         </div>
         <div>
         {data?.classDetail?.map((item:any,index:number)=>{
            if(index == 0){
              if(item.roomId == 1){
                return (<div className="flex gap-1" key={index}>
                
                
                <div key={`location-${index}`}> 105</div>
              </div>)
               
              }
              else if(item.roomId == 2){
                return( <div className="flex gap-1" key={index}>
                
                
                <div key={`location-${index}`}> 104</div>
              </div>)
              }
              else if(item.roomId == 3){
                return (<div className="flex gap-1" key={index}>
                
                
                <div key={`location-${index}`}> 103</div>
              </div>)
              }
              else{
                return (<div className="flex gap-1" key={index}>
                
                
                <div key={`location-${index}`}> 102</div>
              </div>)
              }
            }
           }
             
           )}
         </div>
       </div>
       <div  className='flex justify-between lg:flex-row  sm:flex-col' >
         <div className="flex flex-row   ">
           {" "}
           <DeliveryTypesIcons icon="lecture" />
           Trainer

         </div>
        <div>
   
            {data?.class?.instructor?.fullName}
        </div>
       </div>
       <div className='flex lg:flex-row justify-between sm:flex-col'>
         <div className="flex flex-row   ">
           {" "}
           <IndicatorIcons icon="grade" />
           Admin
         </div>
       </div>
       </div>
        </TooltipContent>
      </Tooltip>
     </TooltipProvider>
    </>
 
  )
  
}

export default CalendarPeriodItem