import { useEffect, useState } from 'react'
import { Filter } from 'components/GameList/types'
import { Game } from 'types'
import axios from 'axios'

type Response = {
	games: Game[]
	error?: string
}

const useFetch = (params: Filter): Response => {
	const [games, setGames] = useState<Game[]>([])
	const [err, setErr] = useState<string>('')
	const { platform, genre, tag, sortBy } = params

	useEffect(() => {
		axios
			.get('/games', {
				baseURL: `https://${process.env.REACT_APP_API_HOST}/api`,
				headers: {
					'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
					'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
				},
				params: {
					platform,
					category: genre,
					tag,
					'sort-by': sortBy,
				},
			})
			.then(res => setGames(res.data))
			.catch(e => setErr(e.message))
	}, [platform, genre, tag, sortBy])

	return {
		games,
		error: err,
	}
}

export default useFetch
