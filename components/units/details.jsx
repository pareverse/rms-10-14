import { Divider, Flex, IconButton, Text } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import Card from 'components/card'

const Details = ({ data }) => {
	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Details
					</Text>

					<IconButton size="xs" icon={<BiPencil size={16} />} />
				</Flex>

				<Divider />

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Unit Number
					</Text>

					<Text fontSize="sm">{data.unit_type}</Text>
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Unit Type
					</Text>

					<Text fontSize="sm">{data.unit_type}</Text>
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Monthly Rent
					</Text>

					<Text fontSize="sm">₱{Number(data.monthly_rent).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Created
					</Text>

					<Text fontSize="sm">{data.created.split(',')[0]}</Text>
				</Flex>
			</Flex>
		</Card>
	)
}

export default Details
