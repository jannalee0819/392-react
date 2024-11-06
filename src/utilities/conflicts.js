export const checkOverlap = (course1, course2) => {
    if (course1.term !== course2.term) return false;
  
    // Parse meeting times
    const meeting1 = parseMeets(course1.meets);
    const meeting2 = parseMeets(course2.meets);
    
    // If either course has invalid/empty meeting time, no conflict
    if (!meeting1 || !meeting2) return false;
    
    // Check both day and time overlap
    return dayOverlap(meeting1[0], meeting2[0]) &&
            timeOverlap(meeting1[1], meeting1[2], meeting2[1], meeting2[2]);
};


// check if meeting times overlap
const timeOverlap = (start1, end1, start2, end2, ) => {
    return start1 < end2 && start2 < end1;
}
// check if meeting days overlap
const dayOverlap = (days1, days2) => {
    return days1.some(day => days2.includes(day));
}

// parses meets string
const parseMeets = (meetsStr) => {
    const [daysStr, timeStr] = meetsStr.split(' ');
    const [startStr, endStr] = timeStr.split('-')
    const days = parseDay(daysStr);
    const timeStart = parseTime(startStr);
    const timeEnd = parseTime(endStr);
    return([days, timeStart, timeEnd])

};

const parseDay = (dayStr) => dayStr.split(/(?=[A-Z])/);
const parseTime = (timeStr) => {
    const [hours, mins] = timeStr.split(':').map(Number);
    return new Date(0, 0, 0, hours, mins); 
}
   
export const checkForConflicts = (course, selectedCourses) => {
    return selectedCourses.some(selectedCourse => checkOverlap(course, selectedCourse));
};

