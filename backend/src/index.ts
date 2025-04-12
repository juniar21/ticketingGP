import express, { Application, Request, Response } from "express"

const PORT = 8000

const app: Application = express();
app.use(express.json())

app.get("/", (req:Request, res:Response) =>{
    res.status(200).send({
        status: "success",
        message: "Welcome to my API",
    });
});


app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
    
});

