var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var cors = require('cors');
var path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Express app
var app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Import Routes
var productRoutes = require('./routes/products');
var orderRoutes = require('./routes/orders');
var paymentRoutes = require('./routes/payments');
var uploadRoutes = require('./routes/uploads');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/uploads', uploadRoutes);

// Serve React build static files
var buildPath = path.join(__dirname, '..', 'build');
if (process.env.NODE_ENV === 'production' && require('fs').existsSync(buildPath)) {
    app.use(express.static(buildPath));

    // React Router fallback
    app.get('*', function(req, res) {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

// Error handling middleware (simple placeholder)
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Mongo Connection & Server Init
var PORT = process.env.PORT || 5000;
var MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/positive-vibe-tribe';

function startServer() {
    app.listen(PORT, function() {
        console.log('Server running on port ' + PORT);
    });
}

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function() {
        console.log('MongoDB connected');
        startServer();
    })
    .catch(function(error) {
        console.error('Mongo connection error:', error);
        console.log('Proceeding without database. Sample data will be served.');
        startServer();
    });

module.exports = app;