

import { createServer } from "./api"

createServer().then(() => {
    console.log("Exiting...")
})