import React, { Component, Fragment } from 'react';
// import component
import Button from './Button';
import CalendarBody from './CalendarBody';
// import style
import './calendar.scss';

const current = new Date();

class Calendar extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.regularHolidays = null;
    this.state = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      selectedDay: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this._isMounted) {
      // ここに処理を書いてね
      console.log(this.state.selectedDay);
    }
  };

  render() {
    return (
      <Fragment>
        <form className="calendar-form" onSubmit={this.handleSubmit}>
          <div className="calendar-box">
            <div className="calendar-flame">
              <div className="calendar-picker-box">
                <CalendarBody
                  year={this.state.year}
                  month={this.state.month}
                  selectedDay={this.state.selectedDay}
                />
                <input
                  type="textarea"
                  value={this.state.selectedDay}
                  name="holiday"
                  style={{ display: 'none' }}
                  readOnly
                />
              </div>
            </div>
          </div>
          <Button type="submit" name="保存する" />
        </form>
      </Fragment>
    );
  }
}

export default Calendar;
