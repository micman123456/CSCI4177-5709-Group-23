import React, { useEffect, useState } from 'react';
import "../styles/calendar.css";
import NavbarLoggedIn from '../components/NavbarLoggedIn';

const Calendar = () => {
  const [daysContent, setDaysContent] = useState('');
  const [currentDateContent, setCurrentDateContent] = useState('');
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    renderCalendar();
  }, [month, year]);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(year, month, 1).getDay();
    let lastDateofMonth = new Date(year, month + 1, 0).getDate();
    let lastDayofMonth = new Date(year, month, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(year, month, 0).getDate();
    let liTags = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      liTags.push(<li className='inactive'>{lastDateofLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      liTags.push(<li>{i}</li>);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTags.push(<li className='inactive'>{i - lastDayofMonth + 1}</li>);
    }

    setDaysContent(liTags);
    setCurrentDateContent(`${months[month]} ${year}`);
  };

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <>
    <NavbarLoggedIn/>
    
    <div className='container_c'>
          <div className='row'>
          
          <div className='col-md-10'>
              <div className='row'>
              <div className='calender-container'>
            
            <header className='cal-head'>
              <div className='month'>

              
              <p className="current-date">{currentDateContent}</p>
              </div>
              <div className="icons">
                <span id="prev" className="material-symbols-rounded" onClick={handlePreviousMonth}>-</span>
                <span id="next" className="material-symbols-rounded" onClick={handleNextMonth}>+</span>
              </div>
            </header>
            <div className="calendar_c">
              <ul className="weeks_c">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
              </ul>
              <ul className="days_c">
                {daysContent}
              </ul>
            </div>
          </div>

        </div>
        </div>
        <div className='col-md-2'>
            <div className='calendar-legend'>
            <ul class="list-group">
                <li class="list-group-item">Classes</li>
                <li class="list-group-item"><small>CSCI 1111 - color</small></li>
                <li class="list-group-item list-group-item-secondary"><small>CSCI 1234 - color</small></li>
                <li class="list-group-item list-group-item-secondary"><small>CSCI 3160 - color</small></li>
                <br></br>
                <li class="list-group-item">Icons</li>
                <li class="list-group-item"><small>Assignment - icon</small></li>
                <li class="list-group-item list-group-item-secondary"><small>Quiz/Test - icon</small></li>
                <li class="list-group-item list-group-item-secondary"><small>Readings - icon</small></li>
                <li class="list-group-item list-group-item-secondary"><small>Other/misc - icon</small></li>
                
            </ul>


            </div>
            
        </div>
        </div>
        </div>
        </>

  );
};

export default Calendar;
