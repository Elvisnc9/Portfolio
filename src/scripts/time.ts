// Current time in Lagos (WAT), e.g. "13:08".
const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Africa/Lagos',
});

export const lagosTime = () => formatter.format(new Date());
