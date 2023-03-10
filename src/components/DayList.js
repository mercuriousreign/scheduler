import React from "react";
import DayListItem from "./DayListItem";

/**List of day rendering component */
export default function DayList(props) {
  const items = props.days.map((item) => {
    return (
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === props.day}
        setDay={props.setDay}
      />
    );
  });


  return (<ul>
    {items}
  </ul>)
}