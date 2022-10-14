import { Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { FiCheckSquare, FiDollarSign, FiGrid, FiUsers } from 'react-icons/fi'
import Card from 'components/card'

const Statistics = () => {
	return (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6}>
			<Card>
				<Flex gap={6}>
					<Flex flex={1}>
						<Flex direction="column" gap={2}>
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
								25
							</Text>

							<Text fontSize="sm" color="accent-3" fontWeight="medium">
								Vacant Units
							</Text>
						</Flex>
					</Flex>

					<Flex>
						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={14} w={14}>
							<Icon as={FiCheckSquare} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Flex>
			</Card>

			<Card>
				<Flex gap={6}>
					<Flex flex={1}>
						<Flex direction="column" gap={2}>
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
								25
							</Text>

							<Text fontSize="sm" color="accent-3" fontWeight="medium">
								Total Units
							</Text>
						</Flex>
					</Flex>

					<Flex>
						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={14} w={14}>
							<Icon as={FiGrid} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Flex>
			</Card>

			<Card>
				<Flex gap={6}>
					<Flex flex={1}>
						<Flex direction="column" gap={2}>
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
								50
							</Text>

							<Text fontSize="sm" color="accent-3" fontWeight="medium">
								Total Tenants
							</Text>
						</Flex>
					</Flex>

					<Flex>
						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={14} w={14}>
							<Icon as={FiUsers} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Flex>
			</Card>

			<Card>
				<Flex gap={6}>
					<Flex flex={1}>
						<Flex direction="column" gap={2}>
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
								₱500,000
							</Text>

							<Text fontSize="sm" color="accent-3" fontWeight="medium">
								Total Collected
							</Text>
						</Flex>
					</Flex>

					<Flex>
						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={14} w={14}>
							<Icon as={FiDollarSign} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</SimpleGrid>
	)
}

export default Statistics
