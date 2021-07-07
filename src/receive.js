var amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', (err, connection)=>{
    if(err){
        throw err;
    }
    connection.createChannel((error, channel)=>{
        if(error){
            throw error
        }
        var queue = 'hello';
        channel.assertQueue(queue, { durable:false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg)=>{
            console.log(" [x] Received %s", msg.content.toString());
        },{ noAck:true });
    });
});