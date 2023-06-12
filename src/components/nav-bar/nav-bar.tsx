import { FC } from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as LogoSVG } from '../../images/icons/main/logo.svg';
import { ReactComponent as ResultsSVG } from '../../images/icons/main/results.svg';
import { ReactComponent as OrdersSVG } from '../../images/icons/main/orders.svg';
import { ReactComponent as MessagesSVG } from '../../images/icons/main/messages.svg';
import { ReactComponent as CallsSVG } from '../../images/icons/main/calls.svg';
import { ReactComponent as CounterpartiesSVG } from '../../images/icons/main/counterparties.svg';
import { ReactComponent as DocsSVG } from '../../images/icons/main/docs.svg';
import { ReactComponent as PerformersSVG } from '../../images/icons/main/performers.svg';
import { ReactComponent as ReportsSVG } from '../../images/icons/main/reports.svg';
import { ReactComponent as BaseSVG } from '../../images/icons/main/base.svg';
import { ReactComponent as SettingsSVG } from '../../images/icons/main/settings.svg';
import { ReactComponent as NewOrderSVG } from '../../images/icons/main/newOrder.svg';
import { ReactComponent as PaymentSVG } from '../../images/icons/main/payment.svg';

import styles from './nav-bar.module.scss'

const NavBar: FC = () => {
  const activeClassName = `${styles.nav__item} ${styles.nav__item_active}`
  return (
    <aside className={styles.aside}>
      <Link to='/' className={styles.logo}><LogoSVG className={styles.icon} /></Link>
      <nav>
        <ul className={styles.nav}>
          <li>
            {/* can also be a separate componemt */}
            <NavLink to='results' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <ResultsSVG />
              <p>Итоги</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='orders' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <OrdersSVG />
              <p>Заказы</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='messages' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <MessagesSVG />
              <p>Сообщения</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='calls' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <CallsSVG />
              <p>Звонки</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='counterparties' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <CounterpartiesSVG />
              <p>Контрагенты</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='docs' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <DocsSVG />
              <p>Документы</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='performers' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <PerformersSVG />
              <p>Исполнители</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='reports' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <ReportsSVG />
              <p>Отчеты</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='base' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <BaseSVG />
              <p>База знаний</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='settings' className={({ isActive }) => (isActive ? `${activeClassName}` : `${styles.nav__item}`)}>
              <SettingsSVG />
              <p>Настройки</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.buttons}>
        <button className={styles.button}>
          <span>Добавить заказ</span>
          <NewOrderSVG />
        </button>
        <button className={`${styles.button} ${styles.button_payment}`}>
          <span>Оплата</span>
          <PaymentSVG />
        </button>
      </div>
    </aside>
  )
}

export default NavBar