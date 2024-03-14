const path = require("path");
const fs=require('fs');

const FileHandeling=function(req,userId){
    console.log('jj',req.files.file);
    if (!req.files || Object.keys(req.files).length === 0) {
        return [];
      }
      const uploadedFile = req.files.file;
      const fileExtension = path.extname(uploadedFile.name);
      const uploadDir=path.join(__dirname,'..','public',String(userId))
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const sanitizedPath = uploadedFile.name.replace(/[^\w\d.-]/g, '');
      const uploadFile=Date.now()+sanitizedPath
      const uploadPath = path.join(uploadDir, uploadFile);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return
});
return [ uploadFile,fileExtension ]
}

module.exports=FileHandeling