import app from './app';
import { config } from '../src/config';
import "./modules/queue/workers/email"

const PORT  = config.port

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

