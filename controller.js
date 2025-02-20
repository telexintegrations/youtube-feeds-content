const axios = require("axios");

const xml2js = require("xml2js");

const youtube_channel_id = process.env.YOUTUBE_CHANNEL_ID

module.exports = async (req, res)=>{
    let lastVideo = null;
 
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtube_channel_id}`

    try {
        const response = axios.get(url)
        console.log(response)
        xml2js.parseString((await response).data, (err, result)=>{
            if (err){
                return res.status(500).json({
                    error: err.message
                })
            }
            
            const lastVideo = result.feed.entry[0];

            const videoLength = lastVideo.title.length
            const index = videoLength - 1
            console.log(index)
            const author = lastVideo.author[0].name[index]
            const title = lastVideo.title[index]
            const videoLink = lastVideo.link[index].$.href
            
            return res.status(200).json({
                
                author:author,
                title:title,
                link:videoLink
            })
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Sever error"
        })       
    }
  
}