const express = require('express');

const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');

const adminRoutes = require('./routes/adminRoutes');

const userRoutes = require('./routes/userRoutes');

const ownerRoutes = require('./routes/ownerRoutes');

const storeRoutes = require('./routes/storeRoutes');

// import OwnerDashboard from './pages/OwnerDashboard';

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/user', userRoutes);

app.use('/api/owner', ownerRoutes);

app.use('/api/stores', storeRoutes);


module.exports = app;