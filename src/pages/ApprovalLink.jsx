import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { openWhatsApp } from "../functions/sendWhatsApp";

const ApprovalLink = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isApproved, setIsApproved] = useState(false);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const [approvedLesson, setApprovedLesson] = useState();


  useEffect(() => {
    const authenticateRequest = async () => {
      try {
        const token = JSON.parse(boxing)?.token;
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
          navigate("/signin", { state: { state: '/requestPrivte' } });
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/signin", { state: { state: '/requestPrivte' } });
      }
    };

    authenticateRequest();
  }, [boxing, navigate, location]);

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const token = JSON.parse(boxing)?.token;
        const response = await fetch(
          `https://appointment-back-qd2z.onrender.com/api/lessons/approveLink/${lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data) {
          setApprovedLesson(data.lesson);
          return setIsApproved(data);
        }
      } catch (error) {
        setIsApproved({ message: "שיעור כבר קבוע במערכת בזמן זה" });
      }
    };

    if (lessonId && JSON.parse(boxing)?.token) {
      sendPostRequest();
    }
  }, [lessonId, boxing]);

  if (isApproved) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
        style={{color: '#66FCF1'}}
        >{isApproved.message && 'האימון נוסף'}</p>
        {isApproved.message !== "שיעור כבר קבוע במערכת בזמן זה" && (
          <button
            style={{ width: "max-content", padding: '1rem', borderRadius: '20px', color: '#66FCF1', backgroundColor: 'rgba(56, 178, 172, 0.1)' }}
            onClick={() => openWhatsApp(approvedLesson, approvedLesson.studentPhone)}
          >
            שלח תזכורת למתאמן
          </button>
        )}
      </div>
    );
  }

};

export default ApprovalLink;
