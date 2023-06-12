import React, { FC, useState } from "react";
import { useAppDispatch } from "../../utils/types/app-hooks";
import { setFilter, deleteFilter } from "../../services/filters-slice";
import styles from './filter.module.scss';
import { ReactComponent as WrapSVG } from '../../images/icons/main/wrap.svg';
import { ReactComponent as UnwrapSVG } from '../../images/icons/main/unwrap.svg';
import { useEffect } from "react";

interface FilterProps {
  filterName: string
  children: React.ReactNode
  clearFilter: boolean
  setOptionColor: string
  optionsTop?: string
}

const Filter: FC<FilterProps> = ({ filterName, children, clearFilter, setOptionColor, optionsTop}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [chosenOptionIndex, setChosenOptionIndex] = useState<number>(0)
  const dispatch = useAppDispatch()

  const handleClick = (e: any, i: any) => {
    e.preventDefault()
    const value = e.currentTarget.children[0].dataset.value
    value === 'null' ?
      dispatch(deleteFilter([filterName]))
      :
      dispatch(setFilter({ [filterName]: value }))
    setChosenOptionIndex(i)
    console.log(React.Children.toArray(children)[chosenOptionIndex])
  }

  useEffect(() => {
    if(!clearFilter) return
    setChosenOptionIndex(0)
  }, [clearFilter])

  return (
    <div className={styles.filter} onMouseEnter={(e) => setShowOptions(true)} onMouseLeave={(e) => setShowOptions(false)}>
      <div className={styles.filter__value}>
        <div style={{ color: !!chosenOptionIndex ? `var(${setOptionColor})` : 'inherit' }}>{React.Children.toArray(children)[chosenOptionIndex]}</div>
        {showOptions ?
          <WrapSVG className="icon-default" />
          :
          <UnwrapSVG className="icon-default" />
        }
      </div>
      <ul className={styles.filter__options} style={{top: optionsTop ? optionsTop : 'default'}}>
        {children && React.Children.map(children, (child, i) => (
          <li key={i} style={{color: chosenOptionIndex === i ? `var(${setOptionColor})` : ''}} className={styles.filter__option} onClick={(e) => handleClick(e, i)}>
            {child}
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default Filter