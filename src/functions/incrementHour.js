export const incrementHour = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    let newHours = hours + 1;
  
    if (newHours < 10) {
      newHours = `0${newHours}`;
    } else if (newHours === 24) {
      newHours = '00';  // Reset to 00 if it exceeds 23
    }
  
    return `${newHours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };