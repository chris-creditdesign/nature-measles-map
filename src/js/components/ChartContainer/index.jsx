import React, { useContext } from "react"
import PropTypes from "prop-types"
import { max } from "d3-array"
import Chart from "./Chart/index"
import useSelectedFeature from "../useSelectedFeature"
import { removeNameAndCode } from "../../helpers"
import appContext from "../appContext"
import StyledChartContainer from "./styles"

const ChartContainer = ({
	contentWidth,
	selectedCountry,
	selectedRegion,
	setYear,
	year,
}) => {
	const {
		chartHeight,
		casesChartColour,
		casesLegend,
		format,
		formatPercent,
		vaccinationChartColour,
		vaccinationLegend,
	} = useContext(appContext)

	// Get the selected feature. Either a country or a region.
	const { selectedFeature } = useSelectedFeature(
		selectedCountry,
		selectedRegion
	)

	// Get the relevant data for the selected country in order to build the charts
	// Also get the name of the selected feature
	const { cases, vaccination, name } = selectedFeature.properties

	// Remove the name and code keys for ease
	const caseChartData = removeNameAndCode(cases)
	const vaccinationChartData = removeNameAndCode(vaccination)

	// Get the maximum data point for cases
	const maxDataPoint = max(
		Object.keys(caseChartData)
			.map(d => caseChartData[d])
			.filter(d => d !== "noData")
	)

	return (
		<StyledChartContainer>
			<Chart
				chartColour={casesChartColour}
				contentWidth={contentWidth}
				data={caseChartData}
				format={format}
				height={chartHeight}
				maxDataPoint={maxDataPoint}
				selectedCountryName={name}
				setYear={setYear}
				yAxisLegendText={casesLegend}
				year={year}
			/>

			<Chart
				chartColour={vaccinationChartColour}
				contentWidth={contentWidth}
				data={vaccinationChartData}
				format={formatPercent}
				height={chartHeight}
				maxDataPoint={100}
				selectedCountryName={name}
				setYear={setYear}
				yAxisLegendText={`${vaccinationLegend} (%)`}
				year={year}
			/>
		</StyledChartContainer>
	)
}

export default ChartContainer

ChartContainer.propTypes = {
	contentWidth: PropTypes.number.isRequired,
	selectedCountry: PropTypes.string.isRequired,
	selectedRegion: PropTypes.string.isRequired,
	setYear: PropTypes.func.isRequired,
	year: PropTypes.number.isRequired,
}
