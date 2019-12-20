import { feature, mesh } from "topojson"
import worldData from "../data/countries-topo-reduced"
import simplifiedData from "../data/simplified-topo"
import {
	getSummedRegionCasesByYear,
	getAverageRegionVaccinationByYear,
} from "./helpers"

const formatData = () => {
	/**
	 * FEATURES
	 * An array of topojson features. Each an object containing:
	 * {
	 * 	geometry: {}
	 * 	properties: {cases, code, name, region, vaccination }
	 * 	type: "Feature"
	 * }
	 * */
	const { features } = feature(worldData, worldData.objects.countries)

	// Sort features by name alphabetically
	features.sort((a, b) => {
		const aName = a.properties.name
		const bName = b.properties.name
		return aName.localeCompare(bName, "en", { sensitivity: "base" })
	})

	/**
	 * REGIONS
	 * An array of objects, one for each region of the world with countries
	 * containing data. Casses are summed by year and vaccinations are averaged
	 * by year. Each object containing:
	 * {
	 * 	properties: {cases, code, name, region, vaccination }
	 * }
	 * */
	const regionNames = Array.from(
		new Set(features.map(d => d.properties.region))
	).sort()

	regionNames.unshift("All")

	// Remove the regions that don't have any relevant countries
	if (regionNames.includes("Antarctica")) {
		regionNames.splice(regionNames.indexOf("Antarctica"), 1)
	}
	if (regionNames.includes("Seven seas (open ocean)")) {
		regionNames.splice(
			regionNames.indexOf("Seven seas (open ocean)"),
			1
		)
	}

	const regions = regionNames.map(regionName => {
		const regionObject = {}

		const cases = getSummedRegionCasesByYear(features, regionName)
		const vaccination = getAverageRegionVaccinationByYear(
			features,
			regionName
		)

		regionObject.properties = {
			cases,
			code: regionName,
			name: regionName,
			region: regionName,
			vaccination,
		}

		return regionObject
	})

	// Add a placeholder country to represent no selection
	// Do this after the regions have been defined to prevent
	// adding a duplicate 'All'
	features.unshift({
		properties: {
			cases: {},
			code: "All",
			name: "All",
			region: "All",
			vaccination: {},
		},
	})

	/**
	 * BORDERS
	 * Single topojson object, just used to draw the borders between countries.
	 * Third argument is filter function to eliminate overlapping borders.
	 */
	const borders = mesh(
		worldData,
		worldData.objects.countries,
		(a, b) => a !== b
	)

	/**
	 * SIMPLE FEATURES
	 * An array of simplified topojson features. Each an object containing:
	 * Just used to zoom the map.
	 * {
	 * 	geometry: {}
	 * 	properties: {altcode, code, name, region }
	 * 	type: "Feature"
	 * }
	 * */
	const { features: simpleFeatures } = feature(
		simplifiedData,
		simplifiedData.objects.simplified
	)

	return {
		simpleFeatures,
		features,
		regions,
		borders,
	}
}

export default formatData
