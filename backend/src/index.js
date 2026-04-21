const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../../frontend/index.html')); });
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { console.log('Stargazer running on port ' + PORT); });

