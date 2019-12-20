import React from "react"
import PropTypes from "prop-types"
import StyledRect from "./styles"

const ChartBackgroundBox = ({ height, width, x, y }) => (
	<StyledRect
		aria-hidden
		height={`${height}px`}
		width={`${width}px`}
		x={`${x}px`}
		y={`${y}px`}
	/>
)

ChartBackgroundBox.propTypes = {
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
}

export default ChartBackgroundBox
