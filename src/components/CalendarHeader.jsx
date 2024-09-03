import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView, incrementDate, setMonth } from '../redux/calendarSlice';
import styled from 'styled-components';
import { renderDays } from '../functions/renderDays';
import { formatThreeLettersMonthAndDaysToHebrew } from '../functions/formatThreeLettersMonthAndDaysToHebrew';
import DateSliderDays from '../components/DateSliderDays.jsx'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Header = styled.header`
    background-color: #FBFBFB;
    color: #778899;
    direction: rtl;
    display: flex;
    align-items: center;

  @media (orientation: portrait) {
    gap: 0.75rem;
    direction: rtl;
    justify-content: center;
    padding: 0.5rem;
    z-index: 2; 

  }

  button { 
all: unset;
cursor: pointer;


  }

      @media (orientation: landscape) {
    justify-content: space-evenly;
    height: 5rem;
    }

    @media (orientation: portrait) { 
    height: fit-content;
    }
  // .viewController {
  //   background-color: white;
  //   z-index: 2; 
  // }

  select {
  background-color: #2C3E50;
    color: #EDEDED;
    border: 2px solid #66FCF1;
    border-radius: 5px;
    padding: 0.5rem;
    appearance: none;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    font-size: 1rem;
    outline: none;
    position: relative;
    text-align:center;
    }

    select:hover,select:focus{
      background-color: #34495E;
  border-color: #38B2AC;
}

select::after{
  content: '▼';
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: #EDEDED;
}


  option {
  text-align:center;
    background-color: #2C3E50;
  color: #EDEDED;
  }

  option:hover{
    // background-color: #2E4053;
    background-color: red;

  }
  

`;

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDateString = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);
  let [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    if (currentDateString) {
      setCurrentDate(new Date(currentDateString));
    }
  }, [currentDateString]);

  const handleNext = () => {

    if (view === 'week') {
      dispatch(incrementDate(7));
    } else {
      dispatch(incrementDate(1));
    }
  };

  const handlePrev = () => {
    if (view === 'month') {
      dispatch(setMonth(-1));
    } else if (view === 'week') {
      dispatch(incrementDate(-7));
    } else {
      dispatch(incrementDate(-1));
    }
  };
console.log
  const daysweek = renderDays(new Date(currentDate), 'week');

  let firstDate = daysweek[0].displayedDate.split(' ');
  let endDate = daysweek[daysweek.length - 2].displayedDate.split(' ');

  const monthInHebrew = formatThreeLettersMonthAndDaysToHebrew('month', endDate[1]);
  const startMonthInHebrew = formatThreeLettersMonthAndDaysToHebrew('month', firstDate[1]);

  if (monthInHebrew === startMonthInHebrew) {
    const DateString = `${startMonthInHebrew} ${endDate[3]}`;

  }
  console.log(monthInHebrew, startMonthInHebrew)
  const DateString = monthInHebrew !== startMonthInHebrew 
  ? `${startMonthInHebrew} - ${monthInHebrew} ${endDate[3]}`
  : `${startMonthInHebrew} ${endDate[3]}`;

  return (
    <Header>
        <>
          <button onClick={handlePrev} style={{marginLeft: '3rem'}}>
            {/* {view === 'week' ? 'שבוע קודם' : view === 'day' ? 'יום קודם' : ''} */}
            <KeyboardArrowRightIcon/>
          </button>

          <span style={{ direction: 'rtl' }}>
            {currentDate && <>
              {DateString}
            </>
            }
          </span>
        </>

        <button onClick={handleNext} style={{marginRight: '3rem'}}>
          {/* {view === 'week' ? 'שבוע הבא' : view === 'day' ? 'יום הבא' : ''} */}
          <KeyboardArrowLeftIcon/>

        </button>
    </Header>
  );
};

export default React.memo(CalendarHeader);
