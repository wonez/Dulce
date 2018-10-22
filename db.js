module.exports = () => {
    const mongoose = require('mongoose')
    
    mongoose.connect('mongodb://localhost:27017/dulce', { useNewUrlParser: true }).then(res => {
        console.log('DB connected successfully');
    }).catch(err => {
        console.log(err.message, '\nDB not connected')
    });

    return mongoose.connection;
}
