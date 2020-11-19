const config = require('ebased/util/config');
const sns = require('ebased/service/downstream/sns');

const TRANSACTION_TOPIC = config.get('TRANSACTION_TOPIC');

const emitTransactionSuccessful = async (transaccionSuccessfulEvent) => {
    const { eventPayload, eventMeta } = transaccionSuccessfulEvent.get();

    const snsPublishParams = {
        TopicArn: TRANSACTION_TOPIC,
        Message: eventPayload
    }

    await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { emitTransactionSuccessful };