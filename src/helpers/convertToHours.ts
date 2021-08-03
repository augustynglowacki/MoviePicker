export const convertToHours = (time: number) => {
  const hour = Math.floor(time / 60);
  const minutes = time % 60;

  if (hour === 0) {
    return `${minutes} min`;
  }
  return `${hour}h ${minutes} min`;
};
