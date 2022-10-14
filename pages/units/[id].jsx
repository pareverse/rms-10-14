import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Company from 'components/units/company'
import Details from 'components/units/details'
import Overview from 'components/units/overview'

const Unit = () => {
	const router = useRouter()
	const { id } = router.query
	const { data, isLoading } = useQuery(['unit'], () => api.get(`/units/${id}`), { enable: data !== undefined })

	if (isLoading) return null

	return (
		<Container>
			<Grid templateColumns="300px 1fr" alignItems="start" gap={6}>
				<GridItem display="grid" gap={6}>
					<Company data={data} />
					<Details data={data} />
				</GridItem>

				<GridItem>
					<Tabs>
						<TabList>
							<Tab>Overview</Tab>
							<Tab>History</Tab>
							<Tab>Settings</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<Overview id={id} data={data} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</GridItem>
			</Grid>
		</Container>
	)
}

Unit.authentication = {
	authorized: 'Admin'
}

export default Unit
