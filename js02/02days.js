module.exports = function numberOfDaysTillFriday() {
    const today = new Date();
    let daysTillFriday = 5 - today.getDay();
    if (daysTillFriday <= 0)  daysTillFriday += 7;
    return daysTillFriday;
}