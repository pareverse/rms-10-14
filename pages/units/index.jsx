import { useState } from 'react'
import NextLink from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Badge, Box, Button, chakra, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiSearch, BiDotsHorizontalRounded } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import Card from 'components/card'

const Units = () => {
	const queryClient = useQueryClient()
	const { data } = useQuery(['units'], () => api.getAll('/units'), { enable: data !== undefined })
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		setError,
		reset,
		clearErrors,
		handleSubmit
	} = useForm()

	const addUnitMutation = useMutation((data) => api.post('/units', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('units')
			reset()
			setIsLoading(false)
			onClose()
		},
		onError: (error) => {
			setError('unit', { type: 'server', message: error.response.data })
			setIsLoading(false)
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		addUnitMutation.mutate(data)
	}

	return (
		<>
			<Container>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
							Units
						</Text>

						<Button colorScheme="brand" onClick={() => clearErrors() || onOpen()}>
							Add New
						</Button>
					</Flex>

					<Card>
						<Flex direction="column" gap={6}>
							<Flex justify="space-between" align="center" gap={6}>
								<Box>
									<InputGroup>
										<InputLeftElement pointerEvents="none" children={<BiSearch size={20} />} />
										<Input placeholder="Search Unit Number" size="lg" />
									</InputGroup>
								</Box>

								<Box>
									<Select size="lg">
										<option>Occupied</option>
										<option>Vacant</option>
									</Select>
								</Box>
							</Flex>

							<TableContainer>
								<Table>
									<Thead>
										<Tr>
											<Th textAlign="left">Company</Th>
											<Th textAlign="left">Unit</Th>
											<Th textAlign="left">Type</Th>
											<Th textAlign="left">Rent</Th>
											<Th textAlign="left">Start Date</Th>
											<Th textAlign="left">Due Date</Th>
											<Th textAlign="left">Status</Th>
											<Th textAlign="right"></Th>
										</Tr>
									</Thead>

									<Tbody>
										{data &&
											data.map((data) => (
												<Tr key={data._id}>
													<Td textAlign="left" w={256} maxW={256}>
														{data.companyId ? (
															<Flex align="center" gap={3}>
																<Avatar name="Company 1" />

																<Text color="accent-1" overflow="hidden" textOverflow="ellipsis">
																	Company Name
																</Text>
															</Flex>
														) : (
															<Skeleton h={2} w={200} />
														)}
													</Td>

													<Td textAlign="left">
														<Badge>{data.unit_number}</Badge>
													</Td>

													<Td textAlign="left">
														<Badge textTransform="capitalize">{data.unit_type}</Badge>
													</Td>

													<Td textAlign="left">₱{Number(data.monthly_rent).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Td>

													<Td textAlign="left">
														<Text>{data.start_date ? data.start_date : '-'}</Text>
													</Td>

													<Td textAlign="left">
														<Text>{data.due_date ? data.due_date : '-'}</Text>
													</Td>

													<Td textAlign="left">
														<Badge variant="tinted" colorScheme={data.unit_status ? 'blue' : 'red'}>
															{data.unit_status ? 'Occupied' : 'Vacant'}
														</Badge>
													</Td>

													<Td textAlign="right">
														<NextLink href={`/units/${data._id}`} passHref>
															<IconButton as="a" size="xs" icon={<BiDotsHorizontalRounded size={16} />} />
														</NextLink>
													</Td>
												</Tr>
											))}
									</Tbody>
								</Table>
							</TableContainer>

							<Flex justify="space-between" align="center" gap={6}>
								<Box>
									<Select size="sm">
										<option>10</option>
										<option>25</option>
										<option>50</option>
									</Select>
								</Box>

								<Flex gap={3}>
									<IconButton size="sm" icon={<BiChevronLeft size={20} />} />
									<IconButton size="sm" icon={<BiChevronRight size={20} />} />
								</Flex>
							</Flex>
						</Flex>
					</Card>
				</Flex>
			</Container>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Create Unit</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.unit_number}>
									<FormLabel>
										Unit Number <chakra.span color="red.default">*</chakra.span>
									</FormLabel>
									<Input size="lg" {...register('unit_number', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.unit_type}>
									<FormLabel>
										Unit Type <chakra.span color="red.default">*</chakra.span>
									</FormLabel>

									<Select size="lg" {...register('unit_type', { required: true })}>
										<option value="single">Single</option>
										<option value="attached">Attached</option>
									</Select>

									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.monthly_rent}>
									<FormLabel>
										Monthly Rent <chakra.span color="red.default">*</chakra.span>
									</FormLabel>
									<Input size="lg" {...register('monthly_rent', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" colorScheme="brand" isLoading={isLoading}>
								Submit
							</Button>

							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

Units.authentication = {
	authorized: 'Admin'
}

export default Units
