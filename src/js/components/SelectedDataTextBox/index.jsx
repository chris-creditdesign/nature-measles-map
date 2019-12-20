import React, { useContext, useLayoutEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import useSelectedFeature from "../useSelectedFeature"
import appContext from "../appContext"
import StyledSelectedDataTextBox from "./styles"

const SelectedDataTextBox = ({ selectedCountry, selectedRegion, year }) => {
	const { selectedDataTextBoxId } = useContext(appContext)

	// Set the state of the 'new data loaded message' as a string.
	// The first time the component renders, this string should be empty.
	const [newDataSetLoadedMsg, SetNewDataSetLoadedMsg] = useState("")

	// Set up a ref, just to determine if this is the first time the
	// component has rendered. If so, firstUpdateRef.current = true
	const firstUpdateRef = useRef(true)

	// Once the component renders, useLayoutEffect will be called.
	// If this is the first render, firstUpdateRef.current will be set to false.
	// After that `newDataSetLoadedMsg` will be set as 'New data set loaded.'
	// Fnuction will only be called if `selectedCountry` or `year` are changed.
	useLayoutEffect(() => {
		if (firstUpdateRef.current) {
			firstUpdateRef.current = false
			return
		}
		SetNewDataSetLoadedMsg("New data set loaded.")
	}, [selectedCountry, year])

	// Get the selected feature. Either a country or a region
	// and the formatted number of cases and vaccination rate
	const {
		selectedFeature,
		formattedCases,
		formatteedVaccinationRate,
	} = useSelectedFeature(selectedCountry, selectedRegion, year)

	// Get the long name of the selected feature
	const { name } = selectedFeature.properties

	return (
		<StyledSelectedDataTextBox
			id={selectedDataTextBoxId}
			role="region"
			aria-live="polite"
		>
			<p className="visually-hidden">{newDataSetLoadedMsg}</p>

			<dl>
				<div>
					<dt>Country/region</dt>
					<dd>{name}</dd>
				</div>

				<div>
					<dt>Year</dt>
					<dd>{year}</dd>
				</div>

				<div>
					<dt>Cases of measles</dt>
					<dd>{formattedCases}</dd>
				</div>

				<div>
					<dt>Vaccination rate</dt>
					<dd>{formatteedVaccinationRate}</dd>
				</div>
			</dl>
		</StyledSelectedDataTextBox>
	)
}

SelectedDataTextBox.propTypes = {
	selectedCountry: PropTypes.string.isRequired,
	selectedRegion: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
}

export default SelectedDataTextBox
