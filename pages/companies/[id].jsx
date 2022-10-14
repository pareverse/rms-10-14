import { useRouter } from 'next/router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Container, Grid, GridItem } from '@chakra-ui/react'
import Loading from 'components/loading'

const Company = () => {
	const router = useRouter()
	const { id } = router.query

	const queryClient = useQueryClient()
	const { data, isLoading } = useQuery(['company'], () => api.get(`/companies/${id}`), { enable: data !== undefined })
	console.log(data)

	if ((data && data._id !== id) || isLoading) return <Loading />

	return (
		<Container>
			<Grid>
				<GridItem></GridItem>
			</Grid>
		</Container>
	)
}

Company.authentication = {
	authorized: 'Admin'
}

export default Company
