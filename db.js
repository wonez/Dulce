module.exports = () => {
    const mongoose = require('mongoose')
    
    mongoose.connect('mongodb://admin:admin123@ds135384.mlab.com:35384/dulce',{
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: false 
    }).then(res => {
        console.log('DB connected successfully');
    }).catch(err => {
        console.log(err.message, '\nDB not connected')
    });

    return mongoose.connection;
}
