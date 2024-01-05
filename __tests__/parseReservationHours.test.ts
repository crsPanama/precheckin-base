import { describe, expect, test } from 'vitest';
import { parseReservationHours } from '../utils/parseReservationHours';
describe('Test - parseReservationHours util', () => {
  test('it should return an object of hours and minutes', () => {
    const hours = 16.15;
    const parsedHours = parseReservationHours(hours);

    expect(parsedHours).toMatchObject({
      hours: 16,
      minutes: 15,
    });
  });

  test('if hours only contains one digit after decimal point, it should return the minutes rounded to 10, (16.3 = 16:30)', () => {
    const hours = 16.3;
    const parsedHours = parseReservationHours(hours);

    expect(parsedHours).toMatchObject({
      hours: 16,
      minutes: 30,
    });
  });

  test('if hours are integer (not decimal point), it should return the hours equally and the minutes as 0', () => {
    const hours = 16;
    const parsedHours = parseReservationHours(hours);

    expect(parsedHours).toMatchObject({
      hours: 16,
      minutes: 0,
    });
  });
});
