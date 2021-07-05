import * as mysql from 'mysql';

class DbHelper {
    private pool:mysql.Pool;
    constructor(){
        this.pool = this.initializePool();
    }
    public initializePool(): mysql.Pool {
        return mysql.createPool({
            connectionLimit:1,
            host : 'localhost',
            user : 'root',
            password : 'ag584',
            database : 'rest_api'

        });
    }
    public pdo(query: string | mysql.QueryOptions){
        let pdoConnect : mysql.Pool;
        pdoConnect = this.pool;
        return new Promise((resolve, reject)=>{
            pdoConnect.getConnection(
                (err:mysql.MysqlError, connection:mysql.PoolConnection) =>{
                    if(err){
                        return reject(err);
                    }
                    // console.log("DB is connected");
                    connection.query(query, (error:String, results:any)=>{
                        connection.release();
                        if(error) return reject(error);
                        const result = results.length > 0 ? JSON.parse(JSON.stringify(results)) : [];
                        // console.log(result);
                        resolve(result);
                    });
                }
            )
        });
    }
}


export default new DbHelper();