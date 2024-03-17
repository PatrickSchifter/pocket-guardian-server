"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialAndFinalDayOfMonth = void 0;
function getInitialAndFinalDayOfMonth(month, year) {
    const initialDay = new Date(year, month - 1, 1);
    const finalDay = new Date(year, month, 0);
    return { initialDay, finalDay };
}
exports.getInitialAndFinalDayOfMonth = getInitialAndFinalDayOfMonth;
