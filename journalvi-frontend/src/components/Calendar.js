import React from "react";
import {format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parse} from "date-fns";
// import startOfWeek from 'date-fns/start_of_week'
// import addDays from 'date-fns/addDays'
import {Link} from 'react-router-dom'

// const color = 'rgba(40,167,69)' 

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "EEEE";
    const days = [];
    // debugger
    let startDate = startOfWeek(this.state.currentMonth);
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        
        
        </div>
      );
    }
    // debugger
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

     

    const dateFormat = "d";
    const rows = [];
    
    let days = [];
    let day = startDate;
    let formattedDate = "";

    
    while (day <= endDate) {
        
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        // console.log(isSameMonth(day, this.state.currentMonth))
        // this.compareDates(day)
        // if (this.matchDatesForClick(day)) 
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.handleDateClick(cloneDay)}
            // onClick={() => this.onDateClick(parse(cloneDay))}
            style={{background: this.matchColor(day)}}
            >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  }


  handleDateClick = day => {
    console.log(this.matchDatesForClick(day))
    if (this.matchDatesForClick(day)) {
        window.location.href = `http://localhost:3001/entries/${this.matchDatesForClick(day)}`
    }
    
    //right now returning id of correct entry
    // window.location.href="http://url.com";
  }


  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };


  compareDates = (day) => {
    // let parsedDayDate = this.parseCalDate(day)
    let entryObj = {}
    let entries = this.props.entries
    
    entries.forEach(entry => {
        let formattedEntryDate = this.parseEntryDate(entry.date)
        return entryObj[formattedEntryDate] = entry
    }) 

    return entryObj
  }

  matchDatesForClick = (day) => {
    let parsedDayDate = this.parseCalDate(day)

    let entryObj = this.compareDates(day)

    if (Object.keys(entryObj).includes(parsedDayDate)){
        return entryObj[parsedDayDate].id    
    } else {
        return false
    }
  }

  matchColor = (day) => {
    if (!isSameMonth(day, this.state.currentMonth)) {
        return '#fff'
    } else {
    
    let parsedDayDate = this.parseCalDate(day)
    // let entryObj = {}
    // let entries = this.props.entries
    
    // entries.forEach(entry => {
    //     let formattedEntryDate = this.parseEntryDate(entry.date)
    //     return entryObj[formattedEntryDate] = entry
    // }) 

    let entryObj = this.compareDates(day)

    if (Object.keys(entryObj).includes(parsedDayDate)){
        return this.dayColor(entryObj[parsedDayDate])
    } else {
        return '#fff'
    }

  }
}

  parseEntryDate = (date) => {
    let d = new Date(date)
    let dPlusOne = new Date(d.setDate(d.getDate() + 1))
    let dArr = String(dPlusOne).split(" ")
    return dArr.slice(0,4).join(" ")

  }

  parseCalDate = (day) => {
    let dayArr = String(day).split(" ")
    return dayArr.slice(0,4).join(" ")
  }

  dayColor = (entry) => {
    // console.log(this.state.entry.prompts[0].prompt)
    let entryScore = entry.agg_score_key
    let scoreVal = entry.agg_score - 0.1
   
    switch(entryScore) {
        case 'POSITIVE':
            return `rgba(40,167,69, ${scoreVal})` 
        case 'NEGATIVE':
            return `rgba(220,53,69, ${scoreVal})`
        case 'NEUTRAL':
            return `rgba(255,193,7, ${scoreVal})`
        case 'MIXED':
            return `rgba(0,123,255, ${scoreVal})`
        default: 
            return '#fff' 
    }
}

  render() {
    // console.log(this.props.entries)
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;


// code to compare entry dates with day as it appears in calendar
// let d = new Date(date)
// let dPlusOne = new Date(d.setDate(d.getDate() + 1))
// let dArr = String(dPlusOne).split(" ")

// dayArr = String(day).split(" ")
// var dStart = dArr.slice(0,4).join(" ")
// var dayStart = dayArr.slice(0,4).join(" ")
// dStart == dayStart
// #=> true

// now need also to have color parsing function here

//start with redux state entries to dashboard and pass down as prop to calendar