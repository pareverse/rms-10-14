import { Container, Grid, GridItem } from '@chakra-ui/react'
import Statistics from 'components/dashboard/statistics'
import Payments from 'components/dashboard/payments'
import Duedate from 'components/dashboard/duedate'
import Accounts from 'components/dashboard/accounts'

const Dashboard = () => {
	return (
		<Container>
			<Grid templateColumns="repeat(12, 1fr)" gap={6}>
				<GridItem colSpan={12}>
					<Statistics />
				</GridItem>

				<GridItem colSpan={12}>
					<Payments />
				</GridItem>

				<GridItem colSpan={{ base: 12, xl: 7 }}>
					<Duedate />
				</GridItem>

				<GridItem colSpan={{ base: 12, xl: 5 }}>
					<Accounts />
				</GridItem>
			</Grid>
		</Container>
	)
}

Dashboard.authentication = {
	authorized: 'Admin'
}

export default Dashboard
