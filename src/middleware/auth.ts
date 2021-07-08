import {Request, Response, NextFunction} from 'express';
import * as jwtHelper from '../helper/jwtHelper';
import { RESPONSE, RES_MSG } from '../constant/response';


const auth = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(RESPONSE.UN_AUTHORIZED).json({
                message: RES_MSG.ERROR
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