const axios = require("axios");

const xml2js = require("xml2js");

const youtube_channel_id = process.env.YOUTUBE_CHANNEL_ID

module.exports = {
    youtubeFeed: async (req, res)=>{
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
  
},
    telexIntegration: (req, res)=>{
        res.json({
            data: {
                date: {
                  created_at: "2025-02-20",
                  updated_at: "2025-02-20",
                },
                descriptions: {
                  app_description: "Get current youtube video from a creator channel.",
                  app_logo:
                    "https://img.freepik.com/free-photo/youtube-icon-line-connection-circuit-board_1379-892.jpg?semt=ais_hybrid",
                  app_name: "MyTube Feed.",
                  app_url:
                    "https://ping.telex.im/v1/webhooks/01951f1b-d166-7251-b219-af816fe74df9",
                  background_color: "#HEXCODE",
                },
                integration_category: "Social Media Management",
                integration_type: "interval",
                is_active: false,
                output: [],
                key_features: [
                  "Fetches Latest youTube Channel Update.",
                  "Automated Weekly update.",
                  "Efficient Data Filtering.",
                  "Simple Design.",
                ],
                permissions: {},
                settings: [
                  {
                    label: "channel-id",
                    type: "text",
                    required: true,
                    default: "",
                  },
                  {
                    label: "enable-notification",
                    type: "boolean",
                    required: true,
                    default: "",
                  },
                  {
                    label: "interval",
                    type: "text",
                    required: true,
                    default: "0 * * * *",
                  }
                ],
                tick_url:
                  "https://hng-stage-3-telex-integration-2.onrender.com/api/telex/youtube/content/tick",
                target_url:
                  "https://ping.telex.im/v1/webhooks/01951f1b-d166-7251-b219-af816fe74df9",
              },
            }
        )
    },

    tick: (req, res)=>{
        const requestData = req.body;

        console.log("Reveived tick:", requestData)
        if(!requestData){
            console.log("Didnt receive request")
        }

        res.json({
            status:"success",
            message: "Tick reveived"
        })
    }

}