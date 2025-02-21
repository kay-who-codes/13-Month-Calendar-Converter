
function getThirteenMonthDate(date) {
    // Check if the date is December 31
    if (date.getMonth() === 11 && date.getDate() === 31) {
        return "Leap Day";
    }

    // Calculate the day of the year (1–365 or 1–366 for leap years)
    const startOfYear = new Date(date.getFullYear(), 0, 1); // Start of Gregorian year
    const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

    // 13-month calendar logic: days in the year are divided into 13 months, each 28 days
    const thirteenMonth = Math.floor((dayOfYear - 1) / 28) + 1; // Determine 13-month calendar month (1–13)
    const dayInMonth = ((dayOfYear - 1) % 28) + 1; // Determine day within the 13-month calendar month

    // Correct weekday calculation: 13-month calendar always starts on a Monday
    const daysSinceStart = (dayOfYear - 1) % 7; // Days since the start of the year in 13-month calendar
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDay = weekdayNames[daysSinceStart];

    // Map 13-month month numbers to names
    const thirteenMonthNames = [
        "January", "February", "March", "Νεοτέλεια", "April", "May", 
        "June", "July", "August", "September", "October", "November", "December"
    ];
    const monthName = thirteenMonthNames[thirteenMonth - 1];

    return `${weekDay} ${dayInMonth} ${monthName}`;
}

function getGregorianDate(date) {
    const weekDay = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'long' }); // Full month name
    const year = date.getFullYear();
    return `${weekDay} ${day} ${month}`;
}

function updateDates(selectedDate) {
    const today = selectedDate || new Date(); // Use selected date, if available
    const gregorianDate = getGregorianDate(today);
    const thirteenMonthDate = getThirteenMonthDate(today);

    document.getElementById('gregorian-date').innerText = `Today's Date: ${gregorianDate}`;
    document.getElementById('thirteen-month-date').innerText = `13 Month Date: ${thirteenMonthDate}`;
}

// Event listener for the date picker
document.getElementById('date-picker').addEventListener('input', function() {
    const selectedDate = new Date(this.value); // Get the selected date
    document.getElementById('gregorian-date').innerText = `Selected Date: ${getGregorianDate(selectedDate)}`; // Update the label
    document.getElementById('thirteen-month-date').innerText = `13 Month Date: ${getThirteenMonthDate(selectedDate)}`; // Update 13-month date
});

// Run the update on load with today's date
updateDates();