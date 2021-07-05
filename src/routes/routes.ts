import * as express from 'express';
import * as redis from './redidHelper';
import * as db  from '../models/todo.model';
import { parse } from 'url';

class routeController {
    public router = express.Router();
    constructor(){
        this.initializeRoutes();
        }
    public initializeRoutes(): void {
        this.router.all('/todo/*')
        .get('/todo', this.show)
        .post('/todo', this.add)
        .put('/todo', this.update)
        .delete('/todo', this.delete);
    }
    private show = async (req:express.Request, res: express.Response)=>{
        try{
            const sql = 'select * from todo';
            const data = await db.default.pdo(sql);
            redis.default.setString('todolist', JSON.stringify(data), 1);
            const redisdata = await redis.default.getString('todolist');
            const newdata = String(redisdata);
            if(redisdata){
                return res.status(200).json(JSON.parse(newdata));
            }
            return res.status(200).json(data);
        }catch(e){
            console.error(e);
        }
    }
    private add = async (req:express.Request, res:express.Response)=>{
        try{
            const title = req.body.title;
            const desc = req.body.description;
            console.log(title, desc);
            const sql = "insert into todo (title, description) values (' "  + title +  " ', ' "  + desc + " ' )";
            const data:any = await db.default.pdo(sql);
            res.status(200).json(data);
        }catch(e){
            res.status(502).json(e);
        }   
    }
    private update = async(req:express.Request, res:express.Response)=>{
        try{
            const id = req.body.id;
            const title = req.body.title;
            const desc = req.body.description;
            // console.log(req.body);
            const sql = "update todo set title = ' " + title + " ', description = ' " + desc + " ' where id = ' "  + String(id) +  " ' ";
            const data:any = await db.default.pdo(sql);
            res.status(200).json(data);
        }catch(e){
            res.status(502).json(e);
        }
    }
    private delete = async(req:express.Request, res:express.Response)=>{
        try{
            const id = req.body.id;
            console.log(id);
            const sql = "delete from todo where id = ' "  + String(id) +  " ' ";
            const data:any = await db.default.pdo(sql);
            res.status(200).json(data);
        }catch(e){
            res.status(502).json(e);
        }
    }
    public getRouter():express.Router{
        return this.router;
    }
}

export default new routeController();