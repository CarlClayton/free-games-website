import styled from 'styled-components'
import { primaryTextColor, secondaryTextColor } from 'styles/theme'
import { breakpoints } from 'styles/breakpoints'

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${secondaryTextColor};
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 60%;
`

export const Title = styled.h1`
	margin: 0;
	font-size: 32px;
	font-weight: 700;
	color: ${primaryTextColor};
	@media (min-width: ${breakpoints.tablet}) {
		overflow: hidden;
		text-overflow: ellipsis;
	}
`
type StatusProps = {
	status: string
}

export const Thumbnail = styled.img`
	display: flex;
	width: 100%;
`

export const Status = styled.p<StatusProps>`
	color: ${props => props.status};
	font-weight: bold;
`

export const Tagline = styled.p`
	color: ${secondaryTextColor};
`

export const Top = styled.div`
	display: flex;
	div {
		margin: 0 20px;
	}
`

export const StyledList = styled.ul`
	columns: 2;
	column-gap: 1em;
`

export const StyledSpan = styled.span`
	font-weight: bold;
	color: ${primaryTextColor};
`
