import express from 'express';
import { FileOrganizer } from './FileOrganizer';
import bodyParser from 'body-parser';

const app = express();
const port = 8081;

app.use(bodyParser.json());

// const fileOrganizer = new FileOrganizer({
//   Images: ['.jpg', '.jpeg', '.png', '.gif'],
//   Documents: ['.pdf', '.doc', '.docx', '.txt'],
//   Videos: ['.mp4', '.mov', '.avi'],
//   Music: ['.mp3', '.wav', '.flac'],
// });

app.post('/organize', (req, res) => {
  const { directory, fileTypes } = req.body;
  const fileOrganizer = new FileOrganizer(fileTypes);

  try {
    fileOrganizer.organizeFiles(directory);
    res.sendStatus(200);
  } catch (error:any) {
    console.error(`Error organizing files: ${error.message}`);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});