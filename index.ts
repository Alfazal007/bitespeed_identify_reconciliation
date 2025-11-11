import express from "express"
import { router } from "./router/identifyRouter"
import { configDotenv } from "dotenv"

configDotenv({
    path: ".env"
})

const app = express()

app.use(express.json())

app.use("/", router)

app.listen(8000, () => {
    console.log("App listening on port 8000")
})
