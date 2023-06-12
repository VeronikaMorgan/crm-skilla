import { FC } from "react";
import { BAR_TYPE_PERCENTAGE, BAR_TYPE_QWTY } from "../../utils/constants";
import styles from './progress-bar.module.scss';

interface ProgressBarProps {
  type: typeof BAR_TYPE_QWTY | typeof BAR_TYPE_PERCENTAGE
  unit?: string
  value: number
  max?: number
  title: string
  barColor: string
  dataColor: string
}

const ProgressBar: FC<ProgressBarProps> = ({ value, title, barColor, dataColor, type, max = 1, unit = '' }) => {
  return (
    <div className={styles.progress}>
      <p className={styles.progress__title}>
        {title}
        <span style={{ color: `var(${dataColor})` }}> {type === BAR_TYPE_QWTY ? `${value} из ${max} ${unit}` : `${value}%`}</span>
      </p>
      <div className={styles.progress__bar}>
        <div className={styles.progress__bar_value} style={{ width: type === BAR_TYPE_QWTY ? `${(value / max) * 100}%`:`${value}%`, backgroundColor: `var(${barColor})` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar