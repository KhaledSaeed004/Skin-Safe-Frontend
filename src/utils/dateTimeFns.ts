export function generateSessionTimes(
  startTime: string,
  endTime: string,
  sessionDurationMinutes: number,
  day: Date,
): Date[] {
  const start = parseTimeToDate(startTime, day);
  const end = parseTimeToDate(endTime, day);

  if (end <= start) {
    // end time is next day, add 24 hours to it
    end.setDate(end.getDate() + 1);
  }

  const sessions: Date[] = [];
  let current = new Date(start);

  while (current < end) {
    sessions.push(new Date(current));
    current.setMinutes(current.getMinutes() + sessionDurationMinutes);
  }

  return sessions;
}

export function parseTimeToDate(time: string, baseDate: Date): Date {
  const [rawTime, modifier] = time.split(" ");
  let [hours, minutes] = rawTime.split(":").map(Number);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}
