function CalendarHead({
	onPrev,
	onNext,
	showMonth,
	month,
	showYearEditor,
	year,
	showMonthTable,
}) {
	return (
		<div className="calendar-navi">
			<div
				className="spanDiv"
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<span
					onClick={() => {
						onPrev();
					}}
					class="calendar-button button-prev first"
				/>

				<span
					onClick={() => {
						onNext();
					}}
					className="calendar-button button-next last"
				/>
			</div>
			{!showMonthTable && !showYearEditor && (
				<span
					onClick={() => {
						showMonth();
					}}
					class="calendar-label"
				>
					{month()}
				</span>
			)}
			<span
				className="calendar-label"
				onClick={() => {
					showYearEditor();
				}}
			>
				{year()}
			</span>
		</div>
	);
}

export default CalendarHead;
