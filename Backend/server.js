import express from 'express';
import {} from 'dotenv/config';
import loginRouter from './routes/Login.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import router from './routes/tastrouter.js';

const app = express();
const mongoUrl = process.env.mongo_url;

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }), 
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict'
    }
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', loginRouter);
app.use('/api',router);

app.use('/', (req, res) => {
    res.send("This is the home route");
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        await connectDB(); 
        console.log('MongoDB connected');
        console.log(`Server is running at ${PORT}`);
    } catch (err) {
        console.log("Error in connecting to MongoDB:", err);
    }
});

