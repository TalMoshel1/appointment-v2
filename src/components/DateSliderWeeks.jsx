import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";

const DateSlider = () => {
  const currentDateString = useSelector((state) => state.calendar.currentDate);
  const [dates, setDates] = useState(generateDatesFrom(new Date(), 30));
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
    ],
    afterChange: (currentIndex) => handleScrollEnd(currentIndex),
  };

  function generateDatesFrom(startDate, count) {
    const dates = [];

    // Generate dates starting from the specified start date
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toDateString());
    }

    return dates;
  }

  const loadMoreDates = useCallback(() => {
    if (loading) {
      return;
    }

    setLoading(true);

    // Start generating dates from the day after the last date in the array
    const lastDate = new Date(dates[dates.length - 1]);
    lastDate.setDate(lastDate.getDate() + 1);

    const newDates = generateDatesFrom(lastDate, 30);

    setDates((prevDates) => [...prevDates, ...newDates]);
    setLoading(false);
  }, [dates, loading]);

  const handleScrollEnd = (currentIndex) => {
    const totalSlides = dates.length;
    const slidesToShow = 6;
    const isNearEnd = currentIndex >= totalSlides - slidesToShow;

    if (isNearEnd) {
      loadMoreDates();
    }
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {dates.map((date, index) => (
          <div key={index}>
            <h3>{date}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DateSlider;
