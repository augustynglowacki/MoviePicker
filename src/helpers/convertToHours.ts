export const convertToHours = (time: number) => {
  const hour = Math.round(time / 60);
  const minutes = time % 60;

  return `${hour}h ${minutes}min`;
};
