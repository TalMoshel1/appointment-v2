export function selectHourGetHours() {
    const hoursArray = [];
    for (let hour = 8; hour <= 21; hour++) {
      const formattedHour = `${hour < 10 ? '0' : ''}${hour}:00`;
      hoursArray.push(formattedHour);
    }

    return hoursArray
}

