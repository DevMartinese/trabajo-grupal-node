const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const validationDomain = require("../domain/validationDomain.js");

module.exports.handler = async (command, context) => {
    return commandMapper({ command, context }, inputMode, validationDomain, outputMode);
}