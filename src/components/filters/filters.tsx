import React, { FC, useEffect, useState } from "react";
import Filter from "../filter/filter";
import { ReactComponent as ExellentSVG } from '../../images/icons/marks/exellent.svg';
import { ReactComponent as GoodSVG } from '../../images/icons/marks/good.svg';
import { ReactComponent as BadSVG } from '../../images/icons/marks/bad.svg';
import { ReactComponent as CloseSVG } from '../../images/icons/main/close.svg';
import { useAppDispatch, useAppSelector } from "../../utils/types/app-hooks";
import { clearFilters } from "../../services/filters-slice";
import { mockEmployees } from "../../utils/moks";
import styles from './filters.module.scss';


const Filters: FC = () => {
  const areFiltersSet = useAppSelector(store => store.filters.areMainFiltersSet)
  const [clear, setClear] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(clearFilters())
    setClear(true)
  }
  useEffect(() => {
    if (!areFiltersSet) return
    setClear(false)
  }, [areFiltersSet])

  return (
    <ul className={styles.filters}>
      <li>
        {areFiltersSet &&
        <button onClick={handleClear} className={styles.filters__btn}>
          <span>Сбросить фильтры</span>
          <CloseSVG/>
        </button>}
      </li>
      <li>
        <Filter filterName="in_out" clearFilter={clear} setOptionColor='--color-blue'>
          <div data-value='null'>Все типы</div>
          <div data-value='0'>Входящие</div>
          <div data-value='1'>Исходящие</div>
        </Filter>
      </li>
      <li> 
        <Filter filterName="person_id" clearFilter={clear} setOptionColor='--color-blue'>
        <div data-value='null'>Все сотрудники</div>
        {mockEmployees.map((employee, i) => (
          <div data-value={employee.person_id} key={i} className={styles.filters__employee}>
            <img src={employee.person_avatar} alt="avatar" />
            <p>{`${employee.person_name} ${employee.person_surname[0]}.`}</p>
          </div>
        )
        )}
      </Filter>
      </li>
      <li>
        <Filter filterName="from_type" clearFilter={clear} setOptionColor='--color-blue'>
          <div data-value='null'>Все звонки</div>
          <div data-value=''>Все клиенты</div>
          <div data-value=''>Новые клиенты</div>
          <div data-value=''>все исполнители</div>
          <div data-value=''>через приложение</div>
          <div data-value=''>прочие звонки</div>
        </Filter>
      </li>
      <li>
        <Filter filterName="source" clearFilter={clear} setOptionColor='--color-blue'>
          <div data-value='null'>Все источники</div>
          <div data-value='from_site'>с сайта</div>
          <div data-value='Yandex'>yandex номер</div>
          <div data-value='google'>google номер</div>
          <div data-value='empty'>без источника</div>
        </Filter>
      </li>
      <li>
        <Filter filterName="errors" clearFilter={clear} setOptionColor='--color-blue'>
          <div data-value=''>Все ошибки</div>
          <div data-value=''>Приветствие</div>
          <div data-value=''>Имя</div>
          <div data-value=''>Цена</div>
          <div data-value=''>Скидка</div>
          <div data-value=''>Предзаказ</div>
          <div data-value=''>Благодарность</div>
          <div data-value=''>Стоп слова</div>
        </Filter>
      </li>
      <li>
        <Filter filterName="errors" clearFilter={clear} setOptionColor='--color-blue'>
          <div data-value='null'>Все оценки</div>
          <div data-value=''>Распознать</div>
          <div data-value=''>Скрипт не использован</div>
          <BadSVG data-value='' />
          <GoodSVG data-value='' />
          <ExellentSVG data-value='' />
        </Filter>
      </li>
    </ul>
  )
}
export default Filters