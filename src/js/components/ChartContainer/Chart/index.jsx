import React, { useContext } from "react"
import PropTypes from "prop-types"
import { scaleLinear } from "d3-scale"
import appContext from "../../appContext"
import StyledSvg from "./styles"
import XAxis from "./XAxis"
import YAxis from "./YAxis"
import DataTable from "./DataTable"
import YAxisLegend from "./YAxisLegend"
import SelectedYearLine from "./SelectedYearLine"
import ChartBackgroundBox from "./ChartBackgroundBox"

const Chart = ({
	chartColour,
	contentWidth,
	data,
	format,
	height,
	maxDataPoint,
	selectedCountryName,
	setYear,
	yAxisLegendText,
	year,
}) => {
	const { chartInnerMargin, chartMargin, yearMax, yearMin } = useContext(
		appContext
	)

	const { left, right, top, bottom } = chartMargin

	const {
		left: innerLeft,
		right: innerRight,
		top: innerTop,
		bottom: innerBottom,
	} = chartInnerMargin

	const chartWidth = contentWidth - left - right
	const chartHeight = height - top - bottom
	const chartInnerWidth = chartWidth - innerLeft - innerRight
	const chartInnerHeight = chartHeight - innerTop - innerBottom

	const xScale = scaleLinear()
		.domain([yearMin, yearMax])
		.range([0, chartInnerWidth])

	const yScale = scaleLinear()
		.domain([0, maxDataPoint])
		.range([chartInnerHeight, 0])

	return (
		<StyledSvg
			height={`${chartHeight}px`}
			viewBox={`0 0 ${chartWidth} ${chartHeight}`}
			width={`${chartWidth}px`}
			focusable={false}
			aria-labelledby="chart-title"
		>
			<title id="chart-title">
				{`${yAxisLegendText} ${selectedCountryName} ${yearMin}-${yearMax}`}
			</title>
			<g transform={`translate(${innerLeft},${innerTop})`}>
				<ChartBackgroundBox
					height={chartInnerHeight}
					width={chartInnerWidth}
					x={0}
					y={0}
				/>

				<XAxis
					chartInnerHeight={chartInnerHeight}
					xScale={xScale}
				/>

				<YAxis
					chartInnerWidth={chartInnerWidth}
					yScale={yScale}
				/>

				<YAxisLegend
					chartInnerHeight={chartInnerHeight}
					yAxisLegendText={yAxisLegendText}
				/>

				<SelectedYearLine
					chartInnerHeight={chartInnerHeight}
					year={year}
					xScale={xScale}
				/>

				<DataTable
					chartColour={chartColour}
					chartInnerHeight={chartInnerHeight}
					data={data}
					format={format}
					onYearChange={setYear}
					selectedCountryName={
						selectedCountryName
					}
					xScale={xScale}
					yAxisLegendText={yAxisLegendText}
					year={year}
					yScale={yScale}
				/>
			</g>
		</StyledSvg>
	)
}

export default Chart

Chart.propTypes = {
	contentWidth: PropTypes.number.isRequired,
	data: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	).isRequired,
	format: PropTypes.func.isRequired,
	height: PropTypes.number.isRequired,
	maxDataPoint: PropTypes.number.isRequired,
	selectedCountryName: PropTypes.string.isRequired,
	chartColour: PropTypes.string.isRequired,
	setYear: PropTypes.func.isRequired,
	yAxisLegendText: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
}
