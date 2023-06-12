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
        <Filter filterName="in_out" clearFilter={clear} setOptionColor='--color-blue' defaultContent='Все типы'>
          <div data-value='null' data-content='Все типы'>Все типы</div>
          <div data-value='0' data-content='Входящие'>Входящие</div>
          <div data-value='1'data-content='Исходящие'>Исходящие</div>
        </Filter>
      </li>
      <li> 
        <Filter filterName="person_id" clearFilter={clear} setOptionColor='--color-blue' defaultContent='Все сотрудники'>
        <div data-value='null' data-content='Все сотрудники'>Все сотрудники</div>
        {mockEmployees.map((employee, i) => (
          <div data-value={employee.person_id} key={i} className={styles.filters__employee} data-content={`${employee.person_name} ${employee.person_surname[0]}.`}>
            <img src={employee.person_avatar} alt="avatar" />
            <p>{`${employee.person_name} ${employee.person_surname[0]}.`}</p>
          </div>
        )
        )}
      </Filter>
      </li>
      <li>
        <Filter filterName="from_type" clearFilter={clear} setOptionColor='--color-blue' defaultContent='Все звонки'>
          <div data-value='null' data-content='Все звонки'>Все звонки</div>
          <div data-value='' data-content='Все клиенты'>Все клиенты</div>
          <div data-value='' data-content='Новые клиенты'>Новые клиенты</div>
          <div data-value='' data-content='все исполнители'>все исполнители</div>
          <div data-value='' data-content='через приложение'>через приложение</div>
          <div data-value='' data-content='прочие звонки'>прочие звонки</div>
        </Filter>
      </li>
      <li>
        <Filter filterName="source" clearFilter={clear} setOptionColor='--color-blue' defaultContent='Все источники'>
          <div data-value='null' data-content='Все источники'>Все источники</div>
          <div data-value='from_site' data-content='с сайта'>с сайта</div>
          <div data-value='Yandex' data-content='yandex номер'>yandex номер</div>
          <div data-value='google' data-content='google номер'>google номер</div>
          <div data-value='empty' data-content='без источника'>без источника</div>
        </Filter>
      </li>
      <li>
        <Filter filterName="errors" clearFilter={clear} setOptionColor='--color-blue' defaultContent='Все ошибки'>
          <div data-value='' data-content='Все ошибки'>Все ошибки</div>
          <div data-value='' data-content='Приветствие'>Приветствие</div>
          <div data-value='' data-content='Имя'>Имя</div>
          <div data-value='' data-content='Цена'>Цена</div>
          <div data-value='' data-content='Скидка'>Скидка</div>
          <div data-value='' data-content='Предзаказ'>Предзаказ</div>
          <div data-value='' data-content='Благодарность'>Благодарность</div>
          <div data-value='' data-content='Стоп слова'>Стоп слова</div>
        </Filter>
      </li>
      <li>
        <Filter filterName="errors" clearFilter={clear} setOptionColor='--color-blue' defaultContent='Все оценки'>
          <div data-value='null' data-content='Все оценки'>Все оценки</div>
          <div data-value='' data-content='Распознать'>Распознать</div>
          <div data-value='' data-content='Скрипт не использован'>Скрипт не использован</div>
          <BadSVG data-value=''/>
          <GoodSVG data-value='' />
          <ExellentSVG data-value=''/>
        </Filter>
      </li>
    </ul>
  )
}
export default Filters