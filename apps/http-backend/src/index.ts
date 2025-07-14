import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types";
const app = express();

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message:"Incorrect inputs"
        })
        return;
    }
})

app.post('/signin', (req, res) => {
    const userId = 1;
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        token
    });
})

app.post('/room',middleware,(req, res) => {
    //db-call
})

app.listen(5000, () => {
  console.log("HTTP backend is running on port 3000");
});