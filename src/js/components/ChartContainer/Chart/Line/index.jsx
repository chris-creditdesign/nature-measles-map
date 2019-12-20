import React, { useContext } from "react"
import PropTypes from "prop-types"
import { line } from "d3-shape"
import appContext from "../../../appContext"

const Line = ({
	chartColour,
	formattedData,
	selectedCountryName,
	xScale,
	yAxisLegendText,
	yScale,
}) => {
	const { chartLineStyle } = useContext(appContext)

	const path = line()
		.x(d => xScale(d.date))
		.y(d => yScale(d.value))

	return (
		<path
			d={path(formattedData)}
			stroke={chartColour}
			style={chartLineStyle}
			role="img"
		>
			<title>
				{`${yAxisLegendText} ${selectedCountryName}`}
			</title>
		</path>
	)
}

Line.propTypes = {
	formattedData: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedCountryName: PropTypes.string.isRequired,
	chartColour: PropTypes.string.isRequired,
	xScale: PropTypes.func.isRequired,
	yAxisLegendText: PropTypes.string.isRequired,
	yScale: PropTypes.func.isRequired,
}

export default Line
