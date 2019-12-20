import React, { useContext } from "react"
import appContext from "../../appContext"
import mapContext from "../mapContext"
import GradientBar from "./GradientBar"
import MapKeyList from "./List"
import KeyStyled from "./styles"

const Key = () => {
	const { casesLegend, vaccinationLegend } = useContext(appContext)

	const { showCases, selectedRegion, year } = useContext(mapContext)

	const legendText = showCases ? casesLegend : vaccinationLegend

	let selectedRegionText = selectedRegion
	if (selectedRegion === "All") {
		selectedRegionText = "All regions"
	} else if (selectedRegionText === "Americas") {
		selectedRegionText = "The Americas"
	}

	return (
		<KeyStyled aria-hidden>
			<p className="bold">{`${legendText}: ${selectedRegionText} ${year}`}</p>

			{showCases ? <MapKeyList /> : <GradientBar />}
		</KeyStyled>
	)
}

export default Key
