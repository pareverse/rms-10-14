import connect from 'database/connect'
import Units from 'database/schemas/units'

export default async (req, res) => {
	const { method } = req
	const { id } = req.query
	await connect()

	switch (method) {
		case 'GET':
			try {
				const data = await Units.findById({ _id: id })
				res.status(200).send(data)
			} catch (error) {
				return res.status(400).send('request failed.')
			}
			break

		case 'PATCH':
			try {
				await Units.findByIdAndUpdate({ _id: id }, { ...req.body, updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }) })
				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}
			break

		default:
			res.status(400).send('request failed.')
			break
	}
}
