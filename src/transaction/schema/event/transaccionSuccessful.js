const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class TransactionSuccessfulEvent extends DownstreamEvent {
    constructor(payload, meta) {
        super({
            type: 'TRANSACTION.SUCCESSFUL',
            specversion: 'v1.0.0',
            payload: payload,
            meta: meta,
            schema: {
                creationDate: { type: Date, required: true },
                expirationDate: { type: Date, required: true },
                transactionNumber: { type: Number, required: true },
                documentNumber: { type: Number, required: true }
            }
        })
    }
}

module.exports = { TransactionSuccessfulEvent };