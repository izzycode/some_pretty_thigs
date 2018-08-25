import dateFns from 'date-fns';

export const calendarBoundaries = date => {
  const monthStart  = dateFns.startOfMonth(date);
  const monthEnd    = dateFns.endOfMonth(monthStart);

  const calendarStart = dateFns.startOfWeek(monthStart);
  const calendarEnd   = dateFns.endOfWeek(monthEnd);

  const calendarStartYYYYMMDD = dateFns.format(calendarStart, "YYYY-MM-DD");
  const calendarEndYYYYMMDD   = dateFns.format(calendarEnd, "YYYY-MM-DD");

  return({
    monthStart,
    monthEnd,
    calendarStart,
    calendarEnd,
    calendarStartYYYYMMDD,
    calendarEndYYYYMMDD
  });
}
