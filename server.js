const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const users = [
    {
        user_id: "test",
        user_password: "1234",
        user_name: "테스트 유저",
        user_info: "나는야 테스트 유저"
    }
]

const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["OPTIONS", "GET", "POST", "DELETE"],
    credentials: true
}
app.use(cors(corsOptions))

const sessionOptions = {
    secret: "some long and cool secret key",
    resave: false,
    saveUninitialized: false,
    name: "session_id",
}
app.use(session(sessionOptions))

app.post("/", (req, res) => {
    const {userId, userPassword} = req.body
    
    // console.log("---- body:", userId, userPassword)
    const user = users.find((el) => el.user_id === userId)
    if (!user) { res.status(401).send("---- not signed up") }

    req.session.userId = user.user_id
    res.send("----good")
})

app.listen(3000, () => console.log("---- server is on port 3000"))