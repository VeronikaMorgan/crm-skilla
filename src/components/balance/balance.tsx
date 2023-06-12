import { FC, useState } from "react";
import { ReactComponent as TopUpSVG } from '../../images/icons/main/top-up.svg';
import styles from './balance.module.scss';

const Balance: FC = () => {
  const [balance, setBalance] = useState<number>(272)
  return (
    <div className={styles.balance}>
      <span>Баланс: <span className={styles.balance__value}>{balance} &#8381;</span></span>
      <button><TopUpSVG className="icon-default"/></button>
    </div>
  )
}

export default Balance