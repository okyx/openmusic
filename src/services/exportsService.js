const amqp = require('amqplib');

const exportService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const chanel = await connection.createChannel();

    chanel.assertQueue(queue, {
      durable: true,
    });
    chanel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      chanel.close();
    }, 1000);
  },
};

module.exports = exportService;
