var amqp = require('amqplib/callback_api');


amqp.connect('amqp://guest:guest@localhost', (err, connection)=>{
    if(err){
        console.log("err in rabbitmq connection established");
        throw err;
    }
    console.log("rabbitmq connection established");
    connection.createChannel((error, channel)=>{
        if(error){
            console.log(" error in rabbitmq channel created");
            throw error;
        }
        console.log("rabbitmq channel created");
        var queue = 'hello';
        var msg = 'hello world';

        channel.assertQueue(queue, { durable:false});
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[x] send %s", msg);
    });
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
