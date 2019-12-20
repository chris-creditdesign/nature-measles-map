import { useContext } from "react"
import { geoPath, geoEquirectangular } from "d3-geo"

import useSelectedFeature from "../useSelectedFeature"
import appContext from "../appContext"
import mapContext from "./mapContext"

const usePathFunction = () => {
	const { simpleFeatures } = useContext(appContext)

	const {
		selectedRegion,
		selectedCountry,
		mapWidth,
		mapHeight,
	} = useContext(mapContext)

	let featureCollection = simpleFeatures
	let padding = 0

	// Determine if the user has selected a country or a region
	const {
		userHasSelectedCountry,
		userHasSelectedRegion,
	} = useSelectedFeature(selectedCountry, selectedRegion)

	if (userHasSelectedRegion) {
		if (!userHasSelectedCountry) {
			if (selectedRegion === "Africa") {
				featureCollection = simpleFeatures.filter(
					d => d.properties.region === "Africa"
				)
				padding = 50
			} else if (selectedRegion === "Americas") {
				featureCollection = simpleFeatures.filter(
					d => d.properties.region === "Americas"
				)
			} else if (selectedRegion === "Asia") {
				featureCollection = simpleFeatures.filter(
					d => d.properties.region === "Asia"
				)
			} else if (selectedRegion === "Europe") {
				featureCollection = simpleFeatures.filter(
					d => d.properties.region === "Europe"
				)
			} else if (selectedRegion === "Oceania") {
				featureCollection = simpleFeatures.filter(
					d => d.properties.region === "Oceania"
				)
			}
		}
	}
	if (userHasSelectedCountry) {
		featureCollection = simpleFeatures.filter(
			d => d.properties.altcode === selectedCountry
		)
		padding = 50
	}
	const projection = geoEquirectangular().fitExtent(
		[[padding, padding], [mapWidth - padding, mapHeight - padding]],
		{
			type: "FeatureCollection",
			features: featureCollection,
		}
	)

	/* Create case for Russia */
	// .center([400,0])

	return geoPath().projection(projection)
}

export default usePathFunction
