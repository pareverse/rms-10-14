import connect from 'database/connect'
import Units from 'database/schemas/units'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			const data = await Units.find({}).sort({ createdAt: -1 })
			res.status(200).send(data)
			break

		case 'POST':
			const { unit_number, unit_type, monthly_rent } = req.body

			const check = await Units.findOne({ unit_number })

			if (check) return res.status(417).send('Unit number is already exists.')

			await Units.create({
				unit_number,
				unit_type,
				monthly_rent,
				created: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
				updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
			})

			res.status(200).send('request succes.')
			break

		default:
			res.status(400).send('request failed.')
			break
	}
}
