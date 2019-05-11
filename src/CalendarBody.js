import React, { Component, Fragment } from 'react';

class CalendarBody extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.state = {
      year: this.props.year,
      month: this.props.month,
      selectedDay: this.props.selectedDay
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  renderCalendar = (year, month) => {
    let nextMonth = new Date(year, month - 1);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    let prevMonth = new Date(year, month - 1);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return (
      <Fragment>
        <div className="calendar-header">
          {this.renderCalendarHeader(year, month, prevMonth, nextMonth)}
        </div>
        <div className="calendar-body">
          {this.renderCalendarMonth(year, month)}
        </div>
      </Fragment>
    );
  };

  renderCalendarHeader = (year, month, prevMonth, nextMonth) => {
    return (
      <div className="calendar-header-box">
        <div
          className="calendar-prev"
          onClick={() =>
            this.addCalendar(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
          }
        >
          <div className="left-triangle" />
          前月へ
        </div>
        <div className="calendar-header-title">
          {year + '年' + month + '月'}
        </div>
        <div
          className="calendar-next"
          onClick={() =>
            this.addCalendar(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
          }
        >
          翌月へ
          <div className="right-triangle" />
        </div>
      </div>
    );
  };

  // prevボタン、もしくはnextボタンを押したら呼び出される
  addCalendar = (year, month) => {
    this.setState({
      year: year,
      month: month
    });
    // 翌月の情報の取得
    let nextMonth = new Date(year, month - 1);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    // 前月の情報の取得
    let prevMonth = new Date(year, month - 1);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    // let calendar = document.getElementsByClassName("calendar");
    // カレンダーのHeader・Body共に一旦空にする
    // calendar.textContent = null;
    return (
      <Fragment>
        <div className="calendar-header">
          {this.renderCalendarHeader(year, month, prevMonth, nextMonth)}
        </div>
        <div className="calendar-body">
          {this.renderCalendarMonth(year, month)}
        </div>
      </Fragment>
    );
  };

  renderCalendarMonth = (year, month) => {
    let weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    let calendarData = this.getMonth(year, month); // カレンダー情報
    let startWeek = calendarData[0]['weekday']; // 月初めの曜日を取得
    // 初日よりも前に日にちと曜日を入れていく
    // calendarDateの先頭に入れていく
    while (startWeek > 0) {
      startWeek--;
      calendarData.unshift({
        day: '',
        weekday: startWeek
      });
    }
    // 末日の曜日を取得
    let endWeek = calendarData[calendarData.length - 1]['weekday'];
    // カレンダー上の末日より後を埋める
    // calendarDateの末尾に入れていく
    while (endWeek < 6) {
      endWeek++;
      calendarData.push({
        day: '',
        weekday: endWeek
      });
    }
    return (
      <Fragment>
        <div className="calendar-table">
          <div className="calendar-table-week">
            {/* 曜日の生成 */}
            {this.insertWeek(weekdayData)}
          </div>
          <div className="calendar-table-day">
            {/* 日付の生成 */}
            {this.insertDay(calendarData)}
          </div>
        </div>
      </Fragment>
    );
  };

  getMonth = (year, month) => {
    let firstDate = new Date(year, month - 1, 1); // 指定した年月の初日の情報
    let lastDay = new Date(year, firstDate.getMonth() + 1, 0).getDate(); // 指定した年月の末日
    let weekday = firstDate.getDay(); // 指定した年月の初日の曜日
    let calendarData = []; // カレンダーの情報を格納
    let weekdayCount = weekday; // 曜日のカウント
    for (let i = 0; i < lastDay; i++) {
      calendarData[i] = {
        day: i + 1, // 日にち
        weekday: weekdayCount, // 曜日
        date: new Date(year, month - 1, 1 + i) // 日ごとにDateをもたせたい
      };
      // 曜日が6(土曜日)まできたら0(日曜日)に戻す
      if (weekdayCount >= 6) {
        weekdayCount = 0;
      } else {
        weekdayCount++;
      }
    }
    return calendarData;
  };

  // オブジェクトの中に選択したdateを入れる
  onHolidayClick = data => {
    const updatedElementDate = this.state.selectedDay;
    // undefinedの場合 === 空の要素をクリックした場合
    if (data === undefined) {
      return null;
      // stateの中に存在する要素をもう一度クリックした場合
    } else if (updatedElementDate.indexOf(data.toString()) >= 0) {
      const deletedElement = updatedElementDate.indexOf(data);
      // 配列から取り除く
      updatedElementDate.splice(deletedElement, 1);
      document.getElementById(data).className = 'calendar-day';
      this.setState({ selectedDay: updatedElementDate });
      // 上記以外の場合、配列内に追加する
    } else {
      updatedElementDate.push(data);
      document.getElementById(data).className = 'calendar-day selected';
      this.setState({ selectedDay: updatedElementDate });
    }
  };

  insertWeek = weekdayData => {
    return weekdayData.map((week, index) => {
      return (
        <div
          key={index}
          className="calendar-week"
          style={{
            borderRight: index === 6 ? '1px solid #969494' : 'none',
            color: index === 0 || index === 6 ? '#ff5a5f' : null
          }}
        >
          {week}
        </div>
      );
    });
  };

  insertDay = calendarData => {
    return calendarData.map((data, index) => {
      console.log(data);
      // date変換用
      let d = '';
      // key専用
      let element = '';
      // 曜日が休みかの判定用
      let text = '';
      if (data.date !== undefined) {
        element = data.date;
        // chromeの場合 --- 英語
        if (data.date.toString().indexOf(' (Japan Standard Time)') >= 0) {
          d = data.date.toString().replace(' (Japan Standard Time)', '');
          // chromeの場合 --- 日本語
        } else if (data.date.toString().indexOf(' (日本標準時)') >= 0) {
          d = data.date.toString().replace(' (日本標準時)', '');
          // safariの場合
        } else if (data.date.toString().indexOf(' (JST)') >= 0) {
          d = data.date.toString().replace(' (JST)', '');
        } else {
          return null;
        }
        text = element.toString();
      } else {
        d = data.date;
        element = index;
        text = element.toString();
      }
      return (
        <div
          key={element}
          id={d}
          // 月の行き来をしてもState内に存在していれば、スタイルが反映されるようにする
          className={
            this.state.selectedDay.indexOf(d) >= 0
              ? 'calendar-day selected'
              : 'calendar-day'
          }
          style={{
            borderRight: data.weekday === 6 ? '1px solid #969494' : 'none'
          }}
          onClick={() => this.onHolidayClick(d)}
        >
          {data.day}
        </div>
      );
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderCalendar(this.state.year, this.state.month)}
      </div>
    );
  }
}

export default CalendarBody;
