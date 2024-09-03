import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementHour } from "../functions/incrementHour.js";
import styled from "styled-components";
import { openWhatsApp } from "../functions/sendWhatsApp.js";
import ClipLoader from "react-spinners/ClipLoader";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";


export const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  direction: rtl;
  width: 100%;
  max-width: 30vw;
  text-align: center;

  @media (orientation: portrait) {
    max-width: 40vw;
    .whatsapp {
      width: 90vw;
    }
  }

  @media (orientation: landscape) {
    .whatsapp {
      width: 100%;
    }
  }

  button {
    all: unset;
    background-color: white;
    color: #2e3a46;
    cursor: pointer;
  }

  .whatsapp {
    margin-top: 1rem;
  }

  .date {
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    // text-align: start;
  }

  label {
    width: 100%;
    text-align: center;
  }

  input,
  select,
  .custom-select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
    background-color: white;
    color: black;
    font-size: 1rem;
    cursor: pointer;
  }

  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
`;

const StyledSelectContainer = styled.div`
  position: relative;
  width: 100%;

  .select-disabled {
    color: #ccc;
  }

  .custom-select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
    cursor: pointer;
    background-color: white;
    color: black;
  }

  .options-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 200px; /* Adjust height as needed */
    overflow-y: auto;
    background: white !important;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: none;
    color: black;
  }

  .options-container.show {
    display: block; /* Show options when select is clicked */
  }

  .option {
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      // background-color: #f1f1f1;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const RequestPrivateLesson = () => {
  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const [day, setDay] = useState();
  const [startTime, setStartTime] = useState("");
  const [trainer, setTrainer] = useState("David");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [cantIn, setCantIn] = useState([]);
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const [loading, setLoading] = useState(false);




  useEffect(()=>{
    if (trainerPhone === '') {
      navigate('/signin', {state: {state: '/requestPrivte'}})
    }
  },[])
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


        openWhatsApp(data, `${trainerPhone}`, 'coach');
      
 
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

  if (message) {
    return <p>{message}</p>;
  }

  if (trainerPhone !== '') {

    return (
      <RequestForm onSubmit={handleSubmit}>
        <label htmlFor="date">תאריך</label>
        <input
          className="date"
          type="date"
          onChange={handleInputChange}
          min={formatDateToYYYYMMDD(new Date())}
          required
          lang='he'
          dir='rtl'
        />
  
        {loading ? (
          <ClipLoader />
        ) : (
          <StyledSelectContainer ref={selectRef}>
            <div
              className="custom-select"
              onClick={() => setShowOptions(!showOptions)}
            >
              <label
                htmlFor="time"
                style={{ color: "black" }}
                className={!startTime ? "select-disabled" : ""}
              >
                {startTime || "בחר שעה"}
              </label>
            </div>
            <div className={`options-container ${showOptions ? "show" : ""}`}>
              {generateTimeOptions()}
            </div>
          </StyledSelectContainer>
        )}
  
        <label htmlFor="trainer">מאמן:</label>
        <select
          id="trainer"
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
          required
        >
          <option value="David">David</option>
          <option value="Eldad">Eldad</option>
        </select>
  
        <label htmlFor="studentName">שם מלא:</label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
  
        <label htmlFor="studentPhone">מספר פלאפון ליצירת קשר:</label>
        <input
          type="text"
          id="studentPhone"
          value={studentPhone}
          onChange={(e) => setStudentPhone(e.target.value)}
          required
        />
  
        <label htmlFor="studentMail">כתובת מייל מלאה:</label>
        <input
          type="email"
          id="studentMail"
          value={studentMail}
          onChange={(e) => setStudentMail(e.target.value)}
          required
        />
  
        <section
          className="whatsapp"
          style={{
            background:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <WhatsAppIcon
            style={{
              color: "green",
              transform: "scale(2)",
              position: "relative",
              top: "1.5rem",
            }}
          />
          <p
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              lineHeight: "1rem",
            }}
          >
            <br /> לאחר הלחיצה על{" "}
            <button disabled style={{ pointerEvents: "none" }}>
              שלח
            </button>{" "}
            אנא אשר שימוש ב WhatsApp ושלח את ההודעה האוטומטית שתראה למאמן שבחרת.
          </p>
        </section>
        <button type="submit">שלח</button>
      </RequestForm>
    );
  }

 
};

export default RequestPrivateLesson;
