import styled from "@emotion/styled"

const StyledMapContainer = styled.div`
	position: relative;
	margin: ${props => props.theme.margin.below.l};

	.bold {
		font-weight: ${props => props.theme.fontWeight.bold};
	}
`

export default StyledMapContainer
