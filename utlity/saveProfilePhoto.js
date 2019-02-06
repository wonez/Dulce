const request = require("request");
const {Storage} = require('@google-cloud/storage');

const saveImage = (id, accessToken) => {

    var config = {
        projectId: 'dulce-226122',
        keyFilename: 'utlity/firebase.json'
    };
      
    const storage = new Storage(config);

    return new Promise((resolve) => {    
        const fileName = `upload_${id}_${Date.now()}.jpg`;
        const path = `/images/${fileName}`;
        const imageLink = `https://graph.facebook.com/${id}/picture?width=500&access_token=${accessToken}`
        request(imageLink, {encoding: null}, (error, response, body) => {
            storage.bucket('dulce-226122.appspot.com').file(path).save(body, { 
                metadata: { 
                    contentType: 'image/jpeg' 
                },
            }).then( () => {
                resolve(`https://storage.googleapis.com/dulce-226122.appspot.com${path}`)
            })
        }) 
    })
}

module.exports = saveImage;