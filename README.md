# YouTube Video Integration
This project integrates with the YouTube API to fetch the latest video from a specific channel. The integration involves fetching an XML feed from YouTube, parsing the XML to extract video details (such as title, author, and video link), and performing operations based on these details.

## Features
- Fetches the latest video from a specified YouTube channel.
- Parses YouTube's XML feed to extract video details.
- Sends video information to an external service (e.g., Telex) for further processing.
- Error handling for network failures, empty feeds, or incorrect responses.
## Tech Stack
- Node.js - JavaScript runtime environment.
- axios - Promise-based HTTP client for making API requests.
- xml2js - XML to JSON parser for Node.js.
- Jest - JavaScript testing framework used for unit and integration tests.
## Installation
Prerequisites
Ensure you have `Node.js` installed on your machine. You can verify the installation by running:
```bash
node --version 
 ```
## Steps to Set Up
1. Clone the repository:
```bash
git clone https://github.com/telexintegrations/youtube-feeds-content.git
 ```
2. Navigate to the project directory:
```bash
cd hng-stage-3-telex-integration
 ```
3. Install the dependencies:
```bash
npm install
 ```
4. Set the environment variables for the YouTube channel ID. Create a `.env`file in the root of the project and add the following:

YOUTUBE_CHANNEL_ID=your-youtube-channel-id

5. Run the application:
```bash
npm start
 ```

## Testing
The project uses Jest for unit testing.
To run tests:
```bash
npm test
 ```

## Endpoints
- **URL**: `/api/telex/integration`
- **Method**: `GET`
- **Body**:No Body
- **Response**
```bash
{
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
            default: "* * * * *",
            }
        ],
        tick_url:
            "https://hng-stage-3-telex-integration-2.onrender.com/api/telex/youtube/content/tick",
            target_url: ""
        },
    }
 ```
- **URL**: `/api/telex/youtube/content/tick`
- **Method**: `POST`
- **Body**:
```bash
 {
              event_name: "Youtube Video Update",
              message: "telemessage",
              status: "success",
              username: "Youtube Monitor"
            }
```
- **Response**: 
```bash
{
    message: "sent to telex"
}
```
**Response Image**: On  the telex  UI, the response look like:
  ![alt text](<https://github.com/telexintegrations/youtube-feeds-content.git/telexResponse.png>)
