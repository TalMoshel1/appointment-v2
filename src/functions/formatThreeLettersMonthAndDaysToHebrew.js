export function formatThreeLettersMonthAndDaysToHebrew(type, threeLetters) {
    const monthsEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsHebrew = ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
    const daysEnglish = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']; 
    const daysHebrew = ["א'","ב'","ג'","ד'","ה'","ו'","ש'"]
    


    let result;
    if (type === 'month') {
        for (let i = 0; i < monthsEnglish.length; i++) {
            if (monthsEnglish[i] === threeLetters) {
                result = monthsHebrew[i];
                break;
            }
        }
    } else if (type === 'day') {
        for (let i = 0; i < daysEnglish.length; i++) {
            if (daysEnglish[i] === threeLetters) {
                result = daysHebrew[i];
                break;
            }
        }
    }

    return result;
}
