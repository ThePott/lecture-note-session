const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
// const session = require("express-session")
const jwt = require("jsonwebtoken")

const users = [
    {
        user_id: "test",
        user_password: "1234",
        user_name: "테스트 유저",
        user_info: "나는야 테스트 유저"
    }
]

const secretKey = "some super scret key that must be git ignored"

const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["OPTIONS", "GET", "POST", "DELETE"],
    credentials: true
}
app.use(cors(corsOptions))

// const sessionOptions = {
//     secret: "some long and cool secret key",
//     resave: false,
//     saveUninitialized: false,
//     name: "session_id",
// }
// app.use(session(sessionOptions))

app.post("/", (req, res) => {
    const { userId, userPassword } = req.body

    // console.log("---- body:", userId, userPassword)
    const user = users.find((el) => el.user_id === userId)
    if (!user) { res.status(401).send("---- not signed up") }


    const accessToken = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: 1000 * 60 * 10 })
    console.log("---- access token:", accessToken)
    res.cookie("accessToken", accessToken)
    // req.session.userId = user.user_id
    // console.log("---- req session:", req.session.userId)
    res.send(accessToken)
})

app.get("/", (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(accessToken, secretKey, {})
    const { userId } = payload
    const user = users.find((el) => el.user_id === userId)
    if (!user) { res.status(404).send("---- ERROR: USER NOT FOUND") }
    
    
    console.log("---- payload:", user)
    res.status(200).json(user)
})

// app.delete("/", (req, res) => {
//     // req.session.destroy()
//     res.clearCookie("accessToken")
//     res.status(200).send("---- logged out")
// })

app.listen(3000, () => console.log("---- server is on port 3000"))