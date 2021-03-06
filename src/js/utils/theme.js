const colors = {
	black: "#121212",
	grey: "#3a3a3a",
	midGrey: "#888888",
	lightGrey: "#e1e1e1",
	offWhite: "#ededed",
	white: "#ffffff",
	cream: "#F6F5EE",
}

const space = ["0", "0.4rem", "0.6rem", "1.2rem"]

const theme = {
	color: {
		border: colors.grey,
		noData: colors.midGrey,
		noDataPattern: "url(#no-data-pattern)",
	},
	backgroundColor: {
		chart: colors.white,
		extraLight: colors.offWhite,
		light: colors.lightGrey,
		midDark: colors.midGrey,
		dark: colors.grey,
	},
	textColor: {
		normal: colors.black,
		light: colors.midGrey,
		onDark: colors.white,
	},
	fontWeight: {
		normal: "400",
		bold: "600",
	},
	fontSize: {
		s: "0.8rem",
		normal: "1rem",
		l: "1.2rem",
		xl: "1.6rem",
	},
	border: `1px solid ${colors.grey}`,
	buttonPadding: "5px 10px 5px 30px",
	borderRadius: "5px",
	space: {
		none: space[0],
		s: space[1],
		l: space[2],
		xl: space[3],
	},
	margin: {
		below: {
			xs: `0 0 ${space[1]} 0`,
			s: `0 0 ${space[2]} 0`,
			l: `0 0 ${space[3]} 0`,
		},
		right: {
			xs: `0 ${space[1]} 0 0`,
			s: `0 ${space[2]} 0 0`,
			l: `0 ${space[3]} 0 0`,
		},
	},
	padding: {
		allAround: {
			xs: `${space[1]}`,
			s: `${space[2]}`,
			l: `${space[3]}`,
		},
		moreTopThanSide: {
			s: `${space[2]} ${space[1]}`,
			l: `${space[3]} ${space[2]}`,
		},
		moreSideThanTop: {
			s: `${space[1]} ${space[2]}`,
			l: `${space[2]} ${space[3]}`,
		},
	},
	casesColourRange: [
		"#fff5f0",
		"#fee0d2",
		"#fcbba1",
		"#fc9272",
		"#fb6a4a",
		"#ef3b2c",
		"#cb181d",
		"#a50f15",
		"#67000d",
		"#000000",
	],
	vaccinationColourRange: [
		"#ffffff",
		"#f7fcf5",
		"#e5f5e0",
		"#c7e9c0",
		"#a1d99b",
		"#74c476",
		"#41ab5d",
		"#238b45",
		"#006d2c",
		"#00441b",
	],
}

export default theme
