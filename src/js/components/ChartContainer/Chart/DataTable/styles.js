import styled from "@emotion/styled"

const StyledDataTable = styled.g`
	circle {
		stroke: ${props => props.theme.color.border};
		cursor: pointer;
		stroke-width: 0;

		&:hover {
			stroke-width: 2px;
		}
	}
`

export default StyledDataTable
