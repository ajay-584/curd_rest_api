import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: __dirname+'/.env' });


console.log(process.env.PORT);