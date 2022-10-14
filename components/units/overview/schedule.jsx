import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Box, Button, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const Schedule = ({ id, data }) => {
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const EditUnitMutation = useMutation((data) => api.patch(`/units/${id}`, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('unit')
			setIsLoading(false)
			onClose()
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		EditUnitMutation.mutate(data)
	}

	return (
		<>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" gap={6}>
					<Text fontWeight="semibold" color="accent-1">
						Schedule
					</Text>

					<IconButton size="xs" icon={<BiPencil size={16} />} onClick={onOpen} />
				</Flex>

				<Flex justify="end" gap={6}>
					<Box w={200}>
						<FormControl>
							<FormLabel>Start Date</FormLabel>
							<Input type="date" value={data.start_date} readOnly />
						</FormControl>
					</Box>

					<Box w={200}>
						<FormControl>
							<FormLabel>Due Date</FormLabel>
							<Input type="date" value={data.due_date} readOnly />
						</FormControl>
					</Box>
				</Flex>
			</Flex>

			<Divider />

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Schedule</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.start_date}>
									<FormLabel>
										Start Date <chakra.span color="red.default">*</chakra.span>
									</FormLabel>

									<Input type="date" defaultValue={data.start_date} size="lg" {...register('start_date', { required: true })} />

									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.due_date}>
									<FormLabel>
										Due Date <chakra.span color="red.default">*</chakra.span>
									</FormLabel>

									<Input type="date" defaultValue={data.due_date} size="lg" {...register('due_date', { required: true })} />

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

export default Schedule
