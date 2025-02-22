
const axios = require('axios');
const { sendToTelex } = require('./controller.js'); 
jest.mock('axios');
jest.mock('./service', () => ({
  getLatestVideo: jest.fn(),
}));

describe('sendToTelex', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = { data: { message: "sent to telex" } };
  });

  it('should send data to Telex successfully when video data is retrieved', async () => {
    // Mocking getLatestVideo to return a fake youtube video
    require('./service.js').getLatestVideo.mockResolvedValue({
      title: 'New Video Title',
      author: 'Video Author',
      videoLink: 'http://youtube.com/video123',
    });

    // Mocking axios.post to simulate a successful response
    axios.post.mockResolvedValue(mockResponse);

    const req = {}; // Provide necessary mock request object
    const res = { json: jest.fn() }; // Mock the response function

    await sendToTelex(req, res);

    // Check if res.json was called with the success message
    expect(res.json).toHaveBeenCalledWith({
      message: "sent to telex",
    });

    // Check if axios.post was called with correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String), 
      expect.objectContaining({
        event_name: "Youtube Video Update",
        message: expect.stringContaining('New Video Title'),
        status: "success",
        username: "Youtube Monitor",
      }),
      expect.any(Object)
    );
  });

  it('should return an error if no video data is retrieved', async () => {
    // Mocking getLatestVideo to return null (simulating failure)
    require('./service').getLatestVideo.mockResolvedValue(null);

    const req = {}; 
    const res = { json: jest.fn() }; 

    await sendToTelex(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Error sending to telex",
    });
  });

  it('should handle failure in sending data to Telex', async () => {
    // Mocking getLatestVideo to return valid data
    require(',/service').getLatestVideo.mockResolvedValue({
      title: 'New Video Title',
      author: 'Video Author',
      videoLink: 'http://youtube.com/video123',
    });

    // Mocking axios.post to simulate failure
    axios.post.mockRejectedValue(new Error('Failed to send data to Telex'));

    const req = {}; 
    const res = { json: jest.fn() }; 

    await sendToTelex(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Error sending to telex",
    });
  });

  it('should handle other unexpected errors', async () => {
    // Mocking getLatestVideo to return valid data
    require('./path-to-getLatestVideo').getLatestVideo.mockResolvedValue({
      title: 'New Video Title',
      author: 'Video Author',
      videoLink: 'http://youtube.com/video123',
    });

    // Mocking axios.post to throw a generic error
    axios.post.mockRejectedValue(new Error('Unknown error'));

    const req = {}; 
    const res = { json: jest.fn() }; 

    await sendToTelex(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Error sending to telex",
    });
  });
});
