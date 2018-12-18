const request = require("request");
const fs = require("fs");

const saveImage = (id, accessToken) => {
    return new Promise((resolve) => {    
        const fileName = `${id}_${Date.now()}.jpg`;
        const imgUrl = `http://localhost:8000/images/${fileName}`;
        const path = `public/images/${fileName}`
        const imageLink = `https://graph.facebook.com/${id}/picture?width=500&access_token=${accessToken}`
        console.log(imageLink)
        request(imageLink).pipe(fs.createWriteStream(path))
        .on('close', () => {
            resolve(imgUrl)
        });   
    })
}

module.exports = saveImage;