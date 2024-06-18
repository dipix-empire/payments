import App from "./src/App"
import { config } from "dotenv"
config()

new App(process.env.BYPASS_AUTH_ONLY_ENABLE_IN_DEV_MODE == "true").start(3200)
