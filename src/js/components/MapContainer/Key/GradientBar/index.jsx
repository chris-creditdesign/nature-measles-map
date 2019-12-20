import React, { useContext } from "react"
import { extent } from "d3-array"
import appContext from "../../../appContext"
import mapContext from "../../mapContext"
import SVGColorBox from "../shared/SVGColorBox"
import StyledGradientBar from "./styles"

const MapKeyGradientBar = () => {
	const { formatPercent, mapKeyHeight, mapMargin, uiColour } = useContext(
		appContext
	)

	const { left, right } = mapMargin

	const { contentWidth, vaccinationColourScale } = useContext(mapContext)

	const scale = vaccinationColourScale
	const formatFunc = formatPercent

	const mapKeyWidth = contentWidth - left - right

	const { borderColour, noDataPattern } = uiColour

	const stops = scale
		.ticks()
		.map((tick, i) => (
			<stop
				key={tick}
				stopColor={scale(tick)}
				offset={`${i * 10}%`}
			/>
		))

	const [scaleStart, scaleEnd] = extent(scale.domain())

	return (
		<StyledGradientBar>
			<svg
				className="svg-gradient-bar"
				width={mapKeyWidth}
				height={mapKeyHeight + 10}
				viewBox={`0 0 ${mapKeyWidth} ${mapKeyHeight +
					10}`}
				focusable="false"
			>
				<defs>
					<linearGradient id="map-gradient">
						{stops}
					</linearGradient>
				</defs>
				<rect
					x="0px"
					y="0px"
					width={`${mapKeyWidth}px`}
					height={`${mapKeyHeight}px`}
					fill="url(#map-gradient)"
				/>
				<line
					x1="0.5px"
					y1={`${mapKeyHeight}px`}
					x2="0.5px"
					y2={`${mapKeyHeight + 10}px`}
					strokeWidth="1px"
					stroke={borderColour}
				/>
				<line
					x1={`${mapKeyWidth - 0.5}px`}
					y1={`${mapKeyHeight}px`}
					x2={`${mapKeyWidth - 0.5}px`}
					y2={`${mapKeyHeight + 10}px`}
					strokeWidth="1px"
					stroke={borderColour}
				/>
			</svg>

			<p className="paragraph-flex">
				<span>{formatFunc(scaleStart)}</span>
				<span>{formatFunc(scaleEnd)}</span>
			</p>

			<p>
				<SVGColorBox fill={noDataPattern} />
				{"No data"}
			</p>
		</StyledGradientBar>
	)
}

export default MapKeyGradientBar
