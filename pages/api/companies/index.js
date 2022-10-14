import connect from 'database/connect'
import Companies from 'database/schemas/companies'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			const data = await Companies.find({}).sort({ createdAt: -1 })
			res.status(200).send(data)
			break

		case 'POST':
			const { name } = req.body

			await Companies.create({
				name,
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
