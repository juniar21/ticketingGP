import express, { Application, Request, Response } from "express"
import { AuthRouter } from "./routers/auth.routes";
import cors from "cors";

const PORT = 8000

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/", (req:Request, res:Response) =>{
    res.status(200).send({
        status: "success",
        message: "Welcome to my API",
    });
});

const authRouter = new AuthRouter();
app.use("/api/auth", authRouter.getRouter());


app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
    
});

