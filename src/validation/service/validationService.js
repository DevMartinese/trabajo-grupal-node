const sqs = require("ebased/service/downstream/sqs");

module.exports = async (payload) => {
  const sqsSendParams = {
    MessageBody: payload,
    QueueUrl: process.env.QUEUE_URL,
  };

  await sqs.send(sqsSendParams);
};