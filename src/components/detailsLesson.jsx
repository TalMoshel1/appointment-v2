import React from "react"
import { useSelector } from "react-redux";

const DetailsLesson  = ({lesson}) => {


    const details = useSelector(
        (state) => state.calendar.detailsLessonModalData
      );



  return (
    <section>
        <p style={{direction:'rtl', color: 'black'}}>{lesson?.description ?? 
        details?.lesson?.description
        }</p>
      
    </section>
  )
};

export default DetailsLesson;
