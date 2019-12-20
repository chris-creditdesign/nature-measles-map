import React, { useContext } from "react"
import PropTypes from "prop-types"
import StyledDataTable from "./styles"
import Line from "../Line"
import appContext from "../../../appContext"

const DataTable = ({
	chartColour,
	chartInnerHeight,
	data,
	format,
	onYearChange,
	selectedCountryName,
	xScale,
	yAxisLegendText,
	year,
	yScale,
}) => {
	const { chartDotRadius, xAxisTextStyle } = useContext(appContext)

	const formattedData = Object.keys(data)
		.filter(d => data[d] !== "noData")
		.map(d => ({ date: d, value: data[d] }))

	const columnHeaders = formattedData.map(d => (
		<text
			key={d.date}
			role="columnheader"
			x={xScale(d.date)}
			y={0}
			dy="1.5em"
			style={xAxisTextStyle}
		>
			{d.date}
		</text>
	))

	const circleCells = formattedData.map(d => (
		<g key={d.date} role="cell">
			<circle
				cx={xScale(d.date)}
				cy={yScale(d.value)}
				r={
					parseInt(d.date, 10) === year
						? chartDotRadius * 1.8
						: chartDotRadius
				}
				fill={chartColour}
				role="img"
				onClick={() =>
					onYearChange(parseInt(d.date, 10))
				}
			>
				<title>{format(d.value)}</title>
			</circle>
		</g>
	))

	return (
		<StyledDataTable role="table">
			<g
				transform={`translate(0,${chartInnerHeight})`}
				role="row"
				opacity={0}
			>
				<text role="columnheader">Year</text>
				{columnHeaders}
			</g>

			<g role="row">
				<g role="rowheader">
					<Line
						chartColour={chartColour}
						formattedData={formattedData}
						selectedCountryName={
							selectedCountryName
						}
						xScale={xScale}
						yAxisLegendText={
							yAxisLegendText
						}
						yScale={yScale}
					/>
				</g>
				{circleCells}
			</g>
		</StyledDataTable>
	)
}

DataTable.propTypes = {
	chartColour: PropTypes.string.isRequired,
	chartInnerHeight: PropTypes.number.isRequired,
	data: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	).isRequired,
	format: PropTypes.func.isRequired,
	onYearChange: PropTypes.func.isRequired,
	selectedCountryName: PropTypes.string.isRequired,
	xScale: PropTypes.func.isRequired,
	yAxisLegendText: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
	yScale: PropTypes.func.isRequired,
}

export default DataTable
