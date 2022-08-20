import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents, deleteEvent } from '../../actions/events';


class Events extends Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
    getEvents: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    const { events } = this.props;
    return (
      <Fragment>
        <h2>events</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>message</th>
              <th>created at</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {events.map(event =>
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.email}</td>
                <td>{event.message}</td>
                <td>{event.createdAt}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={this.props.deleteEvent.bind(this, event.id)}
                  >
                    {" "}
                    delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events
});

export default connect(mapStateToProps, { getEvents, deleteEvent }) (Events);