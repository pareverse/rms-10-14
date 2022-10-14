import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Box, Button, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const WaterBill = ({ id, data }) => {
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
		EditUnitMutation.mutate({
			water_bill: {
				current_reading: {
					value: data.current_reading_value,
					date: data.current_reading_date
				},
				previous_reading: {
					value: data.previous_reading_value,
					date: data.previous_reading_date
				},
				amount: data.amount
			}
		})
	}

	return (
		<>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" gap={6}>
					<Text fontWeight="semibold" color="accent-1">
						Water Bill
					</Text>

					<IconButton size="xs" icon={<BiPencil size={16} />} onClick={onOpen} />
				</Flex>

				<Flex justify="end" gap={6}>
					<Box w={200}>
						<Input value={`₱ ${Number(data.water_bill.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}`} readOnly />
					</Box>
				</Flex>
			</Flex>

			<Divider />

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Water Bill</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<Flex gap={6}>
									<FormControl isInvalid={errors.current_reading_value}>
										<FormLabel>
											Current Reading <chakra.span color="red.default">*</chakra.span>
										</FormLabel>

										<Input type="number" defaultValue={data.water_bill.current_reading.value} size="lg" {...register('current_reading_value', { required: true })} />

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={errors.current_reading_date}>
										<FormLabel>
											Date <chakra.span color="red.default">*</chakra.span>
										</FormLabel>

										<Input type="date" defaultValue={data.water_bill.current_reading.date} size="lg" {...register('current_reading_date', { required: true })} />

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</Flex>

								<Flex gap={6}>
									<FormControl isInvalid={errors.previous_reading_value}>
										<FormLabel>
											Previous Reading <chakra.span color="red.default">*</chakra.span>
										</FormLabel>

										<Input type="number" defaultValue={data.water_bill.previous_reading.value} size="lg" {...register('previous_reading_value', { required: true })} />

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={errors.previous_reading_date}>
										<FormLabel>
											Date <chakra.span color="red.default">*</chakra.span>
										</FormLabel>

										<Input type="date" defaultValue={data.water_bill.previous_reading.date} size="lg" {...register('previous_reading_date', { required: true })} />

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</Flex>

								<FormControl isInvalid={errors.amount}>
									<FormLabel>
										Amount <chakra.span color="red.default">*</chakra.span>
									</FormLabel>

									<Input type="number" defaultValue={data.water_bill.amount} size="lg" {...register('amount', { required: true })} />

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

export default WaterBill
