import classNames from "classnames";
import React from "react";
import "styles/DayListItem.scss"

/**Rendering of individual day component on the side that allows user to click to see appointment on a individual day alongside how many spots remaining */
export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  let dayClass = classNames('day-list__item', { 'day-list__item--selected': selected, 'day-list__item--full': spots === 0 })


  function formatSpots(spots) {
    if (spots === 1)
      return '1 spot remaining';
    else if (spots === 0)
      return 'no spots remaining';
    else return `${spots} spots remaining`;
  }

  return (
    <li onClick={() => setDay(name)} className={dayClass} selected={selected} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  )
}
