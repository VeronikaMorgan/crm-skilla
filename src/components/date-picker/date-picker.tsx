import { FC, useEffect, useState } from "react";
import { ReactComponent as ArrowLeftSVG } from '../../images/icons/date-picker/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../images/icons/date-picker/arrow-right.svg';
import { ReactComponent as СalendarSVG } from '../../images/icons/date-picker/calendar.svg';
import { useAppDispatch } from "../../utils/types/app-hooks";
import { setFilter, deleteFilter } from "../../services/filters-slice";
import styles from './date-picker.module.scss';
import format from "date-fns/format";
import { SET_DATE, CHOSEN_PERIOD, SET_PERIOD } from "../../utils/constants";
import SingleCalendar from "../calendar/calendar";

const DatePicker: FC = () => {
  const [chosenPeriod, setChosenPeriod] = useState<string>('3 дня')
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const handleClick = (e: any) => {
    const fromDate = new Date()
    const item = e.target
    const value = item.dataset.value
    const option = item.dataset.option
    switch (option) {
      case 'day': {
        fromDate.setDate(fromDate.getDate() - value)
        dispatch(setFilter({
          'date': {
            type: CHOSEN_PERIOD,
            value: fromDate
          }
        }))
      }
        break;
      case 'month': {
        fromDate.setMonth(fromDate.getMonth() - value)
        dispatch(setFilter({
          'date': {
            type: CHOSEN_PERIOD,
            value: fromDate
          }
        }))
      }
        break;
      case 'year': {
        fromDate.setFullYear(fromDate.getFullYear() - value)
        dispatch(setFilter({
          'date': {
            type: CHOSEN_PERIOD,
            value: fromDate
          }
        }))
      }
        break;
      default: {
        console.log('invalid date-picker value')
        dispatch(deleteFilter('date'))
      }
    }
    setChosenPeriod(e.target.innerText)
  }

  const handleCalendarChange = (newData: any) => {
    const areEqual = format(newData.startDate, 'dd/MM/yy') === format(newData.endDate, 'dd/MM/yy')
    areEqual ?
      dispatch(setFilter({
        'date': {
          type: SET_DATE,
          value: newData.startDate
        }
      }))
      :
      dispatch(setFilter({
        'date': {
          type: SET_PERIOD,
          value: {
            from: newData.startDate,
            to: newData.endDate
          }
        }
      }))
  }

  const getCalendarFormatDate = (value: any) => {
    const areEqual = value.startDate === value.endDate
    const period = `${value.startDate} - ${value.endDate}`
    areEqual ? setChosenPeriod(value.startDate) : setChosenPeriod(period)
  }

  return (
    <div className={styles.picker}>
      <button><ArrowLeftSVG className="icon-default" /></button>
      <div className={styles.picker__value}>
        <СalendarSVG className="icon-default" />
        <span>{chosenPeriod}</span>
      </div>
      <div className={styles.picker__content}>
        <ul className={styles.picker__options} onClick={handleClick}>
          <li className={styles.picker__option} data-value={3} data-option='day'>3 дня</li>
          <li className={styles.picker__option} data-value={7} data-option='day'>Неделя</li>
          <li className={styles.picker__option} data-value={1} data-option='month'>Месяц</li>
          <li className={styles.picker__option} data-value={1} data-option='year'>Год</li>
        </ul>
        <div className={styles.picker__calendar}>
          <SingleCalendar onValueChange={handleCalendarChange} getFormatDate={getCalendarFormatDate} />
        </div>
      </div>
      <button><ArrowRightSVG className="icon-default" /></button>
    </div>
  )
}

export default DatePicker