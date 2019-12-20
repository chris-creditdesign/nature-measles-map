import { useContext } from "react"
import appContext from "./appContext"

const useSelectedFeature = (
	selectedCountry = "All",
	selectedRegion = "All",
	year = 1980
) => {
	const { features, format, formatPercent, regions } = useContext(
		appContext
	)

	// Determine if the user has selected a country or a region
	const userHasSelectedCountry = selectedCountry !== "All"
	const userHasSelectedRegion = selectedRegion !== "All"

	// If a region has been selected we want to set selectedFeature to that region.
	// If a country has been selected we want selectedFeature to that country.
	// If nothing has been selected, we want to set selectedFeature to the
	// world/All region.
	// ie selectedFeature = regions[0] or use array destructuring [selectedFeature] = regions
	let [selectedFeature] = regions

	if (userHasSelectedRegion && !userHasSelectedCountry) {
		;[selectedFeature] = regions.filter(region => {
			const { code } = region.properties
			return code === selectedRegion
		})
	} else if (userHasSelectedCountry) {
		;[selectedFeature] = features.filter(feature => {
			const { code } = feature.properties
			return code === selectedCountry
		})
	}

	// Get the properly formatted number of cases - or display 'No data'
	const cases = selectedFeature.properties.cases[year]
	const formattedCases = cases === "noData" ? "No data" : format(cases)

	// Get the properly formatted vaccination percentage - or display 'No data'
	const vaccinationRate = selectedFeature.properties.vaccination[year]
	const formatteedVaccinationRate =
		vaccinationRate === "noData"
			? "No data"
			: formatPercent(vaccinationRate)

	return {
		selectedFeature,
		userHasSelectedCountry,
		userHasSelectedRegion,
		formattedCases,
		formatteedVaccinationRate,
	}
}

export default useSelectedFeature
