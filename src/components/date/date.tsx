import { FC } from "react";

const CurrentDate:FC = () => {
const date = new Date();
const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: 'numeric',
  month: 'short',
};

const formatter = new Intl.DateTimeFormat('ru-RU', options);
const formattedDate = formatter.format(date).replace(/[а-я]/, (u) => u.toUpperCase())

  return (
    <p>{formattedDate}</p>
  )
}

export default CurrentDate