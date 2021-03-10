import React from "react";
import {format, startOfWeek, endOfWeek, addDays, addWeeks, subWeeks} from "date-fns";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row'

let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'

class WeekCal extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    currentWeek: new Date()
  };

  renderHeader() {
    const dateFormat = "MMM d yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>Week Starting: {`${format(startOfWeek(this.state.currentWeek), dateFormat)}`}</span>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "EEEE";
    const days = [];
  
    let startDate = startOfWeek(this.state.currentWeek);
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-left" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
   
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentWeek} = this.state;
    const weekStart = startOfWeek(currentWeek);
    const weekEnd = endOfWeek(weekStart);
    const startDate = startOfWeek(weekStart);
    const endDate = endOfWeek(weekEnd);

    const dateFormat = "d";
    
    let days = [];
    let day = startDate;
    let formattedDate = "";

    
    while (day <= endDate) {
        
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day; 
        days.push(
        
          <div className={`col cell`}>
          <OverlayTrigger  placement="bottom" overlay={
                <Popover>
                    <Popover.Content>
                    {this.renderWeekDayPopover(day, 'date')} 
                    </Popover.Content> 
            </Popover>}> 
          <Row className={`date-num-row`}>
          <div
            className={`col cell`}
            key={day}
            onClick={() => this.handleDateClick(cloneDay)}
            style={{background: this.matchColor(day)}}
            >
            <span className="number">{formattedDate}</span>
            </div>
            </Row>
            </OverlayTrigger>
            <OverlayTrigger  placement="bottom" overlay={
                <Popover>
                    <Popover.Content>
                    {this.renderWeekDayPopover(day, 'morning')} 
                    </Popover.Content> 
            </Popover>}> 
            <Row className='week-color-row' style={{background: this.matchPromptColor(day, 'morning')}}>
                <div></div>
                <br></br>
                <br></br>
            </Row>
            </OverlayTrigger>
            <OverlayTrigger  placement="bottom" overlay={
                <Popover>
                    <Popover.Content>
                    {this.renderWeekDayPopover(day, 'afternoon')} 
                    </Popover.Content> 
            </Popover>}> 
            <Row className='week-color-row' style={{background:this.matchPromptColor(day, 'afternoon')}}>
                <div></div>
                <br></br>
                <br></br>
            </Row>
            </OverlayTrigger>
            <OverlayTrigger  placement="bottom" overlay={
                <Popover>
                    <Popover.Content>
                    {this.renderWeekDayPopover(day, 'evening')} 
                    </Popover.Content> 
            </Popover>}> 
            <Row className='week-color-row' style={{background: this.matchPromptColor(day, 'evening')}}>
                <div></div>
                <br></br>
                <br></br>
            </Row>
            </OverlayTrigger>
          
          
        </div>
      
        );
        day = addDays(day, 1);
      }
    
    return <div className="row" key={day}>
    {days}
  </div>
  }
}


  handleDateClick = day => {
    if (this.matchDatesForClick(day)) {
        window.location.href = `http://localhost:3001/entries/${this.matchDatesForClick(day).id}`
    }
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextWeek = () => {
    let nextW = addWeeks(this.state.currentWeek, 1)
    this.props.setWeek(nextW)
    this.setState({
    currentWeek: nextW
    });
  }

  prevWeek = () => {
    let prevW = subWeeks(this.state.currentWeek, 1)
    this.props.setWeek(prevW)
    this.setState({
        currentWeek: prevW
      });
  }


  renderPopoverContent(day){
      
    if (this.matchDatesForClick(day)) {
        let entry = this.matchDatesForClick(day)
    
          return <div> 
            <em><strong>Aggregate Entry Sentiment:</strong></em> 
            <br></br><br></br>
                {entry.agg_score_key}  |  {this.showAggScore(entry.agg_score)}
            <br></br><br></br>
            <em><strong>Sentiment Score by Prompt:</strong></em>
            <br></br><br></br>
            <strong>Morning:</strong>
            <br></br>
                &emsp;&emsp;{entry.scores[0].sentiment}  |  {this.showScore(entry.scores[0])}
            <br></br><br></br>
            <strong>Afternoon:</strong>
            <br></br>
                &emsp;&emsp;{entry.scores[1].sentiment}  |  {this.showScore(entry.scores[1])}
            <br></br><br></br>
            <strong>Evening:</strong>
            <br></br>
                &emsp;&emsp;{entry.scores[2].sentiment}  |  {this.showScore(entry.scores[2])}
            <br></br><br></br>
            <em>Click to go to entry summary page</em>
              </div>
              
      } else {
          return 'No entry for this date!'
      }
    
  }

  renderWeekDayPopover(day, partOfEntry){
    if (this.matchDatesForClick(day)) {
        let entry = this.matchDatesForClick(day)
        switch(partOfEntry) {
            case 'date':
                return <div>
                    <strong>Aggregate Entry Sentiment</strong>
                    <br></br><br></br>
                    {entry.agg_score_key}  |  {this.showAggScore(entry.agg_score)}
                    <br></br><br></br>
                    <em>click entry date to go to entry summary page</em>
                </div>
            case 'morning': 
                return <div>
                <strong>Morning Entry Sentiment</strong>
                <br></br><br></br>
                {entry.scores[0].sentiment}  |  {this.showScore(entry.scores[0])}
            </div>
            case 'afternoon':
                return <div>
                <strong>Afternoon Entry Sentiment</strong> 
                <br></br><br></br>
                {entry.scores[1].sentiment}  |  {this.showScore(entry.scores[1])}
            </div>
            case 'evening':
                return <div>
                <strong>Evening Entry Sentiment</strong> 
                <br></br><br></br>
                {entry.scores[2].sentiment}  |  {this.showScore(entry.scores[2])}
            </div>
        }     
      } else {
          return 'No entry for this date!'
      }
  }

  showScore = (score) => {
    switch(score.sentiment) {
        case 'POSITIVE':
            return `${(score.pos_score * 100).toFixed(1)}%` 
        case 'NEGATIVE':
            return `${(score.neg_score * 100).toFixed(1)}%`
        case 'NEUTRAL':
            return `${(score.neut_score * 100).toFixed(1)}%`
        case 'MIXED':
            return `${(score.mixed_score * 100).toFixed(1)}%`
    
    }
}

showAggScore = (agg_score) => {
   return `${(agg_score * 100).toFixed(1)}%` 
}

  compareDates = (day) => {
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
        return entryObj[parsedDayDate]    
    } else {
        return false
    }
  }

  matchColor = (day) => {
  
    let parsedDayDate = this.parseCalDate(day)
   
    let entryObj = this.compareDates(day)

    if (Object.keys(entryObj).includes(parsedDayDate)){
        return this.dayColor(entryObj[parsedDayDate])
    } else {
        return '#fff'
    }


}

