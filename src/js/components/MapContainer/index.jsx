import React, { useContext, useState, useRef } from "react"
import PropTypes from "prop-types"
import appContext from "../appContext"
import mapContext from "./mapContext"
import Key from "./Key"
import Map from "./Map/index"
import buildColourScales from "./buildColourScales"
import StyledMapContainer from "./styles"

const MapContainer = ({
	contentWidth,
	selectedCountry,
	selectedRegion,
	setSelectedCountry,
	setSelectedRegion,
	showCases,
	year,
}) => {
	const { features, mapMargin, mapDefaultWidth, mapRatio } = useContext(
		appContext
	)

	const { bottom, left, right, top } = mapMargin

	const mapContainerRef = useRef(null)
	const [tooltipX, setTooltipX] = useState(0)
	const [tooltipY, setTooltipY] = useState(0)
	const [tooltipAlign, setTooltipAlign] = useState("left-top")
	const [tooltipCountryName, setTooltipCountryName] = useState("")
	const [tooltipCases, setTooltipCase] = useState("")
	const [tooltipVaccination, setTooltipVaccination] = useState("")
	const [tooltipVisible, setTooltipVisible] = useState(false)

	const mapWidth = mapDefaultWidth - left - right
	const mapHeight = mapDefaultWidth * mapRatio - top - bottom

	const handleMouseMoveOnMap = event => {
		// Get the x and y position of the pointer
		const { layerX, layerY } = event.nativeEvent

		// Get the actual height and width of the map
		const {
			offsetWidth,
			offsetHeight,
		} = mapContainerRef.current.querySelector(".map-ref")

		// use this to set the extra class of the tooltip to transform
		// it so that it doesnt run off the screen
		if (layerX >= offsetWidth / 2 && layerY >= offsetHeight / 2) {
			setTooltipAlign("right-bottom")
		} else if (layerX >= offsetWidth / 2) {
			setTooltipAlign("right-top")
		} else if (layerY >= offsetHeight / 2) {
			setTooltipAlign("left-bottom")
		} else {
			setTooltipAlign("left-top")
		}

		setTooltipX(layerX)
		setTooltipY(layerY)
	}

	const {
		casesColourScale,
		vaccinationColourScale,
		casesByYearClustered,
	} = buildColourScales({
		features,
		year,
		selectedRegion,
	})

	const mapProps = {
		casesByYearClustered,
		casesColourScale,
		contentWidth,
		handleMouseMoveOnMap,
		mapHeight,
		mapWidth,
		selectedCountry,
		selectedRegion,
		setSelectedCountry,
		setSelectedRegion,
		setTooltipCase,
		setTooltipCountryName,
		setTooltipVaccination,
		setTooltipVisible,
		showCases,
		tooltipCases,
		tooltipAlign,
		tooltipCountryName,
		tooltipVaccination,
		tooltipVisible,
		tooltipX,
		tooltipY,
		vaccinationColourScale,
		year,
	}

	return (
		<mapContext.Provider value={mapProps}>
			<StyledMapContainer ref={mapContainerRef}>
				<Map />
				<Key />
			</StyledMapContainer>
		</mapContext.Provider>
	)
}

export default MapContainer

MapContainer.propTypes = {
	contentWidth: PropTypes.number.isRequired,
	selectedCountry: PropTypes.string.isRequired,
	selectedRegion: PropTypes.string.isRequired,
	setSelectedCountry: PropTypes.func.isRequired,
	setSelectedRegion: PropTypes.func.isRequired,
	showCases: PropTypes.bool.isRequired,
	year: PropTypes.number.isRequired,
}
