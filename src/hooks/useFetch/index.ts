import { useEffect, useState } from 'react'
import { Filter } from 'components/GameList/types'
import axios from 'axios'
import { Game } from 'types'

type ListResponse = {
	games: Game[]
	error?: Error | null
}

type Response = {
	data: any
	error: Error | null
	isLoading: boolean
}

const baseURL = `https://${process.env.REACT_APP_API_HOST}/api`
const headers = {
	'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
	'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
}

export const useFetchGames = (params: Filter): ListResponse => {
	const [games, setGames] = useState<Game[]>([])
	const [err, setErr] = useState<Error | null>()
	const { platform, category, tag, sortBy } = params

	useEffect(() => {
		axios
			.get('/games', {
				baseURL,
				headers,
				params: {
					platform,
					category,
					tag,
					'sort-by': sortBy,
				},
			})
			.then(res => setGames(res.data))
			.catch(e => setErr(e.message))
	}, [platform, category, tag, sortBy])

	return {
		games,
		error: err,
	}
}

export const useFetchGame = (id?: string): Response => {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		async function fetchGame() {
			try {
				const response = await axios.get('/game', {
					baseURL,
					headers,
					params: {
						id,
					},
				})
				setData(response.data)
			} catch (err: any) {
				setError(err)
			}
		}
		fetchGame()
		setIsLoading(false)
	}, [])
	return { data, error, isLoading }
}
