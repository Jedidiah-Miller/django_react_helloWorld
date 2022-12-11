import React, { Fragment } from 'react';
import Form from './EventForm/Form';
import Events from './Feed/Events';

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Events />
    </Fragment>
  )
}