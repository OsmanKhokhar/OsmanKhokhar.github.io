

/* DATE */

const date = new Date();

/*Check if date is weekend, if so set to next Monday*/
if (date.getDay() === 6) {
  date.setDate(date.getDate() + 2); 
} else if (date.getDay() === 0) {
  date.setDate(date.getDate() + 1); 
}

function getDayOfWeek(date) {
  const weekday = new Date(date).getDay();    
  return isNaN(weekday) ? null : 
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][weekday];
}

/* INITIALIZE DATE DISPLAY */

document.getElementById("tag").textContent = getDayOfWeek(date);
document.getElementById("datum").textContent = date.toLocaleDateString('en-GB');

/* Set initial active link styling */
document.querySelectorAll('.UntereNavigation a').forEach(dayLink => {
  if (dayLink.id === getDayOfWeek(date)) {
    dayLink.classList.add('Current');
  } else {
    dayLink.classList.remove('Current');
  }
});

/* WEEK FUNCTIONALITY */

function changeDayOfWeek(offset) {
  date.setDate(date.getDate() + offset);
  document.getElementById("tag").textContent = getDayOfWeek(date);
  document.getElementById("datum").textContent = date.toLocaleDateString('en-GB');
  
  /* Update active link styling */
  document.querySelectorAll('.UntereNavigation a').forEach(dayLink => {
    if (dayLink.id === getDayOfWeek(date)) {
      dayLink.classList.add('Current');
    } else {
      dayLink.classList.remove('Current');
    }
  });
}

document.querySelectorAll('.UntereNavigation a').forEach(dayLink => {
  dayLink.addEventListener('click', function() {
    const selectedDay = this.id;   
    const currentDay = getDayOfWeek(date);

    const dayOffsets = {
        'Montag': 1,
        'Dienstag': 2,
        'Mittwoch': 3,
        'Donnerstag': 4,
        'Freitag': 5
    };
    const offset = dayOffsets[selectedDay] - dayOffsets[currentDay];
    changeDayOfWeek(offset);
    });
});