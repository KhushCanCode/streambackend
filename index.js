import express from "express";
import fs from "fs";
import cors from "cors";
import 'dotenv/config';

const app = express();

app.use(cors());

const videoFileMap= {
    'dancin': 'videos/dancin.mp4',
    'izazat': 'videos/izazat.mp4',
    'werollin': 'videos/werollin.mp4'

}

app.get("/", (req,res)=>{
    res.send("Hello");
})

app.get("/videos/:filename", (req,res)=>{
    const filename = req.params.filename;
    const filePath = videoFileMap[filename];
    if(!filePath){
        console.log(filePath, filename);
        return res.status(404).send('File Not Found');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if(range){
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10): fileSize-1;

        const chunkSize = end - start +1;
        const file = fs.createReadStream(filePath, {start, end});

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Range': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        }

        res.writeHead(206, head);
        file.pipe(res);
    }

    else{
        const head = {
           
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
    
})