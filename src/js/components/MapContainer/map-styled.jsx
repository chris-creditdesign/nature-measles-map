import styled from "@emotion/styled"

const StyledCountryStrokePath = styled.path`
	fill-opacity: 0;
	stroke: #555;
	stroke-width: ${props => (props.selected ? "1px" : 0)};
	cursor: pointer;

	&:hover {
		stroke-width: 1px;
	}
`

export default StyledCountryStrokePath
