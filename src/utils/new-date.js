export default function newFormattedDate(date) {
  const newDate = !date ? new Date() : new Date(date);

  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const day = newDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
