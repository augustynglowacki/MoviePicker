export const convertToHours = (time: number) => {
  const hour = Math.floor(time / 60);
  const minutes = time % 60;

  if (!hour) {
    return `${minutes} min`;
  }
  if (hour > 0 && !minutes) {
    return `${hour}h`;
  }
  return `${hour}h ${minutes} min`;
};
