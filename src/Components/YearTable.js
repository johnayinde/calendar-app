import moment from "moment";

const getDates = (startDate, stopDate) => {
	// create year range
	var dateArray = [];
	var currentDate = moment(startDate);
	var stopDate = moment(stopDate);
	while (currentDate <= stopDate) {
		dateArray.push(moment(currentDate).format("YYYY"));
		currentDate = moment(currentDate).add(1, "year");
	}
	return dateArray;
};

const YearTable = ({ setYear, year }) => {
	let months = [];
	// receives current year and create next 12 to create range
	let nextten = moment().set("year", year).add("year", 12).format("Y");

	let tenyear = getDates(year, nextten);

	tenyear.map((data) => {
		months.push(
			<td key={data} className="calendar-month" onClick={(e) => setYear(data)}>
				<span>{data}</span>
			</td>
		);
	});
	let rows = [];
	let cells = [];

	months.forEach((row, i) => {
		if (i % 3 !== 0 || i == 0) {
			cells.push(row);
		} else {
			rows.push(cells);
			cells = [];
			cells.push(row);
		}
	});
	rows.push(cells);
	let yearlist = rows.map((d, i) => {
		return <tr key={i}>{d}</tr>;
	});

	return (
		<table className="calendar-month">
			<thead>
				<tr>
					<th colSpan="4">Select a Yeah</th>
				</tr>
			</thead>
			<tbody>{yearlist}</tbody>
		</table>
	);
};

export default YearTable;
