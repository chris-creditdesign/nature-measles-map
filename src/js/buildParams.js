import { format } from "d3-format"

/* eslint-disable max-len */
const buildParams = () => {
	const params = {}

	/*	Map  */
	params.mapMargin = {
		top: 0,
		right: 20,
		bottom: 0,
		left: 20,
	}
	params.mapRatio = 0.4
	params.mapDefaultWidth = 800

	params.uiColour = {
		veryLightGrey: "#ddd",
		lightGrey: "#999",
		grey: "#666",
		darkGrey: "#333",
		noData: "#ccc",
		noDataPattern: "url(#no-data-pattern)",
		lineColour: "#cb181d",
		vaccinationLineColour: "#238b45",
		mapBackgroundColour: "#65A6D3",
		borderColour: "#666",
	}

	/*	Chart margins */
	params.chartHeight = 180

	params.chartMargin = {
		top: 0,
		right: 20,
		bottom: 0,
		left: 20,
	}
	params.chartInnerMargin = {
		top: 10,
		right: 10,
		bottom: 40,
		left: 130,
	}

	params.yearMin = 1980
	params.yearMax = 2019

	params.format = format(",")
	params.formatPercent = str => `${str}%`

	params.casesChartColour = "#cb181d"

	params.vaccinationChartColour = "#41ab5d"

	params.smallTickStyle = {
		stroke: "#000000",
		strokeWidth: "1px",
		shapeRendering: "crispEdges",
		strokeDashArray: "none",
	}

	params.dottedTickStyle = {
		stroke: "#000000",
		strokeWidth: "1px",
		shapeRendering: "crispEdges",
		strokeDasharray: "2, 3",
	}

	params.baselineStyle = {
		stroke: "#000000",
		strokeWidth: "3px",
		shapeRendering: "crispEdges",
		strokeDasharray: "none",
	}

	params.xAxisTextStyle = {
		textAnchor: "middle",
	}

	params.yAxisTextStyle = {
		textAnchor: "end",
	}

	params.yAxisLegendTextStyle = {
		dy: "1.3em",
		textAnchor: "middle",
	}

	params.yAxisTickCount = 5

	params.chartLineStyle = {
		fill: "none",
		strokeWidth: "2px",
	}

	params.chartDotRadius = 3

	params.selectedYearLineStyle = {
		stroke: params.uiColour.lightGrey,
		strokeWidth: "2px",
		shapeRendering: "crispEdges",
		strokeDasharray: "none",
	}

	params.casesLegend = "Cases of measles"
	params.vaccinationLegend = "Vaccination rate"

	params.mapKeyHeight = 20

	return params
}

export default buildParams
