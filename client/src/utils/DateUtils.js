import range from "./Range";

export const date = new Date();

export const years = range(date.getFullYear(), 1980);

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getMonthLength(m, y) {
    let monthLength = 31;
    let monthIndex = months.indexOf(m);

    switch (monthIndex) {
        case 1:
            monthLength = isLeapYear(y) ? 29 : 28;
            break;
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            monthLength = 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
        default:
            monthLength = 30;
            break;
    }
    return monthLength
}

export function isLeapYear(y) {
    return (y % 4 == 0) && !(y % 100 == 0 && y % 400 != 0);
}