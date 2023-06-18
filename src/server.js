const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const fileName = file.name;
  const folderPath = './public/images';

  // move the file to the specified folder
  file.mv(path.join(folderPath, fileName), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err.message });
    }

    // send back the file URL
    res.send({
      fileUrl: `${req.protocol}://${req.get('host')}/images/${fileName}`
    });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
