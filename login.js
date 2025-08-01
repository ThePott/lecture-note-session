const form = document.querySelector("#login-form")
const loginButton = document.querySelector("#login_button")
const main = document.querySelector("#main")
const logoutButton = document.querySelector("#logout_button")

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:3000"
console.log("---- here")

const login = async () => {
    const userId = form.user_id.value
    const userPassword = form.user_password.value
    console.log("---- id, pw:", userId, userPassword)

    await axios.post("/", { userId, userPassword })
}

const addPNode = (label, value) => {
    const p = document.createElement("p")
    p.innerText = `${label}: ${value}`
    main.append(p)
}

const showLogoutButton = () => {
    logoutButton.style = ""
}

const hideLogoutButton = () => {
    logoutButton.style = "display: none;"
}


const getUser = async () => {
    const response = await axios.get("/")
    const { user_name, user_info } = response
    addPNode("이름", user_name)
    addPNode("정보", user_info)
    showLogoutButton()
}

loginButton.addEventListener("click", async (event) => {
    event.preventDefault()
    await login()
    await getUser()
})

const logout = async () => {
    const response = await axios.delete("/")
    main.innerHTML = ""
    console.log("---- response:", response)
}

logoutButton.addEventListener("click", async (event) => {
    await logout()
})
