import { FC } from "react";
import styles from './partners.module.scss';
import Filter from "../filter/filter";

const Partners: FC = () => {
  return (
    <div className={styles.partners}>
      <Filter filterName="" clearFilter={false} setOptionColor='--color-text-light-gray' optionsTop="46px">
        <div data-value='null'>Все организации</div>
        <div data-value=''>ИП Сидорова Александра Михайловна</div>
        <div data-value=''>ИП Митрофанов М.М.</div>
        <div data-value=''>ИП Иванов М.М.</div>
      </Filter>
    </div>
  )
}

export default Partners