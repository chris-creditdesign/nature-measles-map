import React, { useContext } from "react"
import PropTypes from "prop-types"
import appContext from "../../../appContext"

const SelectedYearLine = ({ chartInnerHeight, year, xScale }) => {
	const { selectedYearLineStyle } = useContext(appContext)

	return (
		<g aria-hidden>
			<line
				x1={xScale(year)}
				y1={0}
				x2={xScale(year)}
				y2={chartInnerHeight}
				style={selectedYearLineStyle}
			/>
		</g>
	)
}

SelectedYearLine.propTypes = {
	chartInnerHeight: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	xScale: PropTypes.func.isRequired,
}

export default SelectedYearLine
