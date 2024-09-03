import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSetDeleteLessonModal, toggleSetDetailsLessonModal } from "../redux/calendarSlice";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0.5rem;
`;

export const HourContainer = styled.div`
  display: flex;
  direction: rtl;
  align-items: center;
  color: black;
  padding-top: 2rem;
  padding-bottom: 1em;
  width: 100%;
  position: relative;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.eventBackgroundColor};
  margin-bottom:1rem;

  @media (orientation: portrait) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  @media (orientation: landscape) {
    border-radius: 8px;
  }
`;

const Hour = styled.div`
  font-size: 1.2rem;
  width: min-content;
  direction: ltr;
`;

const HourEventContainer = styled.div``;

const HourEvent = styled.div`
  h2,
  h3 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  @media (orientation: portrait) { 
  h3 { 
  font-size: 0.7rem;
  }
  }
`;

export const InfoButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0.5rem;
`;

const Lesson = ({ lesson, removeLesson }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lessonId) => {
    return dispatch(toggleSetDeleteLessonModal(lessonId));
  };

  const handleOpenDetailsModal = (details) => {
    return dispatch(toggleSetDetailsLessonModal(details));
  };

  if (lesson.lesson.type === "private" && lesson.lesson.isApproved === true) {
    return (
      <HourContainer>
        {user?.user?.role === "admin" && (
          <CloseButton onClick={() => handleOpenDeleteModal(lesson)}>
            <CloseIcon style={{ fontSize: "1rem" }} />
          </CloseButton>
        )}
        <InfoButton>
          <InfoIcon style={{ fontSize: "1rem", color: "black" }} />
        </InfoButton>
        <Hour>
          {lesson.lesson.startTime} - {lesson.lesson.endTime}
        </Hour>
        <strong>אימון אישי {lesson.lesson.trainer}</strong>

        <HourEventContainer>
          <HourEvent style={{ fontSize: "0.4rem" }}>
            <strong>
              {" "}
              {lesson.lesson.studentName}
              <br />
              {lesson.lesson.studentPhone}
            </strong>
          </HourEvent>
        </HourEventContainer>
      </HourContainer>
    );
  }
  if (lesson.lesson.type === "group") {
    const wordsArray = lesson.lesson.name.match(/[\u0590-\u05FFa-zA-Z0-9-]+/g);
    return (
      <HourContainer>
        {user?.user?.role === "admin" && (
          <CloseButton onClick={() => handleOpenDeleteModal(lesson)}>
            <CloseIcon style={{ fontSize: "1rem" }} />
          </CloseButton>
        )}
        <InfoButton onClick={() => handleOpenDetailsModal(lesson)}>
          <InfoIcon style={{ fontSize: "1rem", color: "black" }} />
        </InfoButton>
        <Hour>
          <strong>{lesson.lesson.startTime} - {lesson.lesson.endTime}</strong>
        </Hour>
        <HourEventContainer>
          <HourEvent>
            <h2 style={{fontWeight: 'normal'}}>{lesson.lesson.trainer}</h2>
            <h3>
              {wordsArray.map((w, i) => (
                <React.Fragment key={i}>
                  {w}
                  {i !== wordsArray.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h3>
          </HourEvent>
        </HourEventContainer>
      </HourContainer>
    );
  }
};

export default Lesson;
