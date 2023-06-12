import { FC, useEffect, useState } from "react";
import styles from './calls-table.module.scss';
import { useAppSelector } from "../../utils/types/app-hooks";
import { ReactComponent as ExellentSVG } from '../../images/icons/marks/exellent.svg';
import { ReactComponent as GoodSVG } from '../../images/icons/marks/good.svg';
import { ReactComponent as BadSVG } from '../../images/icons/marks/bad.svg';
import { ReactComponent as IncomingSVG } from '../../images/icons/call-types/incoming.svg';
import { ReactComponent as IncomingFailedSVG } from '../../images/icons/call-types/incoming-failed.svg';
import { ReactComponent as OutGoingSVG } from '../../images/icons/call-types/outgoing.svg';
import { ReactComponent as OutGoingFailedSVG } from '../../images/icons/call-types/outgoing-failed.svg';
import { CALL_TYPE_FAILED } from "../../utils/constants";
import { CHOSEN_PERIOD, SET_PERIOD, SET_DATE } from "../../utils/constants";
import { format } from 'date-fns';
import { TDateFilter, TDateSetPeriodValue } from "../../services/filters-slice";
import Player from "../player/player";


const CallsTable: FC = () => {
  const calls = useAppSelector(store => store.calls.calls)
  const { areFiltersSet, filters } = useAppSelector(store => store.filters)
  const [filteredCalls, setFilteredCalls] = useState<any>()

  const filterDate = (callDate: Date): boolean => {
    const { type, value } = filters.date as TDateFilter
    const formattedCallDate = format(callDate, 'dd/MM/yy')
    switch (type) {
      case CHOSEN_PERIOD: {
        return callDate > value
      }
      case SET_DATE: {
        const formattedFilterDate = format(value as Date, 'dd/MM/yy')
        return formattedCallDate === formattedFilterDate
      }
      case SET_PERIOD: {
        const { from, to } = value as TDateSetPeriodValue
        const formattedEndDate = new Date(to)
        formattedEndDate.setDate(formattedEndDate.getDate() + 1)
        return callDate >= from && callDate < formattedEndDate
      }
      default: {
        return false
      }
    }
  }

  useEffect(() => {
    if (!areFiltersSet) return
    if (!calls) return
    const objFilters = Object.entries(filters)
    let filteredCalls = calls
    objFilters.forEach(filter => {
      filteredCalls = filteredCalls.filter(call => {
        if (filter[0] === 'from_number') {
          return call[filter[0]].includes(filter[1])
        }
        else if (filter[0] === 'date') {
          const callDate = new Date(call['date'])
          return filterDate(callDate)
        }
        else {
          return call[filter[0]] == filter[1]
        }

      })
    })
    if (!filteredCalls) return
    setFilteredCalls(filteredCalls)
  }, [filters, areFiltersSet, calls])

  return (
    <table className={styles.table}>
      <thead className={styles.table__head}>
        <tr className={styles.table__row}>
          <td>Тип</td>
          <td>Время</td>
          <td>Сотрудник</td>
          <td>Звонок</td>
          <td>Источник</td>
          <td>Оценка</td>
          <td>Длительность</td>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {calls &&
          (
            areFiltersSet ? (
              filteredCalls && filteredCalls.map((call: any) => (
                <tr className={`${styles.table__row} ${styles.call}`} key={call.id}>
                  <td className="type">
                    {!!call.in_out ?
                      (call.status === CALL_TYPE_FAILED ? <OutGoingFailedSVG /> : <OutGoingSVG />)
                      :
                      (call.status === CALL_TYPE_FAILED ? <IncomingFailedSVG /> : <IncomingSVG />)}
                  </td>
                  <td className="time">{call.date.substring(11, 16)}</td>
                  <td>
                    <img className={styles.call__employee} src={call.person_avatar} />
                  </td>
                  <td>{!!call.in_out ? call.from_number : call.to_number}</td>
                  <td className={styles.call__source}>{call.source}</td>
                  <td>{call.errors.length === 0 ? <ExellentSVG /> : call.errors.length < 2 ? <GoodSVG /> : <BadSVG />}</td>
                  {call.record &&
                    <td className={styles.call__player}>
                      <Player recordId={call.record} partnershipId={call.partnership_id} />
                    </td>}
                  <td className={styles.call__duration}>{'1:22'}</td>
                </tr>
              ))
            )
              : (
                calls && calls.map(call => (
                  <tr className={`${styles.table__row} ${styles.call}`} key={call.id}>
                    <td className="type">
                      {!!call.in_out ?
                        (call.status === CALL_TYPE_FAILED ? <OutGoingFailedSVG /> : <OutGoingSVG />)
                        :
                        (call.status === CALL_TYPE_FAILED ? <IncomingFailedSVG /> : <IncomingSVG />)}
                    </td>
                    <td className="time">{call.date.substring(11, 16)}</td>
                    <td>
                      <img className={styles.call__employee} src={call.person_avatar} />
                    </td>
                    <td>{!!call.in_out ? call.from_number : call.to_number}</td>
                    <td className={styles.call__source}>{call.source}</td>
                    <td>{call.errors.length === 0 ? <ExellentSVG /> : call.errors.length < 2 ? <GoodSVG /> : <BadSVG />}</td>
                    {call.record &&
                      <td className={styles.call__player}>
                        <Player recordId={call.record} partnershipId={call.partnership_id} />
                      </td>}
                    <td className={styles.call__duration}>{'1:22'}</td>
                  </tr>
                ))
              )
          )
        }
      </tbody>
    </table>
  )
}

export default CallsTable