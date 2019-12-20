import styled from "@emotion/styled"

const KeyStyled = styled.div`
	p {
		margin: ${props => props.theme.margin.below.s};
	}

	.svg-color-box {
		margin: ${props => props.theme.margin.right.xs};
	}
`

export default KeyStyled
