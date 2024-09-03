export function renderDays(currentDate, view) {

    const startOfWeek = (date) => {
      const day = date.getDay();
      const diff = date.getDate() - day;
      return new Date(date.setDate(diff));
    };
  
    const addDays = (date, days) => {
      return new Date(date.getTime() + days * 86400000);
    };
  
    const formatDate = (date) => {
      return {
        displayedDate: date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        date: date,
      };
    };


    let days = [];
    let startDate;
    if (view === "week") {
      startDate = startOfWeek(currentDate);
      for (let i = 0; i < 7; i++) {
        days.push(formatDate(addDays(startDate, i)));
      }
    } if (view === 'month') {
      for (let i = 0; i < 30; i++) {
        days.push(formatDate(addDays(currentDate, i)));
      }
     }
      
      else if (view === "day") {
      days.push(formatDate(currentDate));
    }
    return days;
  };