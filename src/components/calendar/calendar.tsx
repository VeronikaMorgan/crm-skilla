import { format } from 'date-fns'
import { FC, useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range';
import { ReactComponent as СalendarSVG } from '../../images/icons/date-picker/calendar.svg';
import styles from './calendar.module.scss';
import { ru } from 'date-fns/esm/locale';

interface ICalendarProps {
  onValueChange: (data: any) => void
  getFormatDate:(data: any) => void
}
export const SingleCalendar :FC<ICalendarProps> = ({onValueChange, getFormatDate}) => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }])

  // handle date formatting
  const [formatDate, setFormatDate] = useState({
    startDate: format(new Date(), 'dd/MM/yy'),
    endDate: format(new Date(), 'dd/MM/yy'),
  })

  useEffect(() => {
    onValueChange(state[0])
    // @ts-ignore
    setFormatDate(prev => {
      return {
        ...prev,
        startDate: format(state[0].startDate, 'dd/MM/yy'),
        endDate: format(state[0].endDate, 'dd/MM/yy'),
      }
    })
  }, [state])

  useEffect(() => {
    getFormatDate(formatDate)
  }, [formatDate])

  // handle click outside
  const calendarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: any) => {
      if (!calendarRef.current) return
      if (!calendarRef?.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className={styles.calendar} ref={calendarRef}>
      <p className={styles.calendar__title}>Указать даты</p>
      <div className={styles.calendar__data}>
        <input
          type='text'
          className={styles.calendar__input}
          readOnly
          value={`${formatDate.startDate} - ${formatDate.endDate}`}
        />
        <СalendarSVG className='icon-default' onClick={() => {
          setOpen(!open)
        }} />
      </div>
      <div className={`${styles.calendar__dropdown} ${open ? `${styles.calendar__dropdown_active}` : `${styles.calendar__dropdown_inactive}`}`}>
        <DateRange
          className={styles.calendar__picker}
          // @ts-ignore
          onChange={(item) => setState([item.selection])}
          ranges={state}
          // showSelectionPreview={false}
          editableDateInputs={false}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          rangeColors={['#002CFB']}
          direction='horizontal'
          locale={ru}
          maxDate={new Date()}
        />
      </div>
    </div>
  )
}

export default SingleCalendar