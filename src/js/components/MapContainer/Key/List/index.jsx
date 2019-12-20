import React, { useContext } from "react"
import appContext from "../../../appContext"
import mapContext from "../../mapContext"
import SVGColorBox from "../shared/SVGColorBox"
import StyledList from "./styles"

const MapKeyList = () => {
	const { format, uiColour } = useContext(appContext)

	const { casesColourScale, casesByYearClustered } = useContext(
		mapContext
	)

	const scale = casesColourScale

	const casesKeyText = casesByYearClustered.map((cluster, i) => {
		const min = Math.min(...cluster)
		const max = Math.max(...cluster)
		// Round display values to nearest 1000
		// const minRound = Math.round(min / 1000) * 1000
		const minRound = min
		// const maxRound = Math.round(max / 1000) * 1000
		const maxRound = max
		const count = cluster.length

		if (min === max) {
			let countriesText = ""
			if (i === 0) {
				countriesText = " countries"
			}

			if (i === 0 && count === 1) {
				countriesText = " country"
			}

			return `${format(minRound)} (${count}${countriesText})`
		}

		return `${format(minRound)} – ${format(maxRound)} (${count}${
			i === 0 ? " countries" : ""
		})`
	})

	const { noDataPattern } = uiColour

	const listItems = scale.domain().map((d, i) => (
		<li key={d}>
			<SVGColorBox fill={scale(d)} />
			{casesKeyText[i]}
		</li>
	))

	return (
		<StyledList>
			{listItems}
			<li className="nature-graphic__map-container__key__list__item">
				<SVGColorBox fill={noDataPattern} />
				{"No data"}
			</li>
		</StyledList>
	)
}

export default MapKeyList
