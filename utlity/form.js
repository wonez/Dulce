const formidable = require('formidable');

exports.createForm = () => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = 'public/images'
    form.keepExtensions = true;
    return form;
}

exports.transformPath = (path) => {
    const paths = path.split('/');
    paths[0] = '';
    return paths.join('/')
}