import React, { useState,useEffect, Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import moment from 'moment';
import '../styles/datetime.scss'

const Date = ({ onDateTimeChange }) => {

  const [times,setTimes]=useState({});
  const [dates,setDates]=useState({});

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const[select,setSelect]=useState(false)
  const[selectedItem,setSelectedItem]=useState();
  const[selectedItemTime,setSelectedItemTime]=useState();
  const handleDateChange = (value,index) => {
                 
        setSelectedItem(index);
        setSelectedDate(value);
       
  };
  const handleCancel=()=>{
    setSelectedDate();
    setSelectedTime();
    setSelectedItem();
    setSelectedItemTime();
  };
  const handleContinue=(i,item)=>{
    
    
    const temp = moment().hour(9).minute(0);
    const interval=60*item;
    
    temp.add(interval, 'minutes');
    const date = moment().add(i, 'days').format('MMMM D, YYYY');
    var time=dates[date];
    
    time[temp.format('hh:mm A')]=0;
    
    setDates({...dates,[date]:time})
    setSelectedDate();
    setSelectedTime();
    setSelectedItem();
    setSelectedItemTime();
};
useEffect(()=>{
    console.log(dates)
    setDates(dates)
   },[dates]);
   
  
   useEffect(()=>{
    if(!selectedDate){
        setSelectedTime("");
    }
    
   },[selectedDate])
//    useEffect(()=>{
//     if(!select){
//         setSelectedDate('');
//         setSelectedTime('');
//     }
    
//    },[select])
  const handleTimeChange = (value,index) => {
    // console.log(value)
    if(selectedDate){
    setSelectedTime(value);
    setSelectedItemTime(index);
}
    else{
        setSelectedTime("");
        setSelectedItemTime();
    }
    // console.log(index);
    
  };
// useEffect(()=>{

// },[select]);
  useEffect(() => {
    const generateTimes = () => {
      return new Promise((resolve) => {
        const startTime = moment().hour(9).minute(0);
        const endTime = moment().hour(19).minute(0);
        const timeInterval = 60;
        const generatedTimes = {};

        const generateTime = () => {
          generatedTimes[startTime.format('hh:mm A')]=1;
          startTime.add(timeInterval, 'minutes');

          if (startTime.isSameOrBefore(endTime)) {
            setTimeout(generateTime, 0); // Simulating asynchronous behavior
          } else {
            resolve(generatedTimes);
          }
        };

        generateTime();
      });
    };

    const fetchData = async () => {
      try {
        const generatedTimes = await generateTimes();

        const updatedData = {};
        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, 'days').format('MMMM D, YYYY');
            updatedData[date] = {...generatedTimes}; // Copying generatedTimes array
        }
        
        setTimes({...generatedTimes}); // Set the times array
        console.log(generatedTimes);
        // console.log(times.len)
        setDates(updatedData); // Set the dates state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
useEffect(()=>{
    // console.log(times)
    // console.log(dates)
},[times]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="parent-container">
    <div className="container">
      <h2>Pick Date and Time of Appointment</h2>
      <Carousel responsive={responsive} className='time'>
        {Object.entries(dates).map(([date, times],index) => (
        <div  key={`date-${index}`} style={{borderRadius:"10px",padding:"3px",width:"50%"}}a onClick={() => handleDateChange(date,index)}>
          <h3>{date}</h3>
         
            {index == selectedItem  && Object.entries(times).map(([time, flag],index) => (
                flag!=1?<button disabled='true' className="time-slot" key={`time-${index}`} style={{marginTop:"10px",border:"1px solid black",borderRadius:"10px",padding:"3px"}} onClick={() => handleTimeChange(time,index)}>
                {time}
                </button>:
                <button  className="time-slot" key={`time-${index}`} style={{marginTop:"10px",border:"1px solid black",borderRadius:"10px",padding:"3px"}} onClick={() => handleTimeChange(time,index)}>
                {time}
                </button>
            ))}
       
        </div>
      ))}
      </Carousel>

        <div className='date-show'>
            {selectedDate} {selectedTime}
        </div>
        
    </div>
        <div className="btns">
            <button className="btn cancel" onClick={()=>handleCancel()}>
                cancel
            </button>
            <button className="btn continue" onClick={()=>handleContinue(selectedItem,selectedItemTime)}>
                continue
            </button>
        </div>
    </div>
  );
};

export default Date;

