import React from "react";

/**Shows an add button for user to book interview in the specific slot */
export default function Empty(props) {

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}