import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementHour } from "../functions/incrementHour.js";
import styled, { keyframes, css } from "styled-components";
import { openWhatsApp } from "../functions/sendWhatsApp.js";
import ClipLoader from "react-spinners/ClipLoader";

import SubmitPrivateRequest from "./SubmitPrivateRequest.jsx";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

/*function removeDuplicates(nums) {
  let i = 0; // Pointer for the current unique element
  let count = 0; // Counter for the number of duplicates allowed

  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
      count = 0;
    } else if (count < 1) {
      i++;
      nums[i] = nums[j];
      count++;
    }
  }

  return i + 1; // Return the number of unique elements
}
  
[1,1,2,2,2,3]

after first iteration:
i = 1
[1,1....]
count = 1


second iteration:
i = 2
[1,2]

*/

const SlideContainer = styled.div`
  transition: right 0.3s ease;

  label {
    padding-bottom: 1rem;
  }

  input {
    cursor: pointer;
  }

  font-size: 1rem;

  ::placeholder {
    color: black;
  }

  box-sizing: border-box;
`;

const Line1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: max-content;
  width: 100%;
`;

const Line2 = styled.div`
  display: flex;
  justify-content: space-between;
  height: max-content;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (orientation: landscape) {
    // width: 14.95rem;
  }

  @media (orientation: portrait) {
    width: 9.5rem;
  }

  input:focus {
    outline: none;
  }

  @supports (-webkit-touch-callout: none) {
    &,
    input {
      width: 7rem;
      max-width: 7rem !important;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    &,
    input {
      width: 6rem;
      max-width: 6rem;
    }
  }
`;

const Hour = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .custom-select {
    padding-top: 1.35rem;
    padding-bottom: 1.35rem;
    border-radius: 20px;
    width: 100%;
    text-align: center;
    background-color: #38b2ac !important;
  }

  @media (orientation: portrait) {
    height: 100%;
  }

  @media (orientation: landscape) {
    width: 3.925625rem;
  }

  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
`;

const Trainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;

  select,
  option {
    border: 1px solid grey;
    -webkit-appearance: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 20px;
    width: 100%;
    text-align: center;
    background-color: #38b2ac !important;
  }

  input[type="date"]:invalid + span:after {
    content: "Birthday";
    position: absolute;
    left: 0;
    top: 0;
  }

  input[type="date"]:focus:invalid + span:after {
    display: none;
  }

  input:not(:focus):invalid {
    color: transparent;
  }

  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
`;

const Name = styled.div`
  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Phone = styled.div`
  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Mail = styled.div`
  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const PrivateForm = styled.form`
  direction: rtl;
  border: 1px solid grey;
  border-radius: 20px;
  box-shadow: 52px 46px 104px -77px #38b2ac;
  color: black;

  @media (orientation: portrait) {
    width: 90%;
  }
  @media (orientation: landscape) {
    width: 23rem;
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;

  input {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 20px;
    width: 100%;
    text-align: center;
    background-color: #38b2ac !important;
  }

  label,
  h1 {
    color: #66fcf1;
  }
`;

export const StyledSelectContainer = styled.div`
  position: relative;

  .select-disabled {
    color: #ccc;
  }

  .custom-select {
    font-size: 1rem;
    // height: 3.35rem;

    // box-sizing: border-box;
    // text-align: center;
    // border: 1px solid grey;
    // border-radius: 20px;
    // padding: 1rem;
    // cursor: pointer;
    // color: black;
    // background-color: #38b2ac !important;

    @supports (-webkit-touch-callout: none) {
      label {
        font-size: 1.1rem;
        font-weight: 400;
      }
    }

    @supports not (-webkit-touch-callout: none) {
      label {
        font-size: 1rem;
      }
    }
  }

  .options-container {
    position: absolute;
    background-color: #38b2ac;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 20px;
    max-height: 200px; /* Adjust height as needed */
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: none;
    color: black !important;
  }

  .options-container.show {
    background-color: #38b2ac;

    display: block;
  }

  .option {
    background-color: #38b2ac;

    padding: 0.5rem;
    text-align: center;
    cursor: pointer;

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const scaleAnimation = keyframes`
0% {
  border-color:white;
}
50% {
  color:white;
  border-color:white;

}
100% {
  border-color:white;

}
`;

const ArrowLeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 1rem;
  justify-content: flex-end;
  border: 1px solid grey;
  border-radius: 20px;
  text-align: left;
  font-size: 1rem;
  transition: transform 1s ease-in;
  cursor: pointer;

  animation: ${(props) =>
    props.animate
      ? css`
          ${scaleAnimation} 1s ease-in-out infinite
        `
      : "none"};
`;

const RequestPrivateLesson = () => {
  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);
  const [day, setDay] = useState();
  const [startTime, setStartTime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [cantIn, setCantIn] = useState([]);
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const dayRef = useRef(null);
  const studentNameRef = useRef(null);
  const studentPhoneRef = useRef(null);
  const studentMailRef = useRef(null);
  const trainerRef = useRef(null);

  const [inputType, setInputType] = useState("text");

  const navigate = useNavigate();

  useEffect(() => {
    if (trainerPhone === "") {
      navigate("/signin", { state: { state: "/requestPrivte" } });
    }
  }, []);

  function isTenDigitNumber(str) {
    return /^\d{10}$/.test(str);
  }

  const handleFowardStep = () => {
    if (!day) {
      return dayRef.current.focus();
    }
    if (!startTime) {
      alert("יש לבחור שעה");
      return;
    }

    if (!studentName) {
      return studentNameRef.current.focus();
    }

    if (!studentPhone || !isTenDigitNumber(studentPhone)) {
      alert("יש להזין מספר טלפון תקין עם עשרה מספרים בלבד");
      studentPhoneRef.current.focus();
      return;
    }
    if (!studentMail) {
      return studentMailRef.current.focus();
    }
    if (!trainer || trainer === "בחר מאמן") {
      alert("יש לבחור מאמן");
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      setStep(step - 1);
    }
  };

  const getDayLessons = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/day",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: day,
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setThisDayLessons(data);
      setLoading(false);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  useEffect(() => {
    if (day) {
      getDayLessons();
    }
  }, [day]);

  useEffect(() => {
    if (thisDayLessons.length > 0) {
      const lessonsArray = thisDayLessons
        .filter((l) => l.isApproved)
        .map((l, index) => (
          <div key={index} style={{ direction: "ltr" }}>
            {l.startTime} - {l.endTime}
            <br />
          </div>
        ));
      setCantIn(lessonsArray);
    } else {
      setCantIn([]);
    }
  }, [thisDayLessons]);

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (e) => {
    const date = new Date(e.target.value);
    setDay(date);
  };

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const sendPostPrivateRequest = async () => {
    try {
      const endTime = incrementHour(startTime);
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/requestPrivateLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day,
            startTime,
            endTime,
            studentName,
            studentPhone,
            studentMail,
            trainer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      openWhatsApp(data, `${trainerPhone}`, "coach");

      setMessage("אימון נשלח לאישור מאמן");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!startTime) {
      alert("יש לבחור שעה");
      return;
    }
    sendPostPrivateRequest();
  };

  const handleSelectOption = (time) => {
    setStartTime(time);
    setShowOptions(false);
  };

  const generateTimeOptions = () => {
    const options = [];
    let hour = 8;
    let minute = 0;

    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    while (hour < 20 || (hour === 20 && minute === 0)) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      const timeInMinutes = parseTime(time);

      const isDisabled = cantIn.some((l) => {
        const start = l.props.children[0];
        const end = l.props.children[2];
        const startInMinutes = parseTime(start);
        const endInMinutes = parseTime(end);

        return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes;
      });

      options.push(
        <div
          key={time}
          style={{ textAlign: "center", fontSize: "0.85rem" }}
          className={`option ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleSelectOption(time)}
        >
          {time}
        </div>
      );
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }

    return options;
  };

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    if (inputType === "date") {
      setInputType("text");
    }
  };

  if (message) {
    return <p>{message}</p>;
  }

  if (trainerPhone !== "") {
    return (
      <>
        <main>
          <h1 style={{ textAlign: "center", color: "#66FCF1" }}>
            קביעת אימון פרטי
          </h1>

          <SlideContainer
            className="slideContainer"
            style={{
              display: "flex",
              direction: "rtl",
              position: "relative",
              width: "max-content",
              right: `${step === 0 ? "100%" : "0"}`,
            }}
          >
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PrivateForm>
                <Line1 className="line1">
                  <DateContainer className="date">
                    <label
                      htmlFor="date"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      תאריך:
                    </label>
                    <input
                      type="date"
                      onBlur={handleBlur}
                      style={{
                        fontSize: "1rem",
                        width: "100% !important",
                        height: "100%",
                        maxWidth: "100% !important",
                        fontSize: "1rem",
                      }}
                      className="date"
                      onChange={handleInputChange}
                      min={formatDateToYYYYMMDD(new Date())}
                      required
                      lang="he"
                      dir="rtl"
                      ref={dayRef}
                    />
                  </DateContainer>

                  <Hour className="hour">
                    <label
                      htmlFor=""
                      style={
                        {
                          // height:'2.15rem'
                        }
                      }
                    >
                      שעה:
                    </label>
                    <StyledSelectContainer
                      ref={selectRef}
                      style={{
                        width: "100%",
                        flexGrow: "1",

                        // height:'3.710rem'
                        // height:'max-content'
                        height: "100%",
                        maxHeight: "3.35rem",
                      }}
                    >
                      <div
                        className="custom-select"
                        onClick={() => setShowOptions(!showOptions)}
                        style={{
                          height: "100%",
                          maxHeight: "3.35rem",
                          overflow: "hidden",
                        }}
                      >
                        <label
                          htmlFor="time"
                          style={{
                            color: "black",
                            backgroundColor: "#38b2ac",
                            width: "100%",
                            cursor: "pointer",
                            textAlign: "center",
                            position: "relative",
                            top: "-40%",
                            left: "0%",
                          }}
                          className={!startTime ? "select-disabled" : ""}
                        >
                          {loading ? (
                            <ClipLoader size={10} />
                          ) : startTime ? (
                            startTime
                          ) : (
                            ""
                          )}
                        </label>
                      </div>
                      <div
                        className={`options-container ${
                          showOptions ? "show" : ""
                        }`}
                        STYLE={{
                          backgroundColor: "#38b2ac",
                          cursor: "pointer",
                          // maxHeight: '3.35rem',
                        }}
                      >
                        {generateTimeOptions()}
                      </div>
                    </StyledSelectContainer>
                  </Hour>

                  <Trainer className="trainer">
                    <label htmlFor="trainer" style={{}}>
                      מאמן:
                    </label>
                    <select
                      // id="trainer"
                      value={trainer}
                      placeholder="מאמן"
                      onChange={(e) => setTrainer(e.target.value)}
                      required
                      ref={trainerRef}
                      style={{
                        color: "black",
                        borderRadius: "20px",
                        backgroundColor: "#38b2ac",
                        height: "100%",
                        width: "100%",
                        maxHeight: "3.35rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        lineHeight: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "-webkit-center",
                        textAlignLast: "center",
                        position: "relative",
                        direction: "rtl",
                      }}
                    >
                      <option
                        className="coaches"
                        value=""
                        selected
                        style={{
                          lineHeight: "100%",
                          width: "100%",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          padding: "1rem",
                          border: "1px solid red",
                        }}
                      ></option>
                      <option value="David">David</option>
                      <option value="Eldad">Eldad</option>
                    </select>
                  </Trainer>
                </Line1>

                <Line2>
                  <Name className="name-container">
                    <label htmlFor="studentName">שם מלא:</label>
                    <input
                      type="text"
                      id="studentName"
                      value={studentName}
                      style={{ backgroundColor: "#38b2ac", fontSize: "1rem" }}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      ref={studentNameRef}
                      // placeholder="שם מלא"
                    />
                  </Name>
                  <Phone className="phone-container">
                    {" "}
                    <label htmlFor="studentPhone">מספר פלאפון:</label>
                    <input
                      type="text"
                      id="studentPhone"
                      value={studentPhone}
                      style={{ backgroundColor: "#38b2ac", fontSize: "1rem" }}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      required
                      ref={studentPhoneRef}
                      // placeholder="ללא סימנים מיוחדים"
                    />
                  </Phone>

                  <Mail className="mail-container">
                    <label htmlFor="studentMail">כתובת מייל:</label>
                    <input
                      type="email"
                      id="studentMail"
                      value={studentMail}
                      style={{
                        backgroundColor: "#38b2ac !important",
                        fontSize: "1rem",
                      }}
                      onChange={(e) => setStudentMail(e.target.value)}
                      required
                      ref={studentMailRef}
                    />
                  </Mail>
                </Line2>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <ArrowLeft
                    animate={
                      day &&
                      startTime &&
                      trainer !== "בחר מאמן" &&
                      studentName &&
                      studentMail &&
                      isTenDigitNumber(studentPhone)
                    }
                    onClick={handleFowardStep}
                  >
                    המשך
                    <KeyboardArrowLeftIcon />
                  </ArrowLeft>
                </div>
              </PrivateForm>
            </div>

            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SubmitPrivateRequest
                step={step}
                previous={handlePreviousStep}
                body={{
                  day,
                  startTime,
                  studentName,
                  studentPhone,
                  studentMail,
                  trainer,
                }}
              />
            </div>
          </SlideContainer>
        </main>
      </>
    );
  }
};

export default RequestPrivateLesson;
