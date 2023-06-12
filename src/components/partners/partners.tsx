import { FC } from "react";
import styles from './partners.module.scss';
import Filter from "../filter/filter";

const Partners: FC = () => {
  return (
    <div className={styles.partners}>
      <Filter filterName="" clearFilter={false} setOptionColor='--color-text-light-gray' optionsTop="46px" defaultContent='Все организации'>
        <div data-value='null' data-content='Все организации'>Все организации</div>
        <div data-value='' data-content='ИП Сидорова Александра Михайловна'>ИП Сидорова Александра Михайловна</div>
        <div data-value='' data-content='ИП Митрофанов М.М.'>ИП Митрофанов М.М.</div>
        <div data-value='' data-content='ИП Иванов М.М.'>ИП Иванов М.М.</div>
      </Filter>
    </div>
  )
}

export default Partners