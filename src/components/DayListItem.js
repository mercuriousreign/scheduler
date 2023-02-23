import classNames from "classnames";
import React from "react";
import "styles/DayListItem.scss" 

export default function DayListItem(props) {
  const {name,spots,selected,setDay} = props;

  let dayClass = classNames('day-list__item',{'day-list__item--selected':selected,'day-list__item--full':spots === 0})

  // const settingDay = () => {setDay(name)};

  //()=>{setDay(name) 
  return (
    <li onClick={()=>setDay(name)} className={dayClass} selected={props.Selected}>
      <h2 className="text--regular">{name}</h2>
      {spots === 0 &&<h3 className="text--light">no spots remaining</h3>}
      {spots === 1 && <h3 className="text--light">{formatSpots(spots)} spot remaining</h3>}
      {spots >= 1 && <h3 className="text--light">{formatSpots(spots)} spots remaining</h3>}
      
    </li>
  )
}

function formatSpots(x){
  return parseFloat(x);
}