import React, { useContext } from "react"
import PropTypes from "prop-types"
import appContext from "../../appContext"
import mapContext from "../mapContext"
import useCountryFillPath from "../useCountryFillPath"
import useCountrStrokePath from "../useCountryStrokePath"
import useColumnHeaders from "../useColumnHeaders"

const DataTable = ({ pathFunction }) => {
	const { casesLegend, vaccinationLegend } = useContext(appContext)

	const { showCases, year } = useContext(mapContext)

	// Create the path elements
	const countryFillPath = useCountryFillPath(pathFunction)
	const countryStrokePath = useCountrStrokePath(pathFunction)

	// Create the column headers tspan elements
	const columnHeaders = useColumnHeaders()

	return (
		<g className="map__data-table" role="table">
			<g className="map__countries--fill" aria-hidden>
				{countryFillPath}
			</g>

			<text
				className="map__data-table__row--header"
				opacity="0"
				role="row"
			>
				<tspan role="columnheader">Country</tspan>
				{columnHeaders}
			</text>

			<g
				className="map__countries--stroke map__data-table__row"
				role="row"
			>
				<g role="rowheader">
					<path role="img">
						<title>
							{`${
								showCases
									? casesLegend
									: vaccinationLegend
							} ${year}`}
						</title>
					</path>
				</g>
				{countryStrokePath}
			</g>
		</g>
	)
}

DataTable.propTypes = {
	pathFunction: PropTypes.func.isRequired,
}

export default DataTable
