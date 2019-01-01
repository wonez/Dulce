const request = require("request");
const fs = require("fs");

const saveImage = (id, accessToken) => {
    return new Promise((resolve) => {    
        const fileName = `upload_${id}_${Date.now()}.jpg`;
        const imgUrl = `/images/${fileName}`;
        const path = `public/images/${fileName}`
        const imageLink = `https://graph.facebook.com/${id}/picture?width=500&access_token=${accessToken}`
        request(imageLink).pipe(fs.createWriteStream(path))
        .on('close', () => {
            resolve(imgUrl)
        });   
    })
}

module.exports = saveImage;