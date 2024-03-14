const fs = require('fs');


function filedel(filePath){
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('File does not exist',err);
        return;
    }

    // File exists, delete it
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
        return true
    });
});
return true
}
module.exports=filedel