import app from './app';
import { config } from '../src/config';
import { initializeWorkers } from './modules/queue';


const PORT  = config.port

initializeWorkers()

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

