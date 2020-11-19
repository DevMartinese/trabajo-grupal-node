const { v4: uuidv4 } = require("uuid");
const { transactionService } = require('../service/transactionService')
const { TransactionValidation } = require('../schema/input/transactionValidation');


module.exports = async (eventPayload, eventMeta) => {
    // Input validation
    const person = new TransactionValidation(eventPayload, eventMeta).get();


    try {
        //Creacion del dni y la transaccion
        person.id = uuidv4();
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        const transactionNumber = Math.random(11111111, 99999999);
        const dniNumber = Math.random(9, 999999) + 60000000;
        const output = {
            creationDate: Date.now(),
            expirationDate: date,
            transactionNumber,
            dniNumber
        }
        // Guardar en DynamoDB
        await transactionService({
            pk: 'person',
            sk: person.id,
            ...output,
            ...person,
        });
        // Enviar al sns
        await emitTransactionSuccessful(new TransactionSuccessfulEvent(output, eventMeta));

        return { body: 'Transaction successful' };
    } catch (error) {
        return { statusCode: 500, body: error };
    }

}