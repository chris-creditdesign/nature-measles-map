import styled from "@emotion/styled"

const StyledSelectedDataTextBox = styled.div`
	position: relative;
	margin: ${props => props.theme.margin.below.l};

	dl {
		margin: 0;
	}

	dt,
	dd {
		display: inline-block;
	}

	dt {
		margin: ${props => props.theme.margin.right.s};

		&:after {
			content: ":";
		}
	}

	dd {
		font-weight: ${props => props.theme.fontWeight.bold};
		margin: 0;
	}
`

export default StyledSelectedDataTextBox
