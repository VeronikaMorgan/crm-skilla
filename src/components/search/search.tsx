import React, { FC, useState, useEffect } from "react";
import { ReactComponent as SearchSVG } from '../../images/icons/main/search.svg';
import { ReactComponent as CloseSVG } from '../../images/icons/main/close.svg';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useAppDispatch } from "../../utils/types/app-hooks";
import { setFilter, deleteFilter } from "../../services/filters-slice";
import styles from './search.module.scss';

const Search: FC<any> = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const searchValue = value.replace(/[\D]+/g, '')
    !!searchValue && dispatch(setFilter({ 'from_number': searchValue }))

    const phoneNum = parsePhoneNumberFromString(value)
    if (!phoneNum) {
      return value.replace(/[^+\d]/g, '')
    }
    const formatted = phoneNum.formatInternational()
    return formatted
  }

  const handleClear = (e: React.MouseEvent) => {
    dispatch(deleteFilter('from_number'))
    setShowForm(false)
  }
  return (
    <div className={styles.search}>
      {showForm ?
        <form className={styles.search__form}>
          <input
            className={styles.search__input}
            type='tel' autoComplete="off"
            placeholder="+7 ___ ___-__-__"
            pattern='/\d/'
            onChange={(e) => { e.target.value = handleInputChange(e) }}
          />
          <button className={styles.search__btn_search}><SearchSVG /></button>
          <button className={styles.search__btn_close} type="reset" onClick={handleClear}><CloseSVG className="icon-default" /></button>
        </form>
        :
        <button className={`${styles.search__btn_open} icon-default`} onClick={(e) => setShowForm(true)}>
          <SearchSVG />
          <span>Поиск по звонкам</span>
        </button>
      }
    </div>
  )
}

export default Search