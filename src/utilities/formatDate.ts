export const formatDate = (originalDate: string) => {
  const dateObject = new Date(originalDate);

  const month = dateObject.toLocaleString('en-US', {month: 'short'});
  const day = dateObject.toLocaleString('en-US', {day: '2-digit'});

  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  return `${month} ${day} - ${hours}:${minutes}`;
};
