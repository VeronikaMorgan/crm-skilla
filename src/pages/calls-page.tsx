import { FC, useEffect } from "react";
import Search from "../components/search/search";
import Balance from "../components/balance/balance";
import DatePicker from "../components/date-picker/date-picker";
import styles from './calls-page.module.scss';
import Filters from "../components/filters/filters";
import { getCalls } from "../services/calls-slice";
import { useAppDispatch } from "../utils/types/app-hooks";
import CallsTable from "../components/calls-table/calls-table";
import { Calendar } from "react-date-range";
import SingleCalendar from "../components/calendar/calendar";
const CallsPage: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCalls())
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.utils}>
        <Balance />
        <DatePicker />
      </div>
      <div className={styles.filters}>
        <Search />
        <Filters />
      </div>
      <CallsTable />
    </div>
  )
}

export default CallsPage

