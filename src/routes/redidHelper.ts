import * as redis from 'redis';



class RedisHelper {
    public client : redis.RedisClient;
    // private host: string = process.env.REDIS_HOST;
    // private port: string = process.env.REDIS_PORT;

    constructor(){
        console.log("Redis client");
        this.client = redis.createClient();
        this.client.on('connect', ()=>{
            console.log("Redis connected");
        });
    }

    // set string value for given key
    // Note expire time second
    public setString(key:string, value: string, expires = 0){
        return new Promise((resolve, reject)=>{
            this.client.set(key, value, (err, reply)=>{
                if(err){
                    return reject(err);
                }
                // add expire time if provided 
                if(expires != 0){
                    this.client.expire(key, expires*60);
                }
                resolve(reply);
            });
        })
    }

    // Get string value gor given key
    public getString(key:string){
        return new Promise((resolve, reject)=>{
            this.client.get(key, (err, reply)=>{
                if(err){
                    return reject(err);
                }
                // console.log("redis data",reply);
                return resolve(reply);
            })
        })
    } 
}

export default new RedisHelper();