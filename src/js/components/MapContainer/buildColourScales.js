import { scaleLinear, scaleThreshold } from "d3-scale"
import { ckmeans } from "simple-statistics"
import theme from "../../utils/theme"

/**
 *
 * TODO: Not sure why param is an object
 * @param {*} param0
 */
const buildScales = ({ features, year, selectedRegion }) => {
	const getCasesReducer = (acc, cur) => {
		// "Antarctica" has a null vlaue, so ignore
		if (!cur.properties.cases) return acc

		const caseValue = cur.properties.cases[year]

		if (typeof caseValue === "number") {
			acc.push(caseValue)
		}

		return acc
	}

	const casesByYear = features
		.filter(feature => {
			if (selectedRegion === "All") {
				return true
			}
			return feature.properties.region === selectedRegion
		})
		.reduce(getCasesReducer, [])

	// Remove duplicates to prevent erros with small amounts of values
	const casesByYearNoDuplicates = Array.from(new Set(casesByYear))

	const nClusters = Math.min(9, casesByYearNoDuplicates.length - 1)

	const casesByYearClustered = ckmeans(casesByYear, nClusters)

	const casesByYearClusteredMin = casesByYearClustered.map(cluster =>
		Math.min(...cluster)
	)

	const casesColourScale = scaleThreshold()
		.domain(casesByYearClusteredMin)
		.range(theme.casesColourRange)

	const vaccinationColourScale = scaleLinear()
		.domain([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
		.range(theme.vaccinationColourRange)
		.clamp(true)

	return {
		casesColourScale,
		vaccinationColourScale,
		casesByYearClustered,
	}
}

export default buildScales
