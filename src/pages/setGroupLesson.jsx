import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import styled from "styled-components";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

const RequestForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 0.6rem;
  direction: rtl;
  width: 100%;
  max-width: 30vw;
  text-align: center;
  position: relative;

  .repeatMonth {
    background-color: white;
    color: black;
  }

  label {
    width: 100%;
    text-align: center;
    
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
    color: black;
    cursor: pointer;
  }

  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
  }
`;

const Main = styled.main`
  margin-top: 10svh;
`;

const SetGroupLesson = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [day, setDay] = useState("");
  const [formData, setFormData] = useState({
    trainer: "דוד",
    name: "",
    description: "",
    day: "",
    startTime: "",
    endTime: "",
    repeatsWeekly: false,
    repeatMonth: "1",
    isApproved: true,
    type: "group",
  });
  const [message, setMessage] = useState("");
  const [datePlaceholder, setDatePlaceholder] = useState("בחר תאריך");
  const [cantIn, setCantIn] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [thisDayLessons, setThisDayLessons] = useState([]);

  const [displayPage, setDisplayPage] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: newValue,
      };

      if (name === "repeatsWeekly" && newValue) {
        return {
          ...updatedFormData,
          startTime: "",
          endTime: "",
          repeatMonth: "1",
          isApproved: false,
        };
      }

      if (name === "repeatMonth" && prevFormData.repeatsWeekly) {
        const endDate = repeatEndDate(prevFormData.day, parseInt(value, 10));
        return {
          ...updatedFormData,
          repeatEndDate: endDate,
        };
      }

      return updatedFormData;
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDay(selectedDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: selectedDate,
    }));
    setDatePlaceholder(
      selectedDate ? `תאריך שנבחר: ${selectedDate}` : "בחר תאריך"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    const { repeatMonth, ...formDataToSend } = formData;

    const repeatEnd = repeatEndDate(formData.day, parseInt(repeatMonth, 10));

    try {
      const token = JSON.parse(localStorage.getItem("boxing"))?.token;
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            ...formDataToSend,
            repeatEndDate: repeatEnd,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message || "Success");
      handleCloseCreateGroupLesson();
    } catch (error) {
      console.error("Error creating group lesson:", error);
      setMessage("Error");
      handleCloseCreateGroupLesson();
    }
  };

  const handleCloseCreateGroupLesson = () => {
    dispatch(toggleSetGroupModal());
  };

  const handleCloseError = () => {
    setMessage("");
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      day,
    }));
  }, [day]);

  const authenticateRequest = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("boxing"))?.token;
      if (!token) throw new Error("No token found");
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/auth/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data.message !== "Token is valid") {
        navigate("/signin", { state: { state: "/setgrouplesson" } });
      } else {
        setDisplayPage(true)
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      navigate("/signin", { state: { state: "/setgrouplesson" } });
    }
  };

  useEffect(() => {
    authenticateRequest();
  }, []);

  if (message) {
    return (
      <Main>
        <div onClick={handleCloseError}>X</div>
        <strong>{message}</strong>
      </Main>
    );
  }

  if (displayPage) {
    return (
      <RequestForm onSubmit={handleSubmit} style={{left:'50%', transform:'translate(-50%)', marginBottom: '1rem'}}>
        <FormItemContainer>
          <label>אימון חוזר</label>
          <input
            type="checkbox"
            name="repeatsWeekly"
            checked={formData.repeatsWeekly}
            onChange={handleChange}
          />
  
          {formData.repeatsWeekly && (
            <FormItemContainer className="monthes-container">
              <label>לכמה חודשים:</label>
              <select
                name="repeatMonth"
                className="repeatMonth"
                value={formData.repeatMonth}
                onChange={handleChange}
                required={formData.repeatsWeekly}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </FormItemContainer>
          )}
        </FormItemContainer>
        <FormItemContainer>
          <label>תאריך האימון:</label>
          <input
            type="date"
            name="day"
            value={formData.day}
            onChange={handleDateChange}
            min={formatDateToYYYYMMDD(new Date())}
            placeholder={datePlaceholder}
            required
          />
        </FormItemContainer>
        <FormItemContainer>
          <label>שם האימון:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormItemContainer>
  
        <FormItemContainer>
          <label>תיאור האימון:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormItemContainer>
        <FormItemContainer>
          <label>שעת התחלה (דוגמא: 08:00):</label>
          <input
            type="text"
            name="startTime"
            pattern="[0-9]{2}:[0-9]{2}"
            placeholder="HH:MM"
            value={formData.startTime}
            onChange={handleChange}
            required={formData.repeatsWeekly}
          />
        </FormItemContainer>
        <FormItemContainer>
          <label>שעת סיום (דוגמא: 09:00):</label>
          <input
            type="text"
            name="endTime"
            pattern="[0-9]{2}:[0-9]{2}"
            placeholder="HH:MM"
            value={formData.endTime}
            onChange={handleChange}
            required={formData.repeatsWeekly}
          />
        </FormItemContainer>
  
        <button type="submit" onClick={handleSubmit}>
          צור אימון
        </button>
      </RequestForm>
    );
  }

};

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default SetGroupLesson;
