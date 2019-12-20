import React, { useEffect, useState } from "react"
import { ThemeProvider } from "emotion-theming"
import theme from "../utils/theme"
import appContext from "./appContext"
import MapContainer from "./MapContainer"
import ChartContainer from "./ChartContainer/index"
import SelectedDataTextBox from "./SelectedDataTextBox/index"
import FormContainer from "./FormContainer/index"

const App = props => {
	/**
	 * Set state for:
	 * year: current selected year
	 * showCases: It true display cases, else display vaccination
	 * selectedCountry: current selected country code
	 * selectedRegion: current selected region code
	 * contentWidth: current width of the page
	 * */
	const [year, setYear] = useState(1980)
	const [showCases, setShowCases] = useState(true)
	const [selectedCountry, setSelectedCountry] = useState("All")
	const [selectedRegion, setSelectedRegion] = useState("All")
	const [contentWidth, setContentWidth] = useState(
		document.body.offsetWidth
	)

	// Update the width of the charts based on the width of the page.
	useEffect(() => {
		const handleResize = () =>
			setContentWidth(document.body.offsetWidth)

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [contentWidth])

	return (
		<ThemeProvider theme={theme}>
			<appContext.Provider value={props}>
				<SelectedDataTextBox
					selectedCountry={selectedCountry}
					selectedRegion={selectedRegion}
					year={year}
				/>

				<FormContainer
					selectedCountry={selectedCountry}
					selectedRegion={selectedRegion}
					setSelectedCountry={setSelectedCountry}
					setSelectedRegion={setSelectedRegion}
					setShowCases={setShowCases}
					setYear={setYear}
					showCases={showCases}
					year={year}
				/>

				<MapContainer
					contentWidth={contentWidth}
					selectedCountry={selectedCountry}
					selectedRegion={selectedRegion}
					setSelectedCountry={setSelectedCountry}
					setSelectedRegion={setSelectedRegion}
					showCases={showCases}
					year={year}
				/>

				<ChartContainer
					setYear={setYear}
					year={year}
					contentWidth={contentWidth}
					selectedCountry={selectedCountry}
					selectedRegion={selectedRegion}
				/>
			</appContext.Provider>
		</ThemeProvider>
	)
}

export default App
