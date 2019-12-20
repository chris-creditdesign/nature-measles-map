import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import {
	Form,
	FormButton,
	FormToggleButtons,
	FormSlider,
} from "nature-graphics-pattern-library"
import appContext from "../appContext"
import RegionSelector from "./RegionSelector"
import CountrySelector from "./CountrySelector"

const FormContainer = ({
	selectedCountry,
	selectedRegion,
	setSelectedCountry,
	setSelectedRegion,
	setShowCases,
	setYear,
	showCases,
	year,
}) => {
	const { selectedDataTextBoxId, yearMax, yearMin } = useContext(
		appContext
	)

	const [expanded, setExpanded] = useState(false)

	const visuallHidden = expanded ? " " : "visually-hidden"

	const handleToggelButtonClick = e => {
		e.preventDefault()
		setExpanded(!expanded)
	}

	return (
		<Form aria-controls={selectedDataTextBoxId}>
			<FormSlider
				heading="Select a year to display:"
				id="year-slider"
				max={yearMax}
				min={yearMin}
				value={year}
				onChange={setYear}
				disabled={false}
			/>

			<FormButton
				expanded={expanded}
				onClick={handleToggelButtonClick}
				reveal
			>
				{`${expanded ? "Hide" : "Show"} options`}
			</FormButton>

			<div
				className={visuallHidden}
				aria-hidden={expanded ? null : true}
			>
				<FormToggleButtons
					disabled={false}
					id="data-toggle"
					value={showCases}
					onValueChange={setShowCases}
					message="Choose data to display on map:"
					valueTrueMessage="Cases of measles"
					valueFalseMessage="Vaccination rate"
				/>

				<RegionSelector
					selectedRegion={selectedRegion}
					setSelectedCountry={setSelectedCountry}
					setSelectedRegion={setSelectedRegion}
				/>

				<CountrySelector
					selectedCountry={selectedCountry}
					selectedRegion={selectedRegion}
					setSelectedCountry={setSelectedCountry}
				/>
			</div>
		</Form>
	)
}

FormContainer.propTypes = {
	selectedCountry: PropTypes.string.isRequired,
	selectedRegion: PropTypes.string.isRequired,
	setSelectedCountry: PropTypes.func.isRequired,
	setSelectedRegion: PropTypes.func.isRequired,
	setShowCases: PropTypes.func.isRequired,
	setYear: PropTypes.func.isRequired,
	showCases: PropTypes.bool.isRequired,
	year: PropTypes.number.isRequired,
}

export default FormContainer
