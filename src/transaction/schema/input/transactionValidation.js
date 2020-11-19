const { InputValidation } = require('ebased/schema/inputValidation');

class TransactionValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'TRANSACTION.VALIDATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                names: { type: String, min: 2, max: 50, required: true },
                lastName: { type: String, min: 2, max: 50, required: true },
                email: { type: String, required: true },
                address:{ type: String,min: 2, max: 50, required: true },
                locality: { type: String, min: 2, max: 50, required: true },
                province:{ type: String, min: 2, max: 20, required: true },
                sex: { type: String, min: 1, max: 1, required: true },
                nationality: { type: String, min: 1, max: 20, required: true },
                birthDate: { type: String, min: 10, max: 10, required: true },
                donor: { type: Boolean, default: true },
                signature: { type: String, min: 2, max: 50, required: true },
                photo: { type: String, min: 2, max: 50, required: true }
            }
        })
    }
}

module.exports = { TransactionValidation };