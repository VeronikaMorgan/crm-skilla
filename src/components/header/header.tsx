import { FC } from "react";
import ProgressBar from "../progress-bar/progress-bar";
import styles from './header.module.scss'
import { BAR_TYPE_PERCENTAGE, BAR_TYPE_QWTY } from "../../utils/constants";
import CurrentDate from "../date/date";
import { ReactComponent as SearchSVG } from '../../images/icons/main/search.svg';
import Profile from "../profile/profile";
import Partners from "../partners/partners";
const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__left}>
          <CurrentDate />
          <div className={styles.progress}>
            <ProgressBar type={BAR_TYPE_QWTY} value={20} unit='шт' max={30} title='Новые звонки' barColor="--color-green" dataColor="--color-green" />
            <ProgressBar type={BAR_TYPE_PERCENTAGE} value={40} title='Качество разговоров' barColor="--color-yellow" dataColor="--color-yellow" />
            <ProgressBar type={BAR_TYPE_PERCENTAGE} value={67} title='Конверсия в заказ' barColor="--color-red" dataColor="--color-red" />
          </div>
        </div>
        <div className={styles.header__right}>
          <button className={styles.search}>
            <SearchSVG className="icon-default" />
          </button>
          <Partners />
          <Profile />
        </div>
      </div>
    </header>
  )
}

export default Header