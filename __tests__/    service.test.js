const axios = require("axios");
const xml2js = require("xml2js");
const { getLatestVideo } = require("../service");

jest.mock("axios");
jest.mock("xml2js", () => ({
    parseString: jest.fn(),
}));

describe("getLatestVideo", () => {
    const mockXMLResponse = `
    <feed>
        <entry>
            <title>Test Video Title</title>
            <author><name>Test Author</name></author>
            <link rel="alternate" href="http://youtube.com/video123"/>
        </entry>
    </feed>`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return video details when YouTube API responds with valid XML", async () => {
        axios.get.mockResolvedValue({ data: mockXMLResponse });

        xml2js.parseString.mockImplementation((xml, callback) => {
            callback(null, {
                feed: {
                    entry: [{
                        title: ["Test Video Title"],
                        author: [{ name: ["Test Author"] }],
                        link: [{ $: { href: "http://youtube.com/video123" } }],
                    }],
                },
            });
        });

        const result = await getLatestVideo();

        expect(result).toEqual({
            author: "Test Author",
            title: "Test Video Title",
            videoLink: "http://youtube.com/video123",
        });
    });

    it("should return null when XML parsing fails", async () => {
        axios.get.mockResolvedValue({ data: mockXMLResponse });

        xml2js.parseString.mockImplementation((xml, callback) => {
            callback(new Error("XML Parsing Error"), null);
        });

        const result = await getLatestVideo();

        expect(result).toBeNull();
    });

    it("should return null when there is no video entry in the feed", async () => {
        axios.get.mockResolvedValue({ data: "<feed></feed>" });

        xml2js.parseString.mockImplementation((xml, callback) => {
            callback(null, { feed: {} });
        });

        const result = await getLatestVideo();

        expect(result).toBeNull();
    });

    it("should return null when axios fails to fetch data", async () => {
        axios.get.mockRejectedValue(new Error("Network Error"));

        const result = await getLatestVideo();

        expect(result).toBeNull();
    });
});
