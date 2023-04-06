import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchGame } from 'hooks/useFetch'
import {
	Container,
	Content,
	Title,
	Thumbnail,
	Status,
	Tagline,
	Top,
	StyledList,
	StyledSpan,
} from './styles'
import { Description, StyledLink } from 'components/GameCard/styles'

const sysReqs: { [key: string]: string } = {
	os: 'OS',
	processor: 'Processor',
	memory: 'Memory',
	graphics: 'Graphics',
	storage: 'Storage',
}

const addInfo: { [key: string]: string } = {
	genre: 'Genre',
	platform: 'Platform',
	publisher: 'Publisher',
	developer: 'Developer',
	release_date: 'Release Date',
}

const Game = (): ReactElement | null => {
	const { id } = useParams()
	const { data, error, isLoading } = useFetchGame(id)

	if (isLoading) {
		return <div>...Loading</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}
	if (!isLoading && data) {
		const { minimum_system_requirements } = data
		return (
			<Container>
				<Content>
					<Top>
						<div>
							<Thumbnail
								src={data.thumbnail}
								alt={`${data.title}-thumbnail-image`}
							/>
						</div>
						<div>
							<Title>{data.title}</Title>
							<Tagline>{data.short_description}</Tagline>
							<Status status={data.status === 'Live' ? 'green' : 'grey'}>
								{data.status}
							</Status>
							<StyledLink to={data.game_url}>Play Now</StyledLink>
						</div>
					</Top>
					<Description>{data.description}</Description>
					<StyledLink to={data.freetogame_profile_url}>Game Profile</StyledLink>
					<h3>Additional Information</h3>
					<StyledList>
						{Object.keys(data).map(key => {
							if (Object.keys(addInfo).includes(key)) {
								return (
									<li key={key}>
										<StyledSpan>{addInfo[key]}:</StyledSpan> {data[key]}
									</li>
								)
							}
							return
						})}
					</StyledList>
					{minimum_system_requirements && (
						<>
							<h3>Minimum System Requirements</h3>
							<StyledList>
								{Object.keys(minimum_system_requirements).map(key => (
									<li key={key}>
										<StyledSpan>{sysReqs[key]}:</StyledSpan>{' '}
										{minimum_system_requirements[key]}
									</li>
								))}
							</StyledList>
						</>
					)}
					{data.screenshots.length > 0 && (
						<>
							<h3>{data.title} screenshots:</h3>
							{data.screenshots.map(
								(screenshot: { id: string; image: string }, index: number) => (
									<img
										src={screenshot.image}
										alt={`screenshot-${index}`}
										key={index}
									/>
								)
							)}
						</>
					)}
				</Content>
			</Container>
		)
	}
	return null
}

export default Game
