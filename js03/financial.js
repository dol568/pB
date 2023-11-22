const financialData = require("./financial.json");

const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

function getFiancialObject() {
    const financialObject = {};
    financialObject["Money Spent In 2014"] = getMoneySpent(2014);
    financialObject["Spendings Per Transaction Type"] = getSpendingsPerTransactionType();
    financialObject["Earnings Per Company"] = getEarningsPerCompany();
    financialObject["Spendings By Month"] = getMoneySpentByMonth();
    financialObject["Spendings Per Day Of The Week"] = getMoneySpentByDayOfTheWeek();
    return financialObject;
}

console.log("Financial data:");
console.log(getFiancialObject());

function getMoneySpent(year) {
    return financialData.reduce((acc, data) => {
        const dateParts = data.detailsOfPayent.date.split("-");
        const unixDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        if (unixDate.getFullYear() === year) {
            return acc + parseFloat(data.cost);
        }
        return acc;
    }, 0).toFixed(2);
}

function getEarningsPerCompany() {
    return financialData.reduce((acc, data) => {
        const {cost, detailsOfPayent} = data;
        const company = detailsOfPayent.company;
        return {
            ...acc,
            [company]: acc[company]
                ? +(parseFloat(acc[company]) + parseFloat(cost)).toFixed(2)
                : +parseFloat(cost).toFixed(2)
        }
    }, {});
}

function getSpendingsPerTransactionType() {
    return financialData.reduce((acc, data) => {
        const {cost, detailsOfPayent} = data;
        const type = detailsOfPayent.Type;
        return {
            ...acc,
            [type]: acc[type]
                ? +(parseFloat(acc[type]) + parseFloat(cost)).toFixed(2)
                : +parseFloat(cost).toFixed(2)
        }
    }, {});
}

function getMoneySpentByMonth() {
    return financialData.reduce((acc, data) => {
        const {cost} = data;
        const dateParts = data.detailsOfPayent.date.split("-");
        const unixDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const montAndYear = months[unixDate.getMonth()].concat(" ").concat(unixDate.getFullYear());
        return {
            ...acc,
            [montAndYear]: acc[montAndYear]
                ? +(parseFloat(acc[montAndYear]) + parseFloat(cost)).toFixed(2)
                : +parseFloat(cost).toFixed(2)
        }
    }, {});
}

function getMoneySpentByDayOfTheWeek() {
    return financialData.reduce((acc, data) => {
        const {cost} = data;
        const dateParts = data.detailsOfPayent.date.split("-");
        const unixDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const dayOfTheWeek = days[unixDate.getDay()];
        return {
            ...acc,
            [dayOfTheWeek]: acc[dayOfTheWeek]
                ? +(parseFloat(acc[dayOfTheWeek]) + parseFloat(cost)).toFixed(2)
                : +parseFloat(cost).toFixed(2)
        }
    }, {});
}