matchPromptColor = (day, timeOfDay) => {
   if (this.matchDatesForClick(day)) {
        let entry = this.matchDatesForClick(day)
        switch(timeOfDay) {
            case 'morning': 
                return this.promptColor(entry.scores[0])
            case 'afternoon':
                return this.promptColor(entry.scores[1])
            case 'evening':
                return this.promptColor(entry.scores[2])
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
    let entryScore = entry.agg_score_key
    let scoreVal = entry.agg_score - 0.1
   
    switch(entryScore) {
        case 'POSITIVE':
            return `rgba(${posColor}, ${scoreVal})` 
        case 'NEGATIVE':
            return `rgba(${negColor}, ${scoreVal})` 
        case 'NEUTRAL':
            return `rgba(${neutColor}, ${scoreVal})` 
        case 'MIXED':
            return `rgba(${mixedColor}, ${scoreVal})`
        default: 
            return '#fff' 
    }
}

promptColor = (score) => {
    // console.log(score)
    switch(score.sentiment) {
        case 'POSITIVE':
            return `rgba(${posColor}, ${score.pos_score - 0.1})` 
        case 'NEGATIVE':
            return `rgba(${negColor}, ${score.neg_score - 0.1})`
        case 'NEUTRAL':
            return `rgba(${neutColor}, ${score.neut_score - 0.1})`
        case 'MIXED':
            return `rgba(${mixedColor}, ${score.mixed_score - 0.1})`
    
    }
}

  render() {
    return (
      <div className='calendar-week-box'>
      <div className="calendar-week">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
      </div>
    );
  }
}

export default WeekCal
