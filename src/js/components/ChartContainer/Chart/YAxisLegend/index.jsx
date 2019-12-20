import React, { useContext } from "react"
import PropTypes from "prop-types"
import appContext from "../../../appContext"

const YAxisLegend = ({ chartInnerHeight, yAxisLegendText }) => {
	const { chartInnerMargin, yAxisLegendTextStyle } = useContext(
		appContext
	)
	const { left } = chartInnerMargin
	const { dy } = yAxisLegendTextStyle

	return (
		<g
			transform={`translate(-${left}, ${chartInnerHeight /
				2}) rotate(270)`}
			aria-hidden
		>
			<text style={yAxisLegendTextStyle} dy={dy}>
				{yAxisLegendText}
			</text>
		</g>
	)
}

YAxisLegend.propTypes = {
	chartInnerHeight: PropTypes.number.isRequired,
	yAxisLegendText: PropTypes.string.isRequired,
}

export default YAxisLegend
