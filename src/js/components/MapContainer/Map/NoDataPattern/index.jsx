import React from "react"
import theme from "../../../../utils/theme"

const NoDataPattern = () => (
	<pattern
		id="no-data-pattern"
		x="0"
		y="0"
		patternUnits="userSpaceOnUse"
		width="5"
		height="5"
		viewBox="0 0 10 10"
	>
		<g>
			<rect
				x="0"
				y="0"
				fill="#ffffff"
				stroke="none"
				width="10"
				height="10"
			/>
			<path
				d="
					M 0,9 9,0 10,0 10,1 1,10 0,10 z
					M 0,0 1,0 0,1 z
					M 10,10 9,10 10,9 z
					"
				stroke="none"
				fill={theme.color.noData}
			/>
		</g>
	</pattern>
)

export default NoDataPattern
