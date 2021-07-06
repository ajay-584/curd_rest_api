import {Request, Response, NextFunction} from 'express';
import * as jwtHelper from './jwtHelper';


const auth = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.cookies.jwt;
        if(token === undefined){
            return res.status(405).json({
                "message":"invalid authentication"
            });
        }
        const verify = await jwtHelper.default.verfyToken(String(token));
        // console.log(verify);
        // return res.status(200).json({"message":"welcome to new page"});
        next();
    }catch (e){
        return res.status(405).json({
            "message":"invalid authentication"
        });
    }

}


export default auth;