import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import DetailsLesson from "./detailsLesson";
import DeleteLesson from "./deleteLesson";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  right: 0;
  top: 0;
  padding: 0.5rem;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  right: 3rem;
  top: 0;
  padding: 0.5rem;
`;

const ListContainer = styled.ul`
  flex-grow: 1;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 34.5vh;
  list-style-type: none;
  border: none;
  margin: 0;
  direction: rtl;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  border-radius: 20px;
  margin-bottom: 3rem;
  margin-block-start: 0em;
  margin-block-end: 0em;
  padding-inline-start: 0px;

  filter: ${(props) => (props.isModalOpen ? "blur(5px)" : "none")};
  pointer-events: ${(props) => (props.isModalOpen ? "none" : "auto")};
  opacity: ${(props) => (props.isModalOpen ? 0.6 : 1)};
`;

const ListItem = styled.li`
  box-shadow: 1px 5px 10px 1px grey;
  background-color: #ffffff;
  color: black;
  position: relative;
  // text-align: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  flex-grow: 1;
  max-width: 215px;
  display: flex;
  justify-content: space-evenly;
`;

export const IndividualDay = ({ displayedData }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonIdToHide, setLessonIdToHide] = useState([]);

  const displayLessons = () => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const sortByEndTime = (arr) => {
      return arr.sort((a, b) => parseTime(a.endTime) - parseTime(b.endTime));
    };

    const filteredLessons = displayedData.filter((lesson) => {
      return !lessonIdToHide.includes(lesson._id);
    });

    if (lessonIdToHide.length > 0 && filteredLessons.length === 0) {
      return [];
    }

    const approvedLessons = filteredLessons.filter(
      (lesson) => lesson.isApproved
    );

    return sortByEndTime(approvedLessons);
  };

  const hideLesson = (lessonId) => {
    setLessonIdToHide((prev) => [...prev, lessonId]);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lesson) => {
    setCurrentLesson(lesson);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentLesson(null);
    setModalType("");
  };

  const renderModalContent = () => {
    if (modalType === "details") {
      return (
        <DetailsLesson lesson={currentLesson} closeModal={handleCloseModal} />
      );
    } else if (modalType === "delete") {
      return (
        <DeleteLesson
          lesson={currentLesson}
          closeModal={handleCloseModal}
          hideLesson={hideLesson}
        />
      );
    }
    return null;
  };

  if (displayedData.length > 0) {
    const time = displayedData[0].day;
    // const date = new Date(time);

    return (
      <>
        <ListContainer isModalOpen={isModalOpen}>
          {displayLessons().map((l, index) => {
            if (
              user?.user?.role === "admin" &&
              l.isApproved &&
              l.type !== "group"
            ) {
              return (
                <section
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "1rem",
                      direction: "rtl",
                      alignContent: "center",
                    }}
                  >
                    {l.startTime} - {l.endTime}
                  </span>
                  <ListItem key={index}>
                    {user?.user?.role === "admin" && (
                      <CloseButton onClick={() => handleOpenDeleteModal(l)}>
                        <CloseIcon />
                      </CloseButton>
                    )}

                    <div style={{ width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ direction: "ltr" }}>
                          {l.startTime} - {l.endTime}
                        </span>
                        <strong>
                          <span>אימון אישי</span>
                          <br />
                          <span>מאמן: {l.trainer}</span>
                          <br />
                          {l.type === "private" && (
                            <span style={{ direction: "rtl" }}>
                              {" "}
                              {l.studentName} {l.studentPhone}
                            </span>
                          )}
                        </strong>
                      </div>
                    </div>
                  </ListItem>
                </section>
              );
            } else if (l.type === "group") {
              return (
                <section
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "1rem",
                      direction: 'ltr',
                      alignContent: "center",
                    }}
                  >
                    {l.startTime} - {l.endTime}
                  </span>
                  <ListItem key={index}>
                    {user?.user?.role === "admin" && (
                      <CloseButton onClick={() => handleOpenDeleteModal(l)}>
                        <CloseIcon />
                      </CloseButton>
                    )}

                    <div style={{ width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <strong>
                          <span style={{}}>
                            {l.type === "private" ? "אימון אישי" : l.name}
                          </span>
                          <br />
                          <span
                            style={{
                              direction: "rtl",
                              height: "fit-content",
                              display: "flex",
                              alignItems: "center",
                              fontSize: '0.8rem'
                            }}
                          >
                            {" "}
                            <PermIdentityIcon />
                            {l.trainer}
                          </span>
                          <span style={{fontSize: '0.8rem'}}>פרטים נוספים: {l.description}</span>
                        </strong>
                      </div>
                    </div>
                  </ListItem>
                </section>
              );
            }
          })}
        </ListContainer>

        {isModalOpen && (
          <Modal type={modalType} closeModal={handleCloseModal}>
            {renderModalContent()}
          </Modal>
        )}
      </>
    );
  }

  return <h1>לחץ על תאריך צבוע</h1>;
};

export default IndividualDay;
