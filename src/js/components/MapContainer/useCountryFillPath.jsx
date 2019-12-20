import React, { useContext } from "react"
import mapContext from "./mapContext"
import appContext from "../appContext"

/**
 * Creates an array of path elements. Each one representing a country.
 * The path is filled according to the data for each country - or
 * filled with 'noData' if no data is present or if the
 * country is not part of the filtered region.
 *
 * @param {*} pathFunction d3.line() generator function
 */
const useCountryFillPath = pathFunction => {
	const { features, uiColour } = useContext(appContext)

	const {
		casesColourScale,
		selectedRegion,
		showCases,
		vaccinationColourScale,
		year,
	} = useContext(mapContext)

	const countryFillPath = features.map(feature => {
		// Determine the fill of the path
		// 1. The default fill is noData
		// 2. Check that either all regions are selected, or that
		// this feature belongs to the selected region
		// 3. If so, check if showCases is true or false
		// 4. If showCases is true, colour according to the cases value for the
		// corresponding year - otherwise colour according to the vaccinacion
		// value for the corresponding year.
		// 5. If the case or vaccination value is found to be 'noData' colour
		// according to 'noData'.
		let fill = uiColour.noDataPattern

		if (
			selectedRegion === "All" ||
			selectedRegion === feature.properties.region
		) {
			if (showCases) {
				if (feature.properties.cases) {
					if (
						feature.properties.cases[
							year
						] !== "noData"
					) {
						fill = casesColourScale(
							feature.properties
								.cases[year]
						)
					}
				}
			} else if (feature.properties.vaccination) {
				if (
					feature.properties.vaccination[year] !==
					"noData"
				) {
					fill = vaccinationColourScale(
						feature.properties.vaccination[
							year
						]
					)
				}
			}
		}

		return (
			<path
				className="nature-graphic__map-container__map__fill-path"
				key={feature.properties.code}
				d={pathFunction(feature)}
				fill={fill}
				stroke="none"
				strokeWidth={0}
			/>
		)
	})

	return countryFillPath
}

export default useCountryFillPath
