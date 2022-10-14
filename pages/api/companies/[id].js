import connect from 'database/connect'
import Companies from 'database/schemas/companies'

export default async (req, res) => {
	const { id } = req.query
	await connect()

	const data = await Companies.findById({ _id: id })
	res.status(200).send(data)
}
