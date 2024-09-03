export function formatDateInHebrew(displayedDate) {
    const parsedDate = new Date(displayedDate);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const hebrewDate = parsedDate.toLocaleDateString("he-IL", options);
    return hebrewDate;
  };