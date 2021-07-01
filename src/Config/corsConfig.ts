import cors from 'cors'

export const corsConfig = cors({
 credentials: true,
 origin: 'http://localhost:3000'
})