import { Button, Divider, Flex, Text } from '@chakra-ui/react'
import Card from 'components/card'
import Schedule from './schedule'
import Monthly from './monthly'
import Camc from './camc'
import Vat from './vat'
import WaterBill from './water-bill'
import Maintenance from './maintenance'

const Overview = ({ id, data }) => {
	return (
		<>
			<Card>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="xl" fontWeight="semibold" color="accent-1">
							Overview
						</Text>

						<Button colorScheme="brand">Publish</Button>
					</Flex>

					<Divider />

					<Schedule id={id} data={data} />

					{data.start_date && data.due_date && (
						<>
							<Monthly id={id} data={data} />
							<Camc id={id} data={data} />
							<Vat id={id} data={data} />
							<WaterBill id={id} data={data} />
						</>
					)}

					{/* 
					
					
					
					<Maintenance id={id} data={data} /> */}
				</Flex>
			</Card>
		</>
	)
}

export default Overview
