export const rebuildReservationDate = (date: Date, reservationTime: number) => {
  const parsedTime = parseReservationHours(reservationTime);
  const rebuildedDate = new Date(date);
  rebuildedDate.setHours(<number>parsedTime.hours, <number>parsedTime.minutes);

  return rebuildedDate;
};
