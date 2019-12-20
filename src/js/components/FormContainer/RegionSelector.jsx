/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React, { useContext } from "react"
import PropTypes from "prop-types"
import { FormDropdown } from "nature-graphics-pattern-library"
import appContext from "../appContext"

const regionReducer = (accumulator, currentValue) => {
	const { name, code } = currentValue.properties

	const newObject = {
		text: name,
		value: code,
	}

	accumulator.push(newObject)

	return accumulator
}

const RegionSelector = ({
	selectedRegion,
	setSelectedCountry,
	setSelectedRegion,
}) => {
	const { regions } = useContext(appContext)

	const handleSelectedRegionChange = event => {
		const { value } = event.target
		setSelectedRegion(value)
		setSelectedCountry("All")
	}

	const regionOptions = regions.reduce(regionReducer, [])

	return (
		<FormDropdown
			disabled={false}
			id="region-select"
			labelText="Filter by region:"
			onChange={handleSelectedRegionChange}
			options={regionOptions}
			value={selectedRegion}
		/>
	)
}

RegionSelector.propTypes = {
	selectedRegion: PropTypes.string.isRequired,
	setSelectedCountry: PropTypes.func.isRequired,
	setSelectedRegion: PropTypes.func.isRequired,
}

export default RegionSelector
