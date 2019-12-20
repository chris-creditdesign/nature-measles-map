import React, { useContext } from "react"
import PropTypes from "prop-types"
import appContext from "../../../appContext"

const XAxis = ({ chartInnerHeight, xScale }) => {
	const { smallTickStyle, xAxisTextStyle } = useContext(appContext)

	const tickCount = window.innerWidth < 600 ? 5 : 10

	const ticks = xScale
		.ticks(tickCount)
		.map(year => (
			<line
				key={year}
				x1={xScale(year)}
				y1={0}
				x2={xScale(year)}
				y2={8}
				style={smallTickStyle}
			/>
		))

	const labels = xScale.ticks(tickCount).map(year => (
		<text
			key={year}
			x={xScale(year)}
			y={0}
			dy="1.5em"
			style={xAxisTextStyle}
		>
			{year}
		</text>
	))

	return (
		<g transform={`translate(0,${chartInnerHeight})`} aria-hidden>
			<g>{ticks}</g>
			<g>{labels}</g>
		</g>
	)
}

XAxis.propTypes = {
	chartInnerHeight: PropTypes.number.isRequired,
	xScale: PropTypes.func.isRequired,
}

export default XAxis
