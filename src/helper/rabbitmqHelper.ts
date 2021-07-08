import * as amqp from 'amqplib/callback_api';
class RabbitMq {
    public channel: amqp.Channel;

    constructor(){
        console.log("rabbitmq is working here");
        this.startServer();
    }

    public async startServer(){
        try{
            await this.connect().then((res:amqp.Channel)=>{
                this.channel = res;
                console.log('connection successfully created');
            })
        }
    }

    public connect(){
        try{
            return new Promise((resolve, reject)=>{
                amqp.connect('amqp://guest:guest@localhost', (err, conn)=>{
                    if(err){
                        reject(err);
                    }
                    conn.createChannel((error,ch)=>{
                        if(error){
                            reject(err);
                        }
                        resolve(ch);
                    });
                });
            });
        }catch (error){
            console.log('error while connecting rabbitmq');
        }
    }

    public assertQueue(queue: string){
        this.channel.assertQueue(queue, { durable: false });
    }

    public consumeQueue(queue: string){
        return new Promise((resolve, reject)=>{
            this.channel.consume(queue, (msg:amqp.Message)=>{
                const data = JSON.parse(msg.content.toString());
                this.channel.ack(msg);
                resolve(data);
            },{
                noAck:false
            }
            });
        });
    }

    public createQueue(queue: string, data:string){
        try{
            this.channel.sendToQueue(queue, Buffer.from(data));
        }catch(err){
            console.log('rabbit carete queue error', err);
        }
    }
}


export default new RabbitMq();