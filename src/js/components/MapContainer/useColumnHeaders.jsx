import React, { useContext } from "react"
import appContext from "../appContext"
import mapContext from "./mapContext"

/**
 * Returns an array of svg `tspan` elements to be used as the column headers
 * in the dataTable constructed within the SVG.
 */
const useColumnHeaders = () => {
	const { features } = useContext(appContext)
	const { selectedRegion } = useContext(mapContext)

	// 1. Remove the 'All' feature, no need to add that to the table
	// 2. Filter: If this feature does not belong to the currently seleceted
	// region - or if all regions are not selected, then remove it.
	const countriesPath = features
		.filter(feature => feature.properties.code !== "All")
		.filter(
			feature =>
				feature.properties.cases ||
				feature.properties.vaccination
		)
		.filter(feature => {
			if (selectedRegion === "All") {
				return true
			}
			return feature.properties.region === selectedRegion
		})
		.map(feature => (
			<tspan
				key={feature.properties.code}
				role="columnheader"
			>
				{feature.properties.name}
			</tspan>
		))

	return countriesPath
}

export default useColumnHeaders
