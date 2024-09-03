import React, { useState, useCallback, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { isSameDate } from "../functions/compareDatesFormats";
import { IndividualDay } from "./IndividualDay.jsx";
// import { setLessonsToDisplay } from "../redux/calendarSlice.js";
import { formatThreeLettersMonthAndDaysToHebrew } from "../functions/formatThreeLettersMonthAndDaysToHebrew";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

import EmblaCarousel from "../embla/EmblaCarousel.jsx";



const DateSlider = () => {




  const [dates, setDates] = useState(generateDatesFrom(new Date(), 30));
  const [loading, setLoading] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const dispatch = useDispatch();
  const [lessonsMap, setLessonsMap] = useState([]);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [individualDay, setIndividualDay] = useState([]);


  const handleDisplayData = (data) => {
    if (clickDisabled) return;

    const lessons = Object.values(data)[0];
    if (lessons && lessons.length > 0) {
      setIndividualDay(lessons);
    } else {
      setIndividualDay([]);
    }
  };

  useEffect(() => {
    if (lessonsMap && lessonsMap.length > 0) {
      const mergedData = mergeDateWithLessons();
      setDates(mergedData);
      setLoading(false);
    }
  }, [lessonsMap]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (currentIndex) => handleScrollEnd(currentIndex),
    beforeChange: () => handleSlideInteraction(),
  };

  function generateDatesFrom(startDate, count) {
    const dates = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateObj = {
        [date.toDateString()]: [],
      };
      dates.push(dateObj);
    }
    return dates;
  }

  const sendLessonsRequest = async (startDate, endDate) => {
    try {
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/days",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: startDate,
            end: endDate,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const mergeDateWithLessons = () => {
    const lessonsMapByDate = (lessonsMap || []).reduce((map, lesson) => {
      const lessonDate = new Date(lesson.day).toDateString();
      if (!map[lessonDate]) {
        map[lessonDate] = [];
      }
      map[lessonDate].push(lesson);
      return map;
    }, {});

    const updatedDates = dates.map((dateObj) => {
      const dateKey = Object.keys(dateObj)[0];
      const matchingLessons = lessonsMapByDate[dateKey] || [];
      return {
        [dateKey]: matchingLessons,
      };
    });

    return updatedDates;
  };

  const loadMoreDates = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const lastDateKey = Object.keys(dates[dates.length - 1])[0];
    const lastDate = new Date(lastDateKey);
    lastDate.setDate(lastDate.getDate() + 1);

    const newDates = generateDatesFrom(lastDate, 30);

    const newLessons = await sendLessonsRequest(
      Object.keys(newDates[0])[0],
      Object.keys(newDates[newDates.length - 1])[0]
    );

    if (newLessons && newLessons.length > 0) {
      setLessonsMap((prevLessons) => [...prevLessons, ...newLessons]);
    }

    setDates((prevDates) => [...prevDates, ...newDates]);

    // Move the slider to the date 30 days before the end
    setCurrentSlide(dates.length);

    setLoading(false);
  }, [dates, loading]);

  const handleScrollEnd = (currentIndex) => {
    const slidesToShow = 4;
    const totalSlides = dates.length;
    const isNearEnd = currentIndex >= totalSlides - slidesToShow;

    if (isNearEnd) {
      loadMoreDates();
    }
  };

  const handleSlideInteraction = () => {
    setClickDisabled(true);
    setTimeout(() => {
      setClickDisabled(false);
    }, 200);
  };

  useEffect(() => {
    setLoading(true);
    const fetchInitialData = async () => {
      const lessons = await sendLessonsRequest(
        Object.keys(dates[0])[0],
        Object.keys(dates[dates.length - 1])[0]
      );

      if (lessons && lessons.length > 0) {
        setLessonsMap(lessons);
      }
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [dates, currentSlide]);

  const LoadingContainer = styled.div`

  z-index: 998;
  text-align: center;
  margin:0.2rem;
  border-radius: 22px;
  // overflow:'hidden';
`

const OPTIONS = { direction: 'rtl' }
const SLIDES = dates.map((dateObj, index) => {
  const dateKey = Object.keys(dateObj)[0];
  const hasLesson = (lessonsMap || []).some(
    (lesson) =>
      isSameDate(dateKey, new Date(lesson.day).toDateString()) &&
      lesson.isApproved
  );

  const day = dateKey.split(",")[0].split(" ")[0];
  if (loading) {
    return (
      <div className="" style={{ position: "relative" }}>
        <LoadingContainer
          style={{
            position: "relative",
            top: "2px",
          }}

          
        >
          <ClipLoader color='1px solid #66FCF1'/>
        </LoadingContainer>
      </div>
    );
  }
  console.log(dateObj)
  return (
    <div
      key={index}
      onClick={() => {
        if (hasLesson) {
          handleDisplayData(dateObj);
        }
      }}
      className="slider-item"
    >
      <h3 className={hasLesson ? "item-h hasLesson" : "item-h"}>
        {formatThreeLettersMonthAndDaysToHebrew("day", day) ?? "ש'"}
        <br />
        {new Date(dateKey).getDate()}
        {/* {new Date(dateKey).getMonth() + 1}/
        {new Date(dateKey).getFullYear()} */}
      </h3>
    </div>
  );
})


  return (
    <>
      {/* <div className="slider-container" style={{ position: "relative" }}>
        <Slider ref={sliderRef} {...settings}>
          {dates.map((dateObj, index) => {
            const dateKey = Object.keys(dateObj)[0];
            const hasLesson = (lessonsMap || []).some(
              (lesson) =>
                isSameDate(dateKey, new Date(lesson.day).toDateString()) &&
                lesson.isApproved
            );

            const day = dateKey.split(",")[0].split(" ")[0];
            if (loading) {
              return (
                <div className="" style={{ position: "relative" }}>
                  <LoadingContainer
                    style={{
                      position: "relative",
                      top: "2px",
                    }}

                    
                  >
                    <ClipLoader color='1px solid #66FCF1'/>
                  </LoadingContainer>
                </div>
              );
            }
            return (
              <div
                key={index}
                onClick={() => {
                  if (hasLesson) {
                    handleDisplayData(dateObj);
                  }
                }}
                className="slider-item"
              >
                <h3 className={hasLesson ? "item-h hasLesson" : "item-h"}>
                  {formatThreeLettersMonthAndDaysToHebrew("day", day) ?? "שבת"}
                  <br />
                  {new Date(dateKey).getDate()}/
                  {new Date(dateKey).getMonth() + 1}/
                  {new Date(dateKey).getFullYear()}
                </h3>
              </div>
            );
          })}
        </Slider>
      </div> */}

<EmblaCarousel slides={SLIDES} options={OPTIONS} />


      {/* {individualDay.length > 0 && (
        <IndividualDay displayedData={individualDay} />
      )} */}
    </>
  );
};

export default DateSlider;
