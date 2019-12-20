import { mean, sum } from "d3-array"

export const removeNameAndCode = obj => {
	const { name, code, ...rest } = obj
	return rest
}

const sumObjectArraysByYear = obj => {
	const newObj = {}

	Object.keys(obj).forEach(key => {
		newObj[key] = sum(obj[key])
	})

	return newObj
}

const averageObjectArraysByYear = obj => {
	const newObj = {}

	Object.keys(obj).forEach(key => {
		if (obj[key].length) {
			newObj[key] = Math.round(mean(obj[key]))
		} else {
			newObj[key] = "noData"
		}
	})

	return newObj
}

export const getSummedRegionCasesByYear = (features, filter) => {
	const regionCases = {}

	features.filter(feat => {
		if (filter === "All") {
			return true
		}
		return feat.properties.region === filter
	}).forEach(feat => {
		const { cases } = feat.properties

		if (cases) {
			const { name, code, ...casesRest } = cases

			Object.keys(casesRest).forEach(key => {
				if (regionCases[key] === undefined) {
					regionCases[key] = []
				}
				if (casesRest[key] !== "noData") {
					regionCases[key].push(
						parseInt(casesRest[key], 10)
					)
				}
			})
		}
	})

	return sumObjectArraysByYear(regionCases)
}

export const getAverageRegionVaccinationByYear = (features, filter) => {
	const regionVaccination = {}

	features.filter(feat => {
		if (filter === "All") {
			return true
		}
		return feat.properties.region === filter
	}).forEach(feat => {
		const { vaccination } = feat.properties

		if (vaccination) {
			const { name, code, ...vaccinationRest } = vaccination

			Object.keys(vaccinationRest).forEach(key => {
				if (regionVaccination[key] === undefined) {
					regionVaccination[key] = []
				}
				if (vaccinationRest[key] !== "noData") {
					regionVaccination[key].push(
						parseInt(
							vaccinationRest[key],
							10
						)
					)
				}
			})
		}
	})

	return averageObjectArraysByYear(regionVaccination)
}
