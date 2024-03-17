export function getInitialAndFinalDayOfMonth(month: number, year: number) {
    const initialDay = new Date(year, month - 1, 1);
    const finalDay = new Date(year, month, 0);

    return { initialDay, finalDay };
}