const sendToTelex = require("./service")
const axios = require("axios")

const {getLatestVideo}= require("./service.js")

const telexChannelUrl = process.env.TELEX_CHANNEL_URL

module.exports = {

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
                "https://hng-stage-3-telex-integration-2.onrender.com/api/telex/integration",
              background_color: "#fff",
            },
            integration_category: "Monitoring & Logging",
            integration_type: "interval",
            is_active: true,
            key_features: [
              "Fetches Latest youTube Channel Update.",
              "Automated Weekly update.",
              "Efficient Data Filtering.",
              "Simple Design.",
            ],
            settings: [
              {
                label: "author",
                type: "text",
                required: true,
                default: "authors name",
              },
              {
                label: "title",
                type: "text",
                required: true,
                default: "the title of the video",
              },
              {
                label: "url",
                type: "text",
                required: true,
                default: "link to the video",
              },
              {
                label: "interval",
                type: "text",
                required: true,
                default: "1 * * * *",
              }
            ],
            tick_url:
              "https://hng-stage-3-telex-integration-2.onrender.com/api/telex/youtube/content/tick",
              target_url: ""
          },
        }
    )
},

  
  sendToTelex : async (req, res)=>{

  const youtubeFeed = await getLatestVideo();
          if (!youtubeFeed){
              return new Error("Failed to retrieve video data");
          }  

        try {

          
          const telexMessage = `New Video Alert!!!

            ${youtubeFeed.title}   by   ${youtubeFeed.author}
            
            url:  ${youtubeFeed.videoLink}`
  
            const data = {
              event_name: "Youtube Video Update",
              message: telexMessage,
              status: "success",
              username: "Youtube Monitor"
            }
  
            // send to telex 
            const response = await axios.post(telexChannelUrl,
              data,
              {
                header:{
                "Content_Type": "application/json"
              }
            })

            if(!response){
              res.json({
                message:"Error sending to telex"
              })
            }
            res.json({
              message:"sent to telex"
            })  
  
      } catch (error) {
          return new Error(error.message)        
      } 

    }
}