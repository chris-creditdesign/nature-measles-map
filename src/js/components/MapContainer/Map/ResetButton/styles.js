/* eslint-disable indent */
import styled from "@emotion/styled"

const StyledResetButton = styled.button`
	position: absolute;
	cursor: pointer;
	background-color: ${props => props.theme.backgroundColor.dark};
	border: none;
	padding: ${props => props.theme.padding.allAround.s};
	transition: background-color 0.1s;

	path {
		fill: ${props => props.theme.textColor.onDark};
	}

	&:hover {
		background-color: ${props =>
			props.theme.backgroundColor.midDark};
	}
`

export default StyledResetButton
