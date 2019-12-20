import React, { useContext } from "react"
import mapContext from "./mapContext"
import appContext from "../appContext"
import StyledCountryStrokePath from "./map-styled"

/**
 * Creates an array of svg group elements containing svg paths.
 * The paths are the visual representation of the country.
 * The groups have role="cell"
 * The paths have role="img" and a child `title` element - this enables
 * them to be read by screen readers as table cell elements, as if they
 * contained text.
 * The text content of the title element is the corresponding data point for
 * this country.
 * The paths are esentailly invisible, with fill-opacity=0 and stroke-width=0 until
 * they are hovered over, at which point their stroke-width is set to 1px.
 * When the path is hovered over it should set contents of the
 * tooltip and make the tooltip visible.
 * When the path is clicked on, it should set the selectedCountry to be it's own
 * code.
 *
 * @param {*} pathFunction d3.line() generator function
 */
const useCountryStrokePath = pathFunction => {
	const {
		casesLegend,
		features,
		format,
		formatPercent,
		vaccinationLegend,
	} = useContext(appContext)

	const {
		selectedCountry,
		selectedRegion,
		setSelectedCountry,
		setSelectedRegion,
		setTooltipCase,
		setTooltipCountryName,
		setTooltipVaccination,
		setTooltipVisible,
		showCases,
		year,
	} = useContext(mapContext)

	const handleClick = code => {
		// If the country is already selected, reset the map
		// otherwise select the country
		if (selectedCountry === code) {
			setSelectedCountry("All")
		} else {
			setSelectedCountry(code)
		}
		// Reset the region to avoid any conflicts
		setSelectedRegion("All")
	}

	const handleMouseEnter = properties => {
		const { name, cases, vaccination } = properties

		// Get the properly formatted number of cases - or display 'No data'
		const formattedCases =
			cases[year] === "noData"
				? "No data"
				: format(cases[year])

		// Get the properly formatted vaccination percentage - or display 'No data'
		const formatteedVaccinationRate =
			vaccination[year] === "noData"
				? "No data"
				: formatPercent(vaccination[year])

		setTooltipCountryName(name)
		setTooltipCase(formattedCases)
		setTooltipVaccination(formatteedVaccinationRate)
		setTooltipVisible(true)
	}

	const handleMouseLeave = () => {
		setTooltipVisible(false)
	}

	// 1. Remove the 'All' feature, no need to add that to the table
	// 2. Filter: If a feature has no data, don't give it an outline or make it clickable
	// 3. Filter: If this feature does not belong to the selected region - or all regions
	// are not selected, don't include it.
	const countryStrokePath = features
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
		.map(feature => {
			let title = "No Data"
			let selected = false

			const label = `${
				showCases ? casesLegend : vaccinationLegend
			} ${year} ${feature.properties.name}`

			if (showCases) {
				if (feature.properties.cases) {
					if (
						feature.properties.cases[
							year
						] !== "noData"
					) {
						title = format(
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
					title = formatPercent(
						feature.properties.vaccination[
							year
						]
					)
				}
			}

			if (selectedCountry === feature.properties.code) {
				selected = true
			}

			return (
				<g key={feature.properties.code} role="cell">
					<StyledCountryStrokePath
						className="country-stroke-path"
						selected={selected}
						id={feature.properties.code}
						d={pathFunction(feature)}
						role="img"
						aria-labelledby={label}
						onClick={() =>
							handleClick(
								feature
									.properties
									.code
							)
						}
						onMouseEnter={() =>
							handleMouseEnter(
								feature.properties
							)
						}
						onMouseLeave={() =>
							handleMouseLeave()
						}
					>
						<title>{title}</title>
					</StyledCountryStrokePath>
				</g>
			)
		})

	return countryStrokePath
}

export default useCountryStrokePath
