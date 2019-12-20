import styled from "@emotion/styled"

const StyledTooltip = styled.div`
	position: absolute;
	pointer-events: none;
	min-width: max-content;
	display: inline-block;
	background-color: ${props => props.theme.backgroundColor.dark};
	color: ${props => props.theme.textColor.onDark};
	font-size: ${props => props.theme.fontSize.s};
	padding: ${props => props.theme.padding.moreSideThanTop.s};
	transform: ${props => {
		const transform = {
			"right-bottom": "translate(-100%, -100%)",
			"right-top": "translate(-100%, 0)",
			"left-bottom": "translate(0, -100%)",
			"left-top": "translate(0, 0)",
		}

		if (!props.tooltipAlign) return "translate(0, 0)"

		return transform[props.tooltipAlign]
	}};

	p {
		margin: 0;
		line-height: 1.2rem;
	}
`

export default StyledTooltip
