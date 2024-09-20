import { useState } from "react";
import CalendarPeriodItem from "./CalendarPeriodItem";
const CalendarPeriod = (props: any) => {

  const data = props.data;
  
  var Mon: any = [];
  var Tu: any = [];
  var Wed: any = [];
  var Thur: any = [];
  var Fri: any = [];
  var Sat: any = [];
  var Sun: any = [];
  
    data.map((item: any, index: number) => {
      if (new Date(item.day).getDay() == 0) {
        
        Sun.push(item);
      } else if (new Date(item.day).getDay() == 1) {
       
        Mon.push(item);
      } else if (new Date(item.day).getDay() == 2) {
      
        Tu.push(item);
      } else if (new Date(item.day).getDay() == 3) {
        
        Wed.push(item);
      } else if (new Date(item.day).getDay() == 4) {
        
        Thur.push(item);
      } else if (new Date(item.day).getDay() == 5) {
        
        Fri.push(item);
      } else if (new Date(item.day).getDay() == 6) {
       
        Sat.push(item);
      }
    });

  const Event = ({ event }: any) => {
    console.log(event);
    const [visible, setVisible] = useState(false);
    return (
      <>
        {event?.classes?.classes.map((item:any,index:number)=>
                <div key={index}>
                  <CalendarPeriodItem item={item}/>
                </div>

        
        )}
      </>
    );
  };
  return (
    <div className="grid grid-cols-7 gap-2 py-2">
      <div className="flex flex-col gap-2">{Sun?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
      <div className="flex flex-col gap-2">{Mon?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
      <div className="flex flex-col gap-2">{Tu?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
      <div className="flex flex-col gap-2">{Wed?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
      <div className="flex flex-col gap-2">{Thur?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
      <div className="flex flex-col gap-2">{Fri?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
      <div className="flex flex-col gap-2">{Sat?.map((item: any, index: number) => <Event event={item} key={index} />)}</div>
    </div>
  );
};

export default CalendarPeriod;
