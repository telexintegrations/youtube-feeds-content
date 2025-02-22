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
git clone https://github.com/OchigboDaniel/hng-stage-3-telex-integration
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



