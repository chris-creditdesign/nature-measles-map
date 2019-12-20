/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React, { useContext } from "react"
import PropTypes from "prop-types"
import { FormDropdown } from "nature-graphics-pattern-library"
import appContext from "../appContext"
import useSelectedFeature from "../useSelectedFeature"

const countryReducer = (accumulator, currentValue) => {
	const { name, code, cases, vaccination } = currentValue.properties

	if (cases && vaccination) {
		const newObject = {
			text: name,
			value: code,
		}
		accumulator.push(newObject)
	}

	return accumulator
}

const CountrySelector = ({
	selectedCountry,
	selectedRegion,
	setSelectedCountry,
}) => {
	const { features } = useContext(appContext)

	// Determine if the user has selected a region
	// use this to set the selectCountryLabelText message
	const { userHasSelectedRegion } = useSelectedFeature(
		selectedCountry,
		selectedRegion
	)

	const handleSelectedCountryChange = event => {
		const { value } = event.target

		if (value !== selectedCountry) {
			setSelectedCountry(value)
		}
	}

	const countryOptions = features
		.filter(feature => {
			const { region } = feature.properties

			if (selectedRegion === "All" || region === "All") {
				return true
			}

			return region === selectedRegion
		})
		.reduce(countryReducer, [])

	// Add 'The' infront of Americas
	const selectedRegionCorrectedText =
		selectedRegion === "Americas" ? "the Americas" : selectedRegion

	const selectCountryLabelText = userHasSelectedRegion
		? `Select a country in ${selectedRegionCorrectedText} to highlight:`
		: "Select a country to highlight:"

	return (
		<FormDropdown
			disabled={false}
			id="country-select"
			labelText={selectCountryLabelText}
			onChange={handleSelectedCountryChange}
			options={countryOptions}
			value={selectedCountry}
		/>
	)
}

CountrySelector.propTypes = {
	selectedCountry: PropTypes.string.isRequired,
	selectedRegion: PropTypes.string.isRequired,
	setSelectedCountry: PropTypes.func.isRequired,
}

export default CountrySelector
