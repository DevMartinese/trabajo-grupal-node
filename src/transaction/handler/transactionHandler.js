const { batchEventMapper } = require("ebased/handler");

const inputMode = require("ebased/handler/input/batchEventQueue");
const outputMode = require("ebased/handler/output/batchEventConfirmation");

const transactionDomain = require("../domain/transactionDomain");


const retryStrategy = (receiveCount) => 5 * receiveCount;

module.exports.handler = async (events, context) => {
    console.log('events,context', events, context);
    return batchEventMapper({ events, context }, inputMode, transactionDomain, outputMode);
};