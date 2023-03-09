import React from "react";
import Button from "components/Button";

/**Shows a confirmation dialouge to delete the appointment */
export default function Confirm(props) {
  const { id, onCancel, onConfirm } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={() => { onConfirm(id) }}>Confirm</Button>
      </section>
    </main>
  )
}