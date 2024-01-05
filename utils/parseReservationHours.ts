/**
 * Reservation hours comes on decimal format (16:30 = 16.3).
 * This function splits the hours by the decimal point and store the hours and minutes separated.
 *
 * @param time : Hours
 * @returns : Object with hours and minute
 *
 */

export const parseReservationHours = (
  time: string | number
): { hours: string | number; minutes: string | number } => {
  //Split time (16.3 for example) into an array of hours and minutes ([16, 3]), if time length is 1 multiply by 10 to get the 0  (3 = 3* 10 = 30)
  if (time.toString().includes('.')) {
    const timeSplited = time.toString().split('.');
    return {
      hours: Number(timeSplited[0]),
      minutes:
        timeSplited[1].length === 1
          ? Number(timeSplited[1]) * 10
          : Number(timeSplited[1]),
    };
  }
  return {
    hours: time,
    minutes: 0,
  };
};
