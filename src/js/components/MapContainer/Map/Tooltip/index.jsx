import React, { useContext } from "react"
import mapContext from "../../mapContext"
import StyledTooltip from "./styles"

const MapTooltip = () => {
	const {
		tooltipCases,
		tooltipAlign,
		tooltipCountryName,
		tooltipVaccination,
		tooltipVisible,
		tooltipX,
		tooltipY,
	} = useContext(mapContext)

	if (!tooltipVisible) return null

	return (
		<StyledTooltip
			tooltipAlign={tooltipAlign}
			style={{ left: tooltipX, top: tooltipY }}
			aria-hidden
		>
			<p>
				<span className="bold">
					{tooltipCountryName}
				</span>
			</p>

			<p>
				<span className="bold">
					{"Cases of measles: "}
				</span>
				{tooltipCases}
			</p>

			<p>
				<span className="bold">
					{"Vaccination rate: "}
				</span>
				{tooltipVaccination}
			</p>
		</StyledTooltip>
	)
}

export default MapTooltip
