import * as jwt from 'jsonwebtoken';



class JwtHelper {
    private key: string;
    constructor(){
        this.key = 'asldf5546@df';
    }

    public generateToken(data:object, exprire:object = { expiresIn:'10h'}){
        return new Promise((resolve, reject)=>{
            jwt.sign(data, this.key, exprire, (err, token)=>{
                if(err){
                    return reject(err);
                }
                // console.log(token);
                return resolve(token);
            });
        });
    }

    public verfyToken(token:string){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.key, (err, relsult)=>{
                if(err){
                    return reject(err);
                }
                // console.log(relsult);
                return resolve(relsult);
            })
        });
    }
}

export default new JwtHelper();