import React from "react";
import moment from "moment";
import "./calendar.css";
import helperFun from "./DateHelper";
import CalendarHead from "./Components/CalendarHeader";
import YearTable from "./Components/YearTable";
import MonthList from "./Components/MonthList";
export default class Calendar extends React.Component {
	// Get short week days string[mon,tue,...]
	weekdayshort = moment.weekdaysShort();

	state = {
		showCalendarTable: true,
		showMonthTable: false,
		dateObject: moment(),
		allmonths: moment.months(),
		showYearNav: false,
		selectedDay: null,
	};
	daysInMonth = () => {
		return this.state.dateObject.daysInMonth();
	};
	year = () => {
		return this.state.dateObject.format("Y");
	};
	currentDay = () => {
		return this.state.dateObject.format("D");
	};

	// it retrieves the first weekday of the month
	firstDayOfMonth = () => {
		let dateObject = this.state.dateObject;
		let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
		return firstDay;
	};
	month = () => {
		return this.state.dateObject.format("MMMM");
	};

	// toggle: show and hide the monthsTable
	showMonth = (e, month) => {
		this.setState({
			showMonthTable: !this.state.showMonthTable,
			showCalendarTable: !this.state.showCalendarTable,
		});
	};
	// set appropriate calendar while changing the month
	setMonth = (month) => {
		let monthNo = this.state.allmonths.indexOf(month);
		let dateObject = Object.assign({}, this.state.dateObject);
		dateObject = moment(dateObject).set("month", monthNo);
		this.setState({
			dateObject: dateObject,
			showMonthTable: !this.state.showMonthTable,
			showCalendarTable: !this.state.showCalendarTable,
		});
	};

	showYearEditor = () => {
		this.setState({
			showYearNav: true,
			showCalendarTable: !this.state.showCalendarTable,
		});
	};

	onPrev = () => {
		let curr = "";
		if (this.state.showMonthTable == true) {
			curr = "year";
		} else {
			curr = "month";
		}
		this.setState({
			dateObject: this.state.dateObject.subtract(1, curr),
		});
	};
	onNext = () => {
		let curr = "";
		if (this.state.showMonthTable == true) {
			curr = "year";
		} else {
			curr = "month";
		}
		this.setState({
			dateObject: this.state.dateObject.add(1, curr),
		});
	};
	setYear = (year) => {
		// change state when selected year changes
		let dateObject = Object.assign({}, this.state.dateObject);
		dateObject = moment(dateObject).set("year", year);
		this.setState({
			dateObject: dateObject,
			showMonthTable: !this.state.showMonthTable,
			showYearNav: !this.state.showYearNav,
			showMonthTable: !this.state.showMonthTable,
		});
	};
	onYearChange = (e) => {
		this.setYear(e.target.value);
	};

	onDayClick = (e, d) => {
		this.setState(
			{
				selectedDay: d,
			},
			() => {
				console.log("SELECTED DAY: ", this.state.selectedDay);
			}
		);
	};
	render() {
		// loop through the array of short week days and return jsx
		let weekdayshortname = this.weekdayshort.map((day) => {
			return <th key={day}>{day}</th>;
		});

		// generate blanks spaces,filling for the days of the month
		let blanks = [];
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanks.push(<td className="calendar-day empty">{""}</td>);
		}
		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) {
			let currentDay = d == this.currentDay() ? "today" : "";
			// let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
			daysInMonth.push(
				<td key={d} className={`calendar-day ${currentDay}`}>
					<span
						onClick={(e) => {
							this.onDayClick(e, d);
						}}
					>
						{d}
					</span>
				</td>
			);
		}

		var totalSlots = [...blanks, ...daysInMonth]; // contains blanks and total daysInMonth
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if (i % 7 !== 0) {
				cells.push(row); //
			} else {
				rows.push(cells);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1) {
				// let insertRow = cells.slice();
				rows.push(cells);
			}
		});

		let daysinmonth = rows.map((d, i) => {
			return <tr key={i}>{d}</tr>;
		});

		return (
			<div className="tail-datetime-calendar">
				<CalendarHead
					showMonthTable={this.state.showMonthTable}
					showYearEditor={this.state.showYearEditor}
					onPrev={this.onPrev}
					onNext={this.onNext}
					showMonth={this.showMonth}
					month={this.month}
					year={this.year}
					showYearFunc={this.showYearEditor}
				/>
				<div className="calendar-date">
					{this.state.showYearNav && (
						<YearTable year={this.year()} setYear={this.setYear} />
					)}
					{/*  Temporary hide showTable onload */}
					{this.state.showMonthTable && <MonthList setMonth={this.setMonth} />}
				</div>

				{this.state.showCalendarTable && (
					<div className="calendar-date">
						<table className="calendar-day">
							<thead>
								<tr>{weekdayshortname}</tr>
							</thead>
							<tbody>{daysinmonth}</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}
