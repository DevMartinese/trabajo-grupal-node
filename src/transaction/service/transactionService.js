const config = require('ebased/util/config');
const DNI_TABLE = config.get('TABLE_NAME')
const dynamo = require('ebased/service/storage/dynamo')

const transactionService = async (item) => {

    return await dynamo.putItem({ TableName: DNI_TABLE, Item: item });

}

module.exports = {transactionService};



