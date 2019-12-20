import React, { useContext } from "react"

import DataTable from "../DataTable"
import usePathFunction from "../usePathFunction"
import appContext from "../../appContext"
import mapContext from "../mapContext"
import Tooltip from "./Tooltip"
import ResetButton from "./ResetButton"
import NoDataPattern from "./NoDataPattern/index"
import StyledMap from "./styles"

const Map = () => {
	const { borders, uiColour } = useContext(appContext)

	const { handleMouseMoveOnMap, mapHeight, mapWidth } = useContext(
		mapContext
	)

	// Generate the path function
	const pathFunction = usePathFunction()

	// Create the path elements
	const bordersPath = pathFunction(borders)

	return (
		<StyledMap className="map-ref">
			<Tooltip />
			<ResetButton />

			<svg
				width="100%"
				height="100%"
				viewBox={`0 0 ${mapWidth} ${mapHeight}`}
				focusable="false"
				onMouseMoveCapture={handleMouseMoveOnMap}
			>
				<defs>
					<clipPath id="clip">
						<rect
							x="0px"
							y="0px"
							width={`${mapWidth}px`}
							height={`${mapHeight}px`}
						/>
					</clipPath>
				</defs>
				<NoDataPattern />

				<rect
					className="background"
					x="0px"
					y="0px"
					width={`${mapWidth}px`}
					height={`${mapHeight}px`}
					fill={uiColour.mapBackgroundColour}
					aria-hidden
				/>

				<g
					className="map__clip-group"
					clipPath="url(#clip)"
				>
					<DataTable
						pathFunction={pathFunction}
					/>

					<g className="map__borders" aria-hidden>
						<path
							d={bordersPath}
							fill="none"
							stroke={
								uiColour.borderColour
							}
							strokeWidth="0.1px"
						/>
					</g>
				</g>
			</svg>
		</StyledMap>
	)
}

export default Map
