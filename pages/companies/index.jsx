import NextLink from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarGroup, Badge, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiSearch, BiDotsHorizontalRounded } from 'react-icons/bi'
import Card from 'components/card'

const Companies = () => {
	const queryClient = useQueryClient()
	const { data } = useQuery(['companies'], () => api.getAll('/companies'), { enable: data !== undefined })

	const { isOpen, onOpen, onClose } = useDisclosure()

	const {
		register,
		formState: { errors },
		reset,
		clearErrors,
		handleSubmit
	} = useForm()

	const addCompanyMutation = useMutation((data) => api.post('/companies', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('companies')
			reset()
			onClose()
		}
	})

	const onSubmit = (data) => {
		addCompanyMutation.mutate(data)
	}

	return (
		<>
			<Container>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
							Companies
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
										<Input placeholder="Search Company" size="lg" />
									</InputGroup>
								</Box>

								<Box>
									<Select size="lg">
										<option></option>
										<option></option>
									</Select>
								</Box>
							</Flex>

							<TableContainer>
								<Table>
									<Thead>
										<Tr>
											<Th textAlign="left">Company Name</Th>
											<Th textAlign="left">Tenants</Th>
											<Th textAlign="center">Unit Assigned</Th>
											<Th textAlign="center">SOA</Th>
											<Th textAlign="center">Status</Th>
											<Th textAlign="center">Created</Th>
											<Th textAlign="right"></Th>
										</Tr>
									</Thead>

									<Tbody>
										{data &&
											data.map((data, index) => (
												<Tr key={data._id}>
													<Td textAlign="left" w={256} maxW={256}>
														<Flex align="center" gap={3}>
															<Avatar name={data.name} />

															<Text color="accent-1" overflow="hidden" textOverflow="ellipsis">
																{data.name}
															</Text>
														</Flex>
													</Td>

													<Td textAlign="left">
														<AvatarGroup>
															<Avatar name="Tenant 1" />
															<Avatar name="Tenant 2" />
															<Avatar name="Tenant 3" />
														</AvatarGroup>
													</Td>

													<Td textAlign="center">
														<Badge textTransform="capitalize">110</Badge>
													</Td>

													<Td textAlign="center">.</Td>

													<Td textAlign="center">.</Td>

													<Td textAlign="center">{data.created.split(',')[0]}</Td>

													<Td textAlign="right">
														<NextLink href={`/companies/${data._id}`} passHref>
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
						<ModalHeader>Create Company</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.name}>
									<FormLabel>Name</FormLabel>
									<Input size="lg" {...register('name', { required: 'This field is required.' })} />
									<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter>
							<Flex gap={3}>
								<Button type="submit" size="lg" colorScheme="brand">
									Submit
								</Button>

								<Button size="lg" onClick={() => reset() || onClose()}>
									Close
								</Button>
							</Flex>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

Companies.authentication = {
	authorized: 'Admin'
}

export default Companies
