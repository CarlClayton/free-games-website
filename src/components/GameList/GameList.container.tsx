import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'
import GameListRender from './GameList.render'
import { useFetchGames } from 'hooks/useFetch'
import { Filter } from './types'

const GameListContainer = (): ReactElement => {
	const [filter, setFilter] = useState<Filter>({
		category: undefined,
		platform: 'browser',
		sortBy: 'relevance',
		tag: undefined,
	})
	const { games, error } = useFetchGames(filter)
	const onFilterChange = useCallback((e: ChangeEvent<HTMLFormElement>) => {
		setFilter(current => ({ ...current, [e.target.name]: e.target.value }))
		e.preventDefault()
	}, [])

	return (
		<GameListRender err={error} games={games} onFilterChange={onFilterChange} />
	)
}

export default GameListContainer
