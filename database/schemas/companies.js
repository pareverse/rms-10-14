import mongoose from 'mongoose'

const CompanySchema = mongoose.Schema(
	{
		unitId: {
			type: String,
			default: ''
		},
		image: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true
	}
)

const Companies = mongoose.models.Companies || mongoose.model('Companies', CompanySchema)

export default Companies
