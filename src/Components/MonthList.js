import moment from "moment";

const MonthList = ({ setMonth }) => {
	let months = [];
	moment.months().map((data) => {
		months.push(
			<td key={data} className="calendar-month" onClick={() => setMonth(data)}>
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
	let monthlist = rows.map((d, i) => <tr key={i}>{d}</tr>);
	return (
		<table className="calendar-month">
			<thead>
				<tr>
					<th colSpan="4">Select a Month</th>
				</tr>
			</thead>
			<tbody>{monthlist}</tbody>
		</table>
	);
};
export default MonthList;
