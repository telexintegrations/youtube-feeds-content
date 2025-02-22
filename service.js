const axios = require("axios");

const xml2js = require("xml2js");

const youtube_channel_id = process.env.YOUTUBE_CHANNEL_ID

const getLatestVideo = async () => {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtube_channel_id}`;

    try {
      const response = await axios.get(url);

      let extractData;
      
      xml2js.parseString((response).data, (err, result) => {
        console.log(result)
        if (err) error: err.message;
        
        const lastVideo = result.feed.entry[0];

        const videoLength = lastVideo.title.length;
        const index = videoLength - 1;
        const author = lastVideo.author[0].name[index];
        const title = lastVideo.title[index];
        const videoLink = lastVideo.link[index].$.href;

        const data = {
            author:author,
            title:title,
            videoLink:videoLink,
          }
          extractData = data
      });

      return extractData
      
    } catch (error) {
      return null;
    }
  }


module.exports = {getLatestVideo}