const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");



function readVideos() {
const videosFile = fs.readFileSync ("./data/videos.json");
const videosData = JSON.parse(videosFile);
return videosData;
};

function writeVideos(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("./data/videos.json", stringifiedData);
}

router.get("/", (_req, res) => {
    const videosData = readVideos();
    const strippedData = videosData.map((video) => {
        return {
            id: video.id,
            image: video.image,
            title: video.title,
            channel: video.channel,
        };
    });
    console.log("test");
    res.status(200).json(strippedData);
});

router.post("/", (req, res) => {
    const videosData = readVideos();
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: req.body.channel,
        image: "",
        description: req.body.description,
        views:0,
        likes:0,
        duration: "4.51",
        video: "",
        timestamp: Date.now(),
        comments: [],
    };

    videosData.push(newVideo);
    writeVideos(videosData);
    res.status(201).send();
})

router.get("/:videoId", (req, res) => {
  const videosData = readVideos();
  const videoId = req.params.videoId;
  const video = videosData.find((video) => video.id === videoId);
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("We can't find the video");
  }
});


module.exports = router;