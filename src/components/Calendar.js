import React, { useState } from "react";
import { format, subMonths, addMonths, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay } from "date-fns";
import "../app/App.css";


function Calendar() {
    const [ selectedMonth, setSelectedMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());

    const formatMY = "MMMM yyyy";
    const formatWeekdays = "EEE";
    const daysOfTheWeek = [0,1,2,3,4,5,6];

    const formatD = "dd";
    const firstDayOfMonth = startOfMonth(selectedMonth);
    const lastDayOfMonth = endOfMonth(selectedMonth);
    const weekdayOfFirstDay = startOfWeek(firstDayOfMonth);
    const weekdayOfLastDay = endOfWeek(lastDayOfMonth);

    const populateMonth = () => {
        let days = [];
        const weeks = [];
        let day = firstDayOfMonth;

        while (day < lastDayOfMonth) {
            for (let i=0; i<7; i++) {
                days.push(day)
                day = addDays(day, 1);
            }
            weeks.push(days);
            days = [];
        }
        return weeks;
    }

    const handleDay = (day) => {
        setSelectedDate(day);
    }

    const handleLastMonth = (e) => {
        setSelectedMonth(prev => subMonths(prev, 1));
    }

    const handleNextMonth = (e) => {
        setSelectedMonth(prev => addMonths(prev, 1));
    }

    return (
        <div className="calendar">
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={handleLastMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                <span>
                    {format(selectedMonth, formatMY)}
                </span>
                </div>
                <div className="col col-end">
                    <div className="icon" onClick={handleNextMonth}>
                        chevron_right
                    </div>
                </div>
            </div>

            <div className="days row">
                {daysOfTheWeek.map(day => {
                    return (
                        <div className="col col-center" key={day}>
                            {format(addDays(startOfWeek(selectedDate), day), formatWeekdays)}
                            {/* startOfWeek ensures weekdays start on sun, else can just use selectedDate to start on current day of the week */}
                        </div>
                    )
                })}
            </div>

            <div className="body">
                {populateMonth().map((week,i) => {
                    return (
                        <div className="row" key={i}>
                            {week.map((day,i) => {
                                return (
                                    <div className={`col cell ${
                                        !isSameMonth(day, firstDayOfMonth)
                                        ? "disabled"
                                        : isSameDay(day, selectedDate) ? "selected" : ""
                                    }`} key={day} onClick={() => handleDay(day)}>
                                        <span className="number">{format(day, formatD)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar;