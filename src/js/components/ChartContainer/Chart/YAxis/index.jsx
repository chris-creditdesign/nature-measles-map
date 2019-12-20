import React, { useContext } from "react"
import PropTypes from "prop-types"
import appContext from "../../../appContext"

const YAxis = ({ chartInnerWidth, yScale }) => {
	const {
		baselineStyle,
		dottedTickStyle,
		format,
		yAxisTextStyle,
		yAxisTickCount,
	} = useContext(appContext)

	const ticks = yScale
		.ticks(yAxisTickCount)
		.map((tick, i) => (
			<line
				key={tick}
				x1={-8}
				y1={yScale(tick)}
				x2={chartInnerWidth}
				y2={yScale(tick)}
				style={
					i === 0
						? baselineStyle
						: dottedTickStyle
				}
			/>
		))

	const labels = yScale.ticks(yAxisTickCount).map(tick => (
		<text
			key={tick}
			x={-15}
			y={yScale(tick)}
			dy="0.3em"
			style={yAxisTextStyle}
		>
			{format(tick)}
		</text>
	))

	return (
		<g aria-hidden>
			<g>{ticks}</g>
			<g>{labels}</g>
		</g>
	)
}

YAxis.propTypes = {
	chartInnerWidth: PropTypes.number.isRequired,
	yScale: PropTypes.func.isRequired,
}

export default YAxis
