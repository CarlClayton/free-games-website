import React, { ChangeEvent, ReactElement } from 'react'
import { Game } from 'types'
import GameCard from '../GameCard'
import GameFilter from '../GameFilter'
import { List, ListItem } from './styles'

type Props = {
	err?: Error | null
	games: Game[]
	onFilterChange: (e: ChangeEvent<HTMLFormElement>) => void
}

const GameList = ({ err, games, onFilterChange }: Props): ReactElement => {
	if (err) {
		return <p>Unable to fetch games</p>
	}
	if (!games?.length) {
		return <p>No games available</p>
	}

	return (
		<>
			<GameFilter onChange={onFilterChange} />
			<List>
				{games.map(game => (
					<ListItem key={game.id}>
						<GameCard content={game} />
					</ListItem>
				))}
			</List>
		</>
	)
}

export default GameList
