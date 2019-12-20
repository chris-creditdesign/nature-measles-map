import styled from "@emotion/styled"

const StyledList = styled.ol`
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-auto-rows: 1.8rem;
`

export default StyledList
