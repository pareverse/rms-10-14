import mongoose from 'mongoose'

const UnitSchema = mongoose.Schema(
	{
		companyId: {
			type: String,
			default: ''
		},
		unit_number: {
			type: String,
			default: ''
		},
		unit_type: {
			type: String,
			default: ''
		},
		monthly_rent: {
			type: String,
			default: '0'
		},
		unit_status: {
			type: Boolean,
			default: false
		},
		start_date: {
			type: String,
			default: ''
		},
		due_date: {
			type: String,
			default: ''
		},
		camc: {
			type: String,
			default: '0'
		},
		vat: {
			percent: {
				type: String,
				default: '12'
			}
		},
		water_bill: {
			current_reading: {
				value: {
					type: String,
					default: ''
				},
				date: {
					type: String,
					default: ''
				}
			},
			previous_reading: {
				value: {
					type: String,
					default: ''
				},
				date: {
					type: String,
					default: ''
				}
			},
			amount: {
				type: String,
				default: '0'
			}
		},
		meralco_bill: {
			type: Array,
			default: null
		},
		maintenance: [
			{
				name: {
					type: String
				},
				amount: {
					type: String
				}
			}
		],
		archive: {
			type: Boolean,
			default: false
		},
		active: {
			type: Boolean,
			default: true
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

const Units = mongoose.models.Units || mongoose.model('Units', UnitSchema)

export default Units
