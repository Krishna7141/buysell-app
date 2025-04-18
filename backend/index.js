const express = require('express');
const app = express();

const userRoutes = require('./routes/user.route');
const propertyRoutes = require('./routes/property.route');

require('dotenv').config();
const database = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;
database.dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: (origin, callback) => {
            callback(null, origin);
        },
        credentials: true,
    })
);

// app.use(
//     cors({
//         origin: "https://reunion-assignment-kkv.vercel.app",
//         credentials: true,
//     })
// );

app.use('/api/auth/', userRoutes);
app.use('/api/property/', propertyRoutes);

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Server is On...",
    })
})

app.listen(PORT, () => {
    console.log(`Server is Started at Port No.: ${PORT}`);
})