import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Day.jsx";
import { compareDates } from "../functions/compareTime.js";
import "../css-components/Days.css";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { renderDays } from "../functions/renderDays.js";
import IndividualDay from "./IndividualDay.jsx";

const Days = () => {
  const [fetchedLessons, setFetchedLessons] = useState([]);
  const currentDateStr = useSelector((state) => state.calendar.currentDate);
  const currentDate = new Date(currentDateStr);
  const [lessonsToDisplay, setLessonsToDisplay] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todayDay, setDayToday] = useState(null);

  const getFormattedToday = () => {
    const today = new Date();
    return today.toDateString().split(" ").slice(0, 3).join(", ");
  };

  useEffect(() => {
    const sendPostRequest = async () => {
      setIsDisplay(false);
      try {
        const response = await fetch("http://localhost:3000/api/lessons/week", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startOfWeek: new Date(currentDateStr),
          }),
        });

        if (!response.ok) {
          setIsDisplay(true);
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("data: ", data);
        setFetchedLessons(data);
        const today = new Date();
        const formattedToday = today
          .toDateString()
          .split(" ")
          .slice(0, 3)
          .join(", ");
        const days = renderDays(currentDate, "week");

        const todayDay = days.find(
          (day) =>
            day.date.toDateString().split(" ").slice(0, 3).join(", ") ===
            formattedToday
        );

        if (todayDay) {
          setDayToday(todayDay);
          retrieveDataForDay(todayDay.displayedDate, data);
        } else {
          setSelectedDate(days[0]);
          retrieveDataForDay(days[0].displayedDate, data);
        }
        setIsDisplay(true);
      } catch (error) {
        console.error("Error sending POST request:", error);
        setIsDisplay(true);
      }
    };

    sendPostRequest();
  }, [currentDateStr]);

  const retrieveDataForDay = (dayDisplayedDate, fetchedLessonsProp) => {
    console.log("fetchedLessonsProp: ", fetchedLessonsProp);
    if (fetchedLessonsProp) {
      const lessonsForDay = fetchedLessonsProp.filter((lesson) =>
        compareDates(lesson.day, dayDisplayedDate)
      );
      return setLessonsToDisplay(lessonsForDay);
    }
    const lessonsForDay = fetchedLessons.filter((lesson) =>
      compareDates(lesson.day, dayDisplayedDate)
    );
    setLessonsToDisplay(lessonsForDay);
  };

  const SpinnerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  if (isDisplay) {
    return (
      <>
        <div className="days-container">
          {renderDays(currentDate, "week").map((day, index) => {
            if (!day.displayedDate.includes("Sat")) {
              return (
                <Day
                  key={index}
                  date={day}
                  isSelected={selectedDate?.displayedDate === day.displayedDate}
                  isToday={
                    todayDay?.displayedDate === day.displayedDate &&
                    !selectedDate?.displayedDate
                      ? "#00d180"
                      : todayDay?.displayedDate === day.displayedDate &&
                        selectedDate?.displayedDate
                      ? "rgba(0, 209, 128,0.5)"
                      : false
                  }
                  onSelectDate={() => {
                    console.log(day)
                    const date = new Date(day.date);
                    const today = new Date();

                    const sameYear = date.getFullYear() === today.getFullYear();
                    const sameMonth = date.getMonth() === today.getMonth();
                    const sameDay = date.getDate() === today.getDate();

                    if (sameYear && sameMonth && sameDay) {
                      retrieveDataForDay(day.displayedDate);
                      setSelectedDate();
                      return retrieveDataForDay(day.displayedDate);
                    }
                    console.log(date)
                    setSelectedDate(day);
                    retrieveDataForDay(day.displayedDate);
                  }}
                />
              );
            }
          })}
        </div>
        {lessonsToDisplay.length > 0 && (
          <IndividualDay displayedData={lessonsToDisplay} />
        )}
      </>
    );
  } else {
    return (
      <SpinnerContainer>
        <ClipLoader />
      </SpinnerContainer>
    );
  }
};

export default Days;
