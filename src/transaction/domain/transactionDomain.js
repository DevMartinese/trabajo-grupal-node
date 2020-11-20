const { v4: uuidv4 } = require("uuid");
const { transactionService } = require('../service/transactionService');
const { emitTransactionSuccessful } = require('../service/emitTransactionSuccessful');
const { TransactionValidation } = require('../schema/input/transactionValidation');
const { TransactionSuccessfulEvent } = require('../schema/event/transaccionSuccessful');


module.exports = async (eventPayload, eventMeta) => {
    console.log('payload y meta',eventPayload, eventMeta);
    // Input validation
    const person = new TransactionValidation(eventPayload, eventMeta).get();


    try {
        //Creacion del dni y la transaccion
        person.id = uuidv4();
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        const transactionNumber = Math.random(11111111, 99999999);
        const documentNumber = Math.random(9, 999999) + 60000000;
        const output = {
            creationDate: Date.now(),
            expirationDate: date,
            transactionNumber,
            documentNumber
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
        console.error(error);
        return { statusCode: 500, body: error };
    }

}