import dotenv from 'dotenv';
import express from 'express'; 
import routes from './routes/index.js';
import sequelize from './config/connection.js';


//ENVIRONMENT PROCESS
dotenv.config();
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) { //checks if the environment variables are set
    throw new Error('Missing critical database environment variables!');
}

//EXPRESS SETUP
const app = express();
const PORT = process.env.PORT || 3001; //sets the port to the environment variable PORT or 3001
const forceDatabaseRefresh = false; // Set to true to drop and recreate tables on server start

//STATIC FILES
app.use(express.static('../client/dist')); //Middleware to serve static files (React build folder)


//MIDDLEWARE AND ROUTES
app.use(express.json());
app.use(routes);
app.get('/health', (req, res) => { //health check route
    res.status(200).json({ message: 'Server is healthy!' });
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => { //error handling middleware
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});



// SYNC LOGIC AND SERVER START
sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .then(() => sequelize.sync({ force: forceDatabaseRefresh }))
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error initializing the server:', err);
    });
