import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Card from 'components/card'

const Company = ({ data }) => {
	return (
		<Card>
			<Flex justify="center" align="center" p={6}>
				<Avatar size="xl" />
			</Flex>

			<Box textAlign="center">
				<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
					Company Name
				</Text>

				<Text fontSize="sm" noOfLines={1}>
					company@gmail.com
				</Text>
			</Box>
		</Card>
	)
}

export default Company
