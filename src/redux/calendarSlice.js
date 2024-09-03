import { createSlice } from '@reduxjs/toolkit';

const startOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
};

const initialState = {
  trainerPhone: '',
  currentDate: new Date().toISOString(),
  view: 'week',
  isPrivateModalOpen: false,
  privateModalData: null,
  isGroupModalOpen: false,
  groupModalData: null,
  isDeleteLessonModalOpen: false,
  deleteLessonModalData: null,
  isDetailsLessonModalOpen: false,
  detailsLessonModalData: null,


  lessonsToDisplay: null
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setTrainerPhone:(state,action) => {
      state.trainerPhone = action.payload

    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    incrementDate: (state, action) => {
      const days = action.payload;
      const date = new Date(state.currentDate)
      const newDate = new Date(date.getTime() + days * 86400000)
      const newDate2 = startOfWeek(newDate)
      state.currentDate = `${newDate2}`
    },
    setLessonsToDisplay: (state, action) => {
      if (action.payload.type === 'deleteDisplayedLesson') {
        state.lessonsToDisplay = state.lessonsToDisplay.filter(
          (lesson) => lesson._id !== action.payload.id
        );
      } else {
        state.lessonsToDisplay = action.payload;
      }
    },
    toggleSetPrivateModal(state, action) {
      state.isPrivateModalOpen = !state.isPrivateModalOpen;
      state.privateModalData = action.payload ? action.payload : '';
    },
    toggleSetGroupModal(state, action) {
      state.isGroupModalOpen = !state.isGroupModalOpen;
      state.groupModalData = action.payload ? action.payload : '';
    },
    toggleSetDeleteLessonModal(state, action) {
      state.isDeleteLessonModalOpen = !state.isDeleteLessonModalOpen;
      state.deleteLessonModalData = action.payload ? action.payload : '';
    },
    toggleSetDetailsLessonModal(state, action) {
      state.isDetailsLessonModalOpen = !state.isDetailsLessonModalOpen;
      state.detailsLessonModalData = action.payload ? action.payload : '';
    }
  },
});

export const { setView, incrementDate, setMonth, toggleSetPrivateModal, toggleSetGroupModal, toggleSetDeleteLessonModal, setLessonsToDisplay, toggleSetDetailsLessonModal, setTrainerPhone} = calendarSlice.actions;
export default calendarSlice.reducer;