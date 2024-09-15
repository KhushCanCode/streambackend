# Node Js Streams

A simple Node.js server using Express that serves video files with support for HTTP range requests. This application demonstrates handling streaming video content and working with Node.js streams and environment variables.

## Features

- Serve static video files with support for partial content requests.
- Handle HTTP range requests for video streaming.
- Environment configuration using `dotenv`.
- CORS (Cross-Origin Resource Sharing) enabled for cross-origin requests.

## Prerequisites

- Node.js (v12 or later)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following content:

   ```env
   PORT=4000
   ```

4. **Ensure the `videos` directory exists** and contains the video files named `dancin.mp4`, `izazat.mp4`, and `werollin.mp4`.

## Usage

1. **Start the server**:

   ```bash
   npm start
   ```

   The server will start and listen on the port defined in your `.env` file, or default to port `4000` if not specified.

2. **Access the server**:

   - **Home Route**: `GET /`
     - Returns a simple message: `Hello`
   
   - **Video Route**: `GET /videos/:filename`
     - Replace `:filename` with the name of the video file (e.g., `dancin`).
     - Supports HTTP range requests for streaming. Example: `GET /videos/dancin`.

## API

### `GET /`

Returns a plain text message:

```text
Hello
```

### `GET /videos/:filename`

Serves a video file based on the filename provided. Supports HTTP range requests to allow video streaming.

**Responses:**

- **200 OK**: The requested video file is served.
- **206 Partial Content**: If the `Range` header is present and valid.
- **404 Not Found**: If the filename does not match any video in the `videoFileMap`.

## Environment Variables

- **PORT**: Port number on which the server listens. Default is `4000`.

## Dependencies

- `express`: Web framework for Node.js.
- `fs`: Node.js file system module (native).
- `cors`: Package to enable CORS (Cross-Origin Resource Sharing).
- `dotenv`: Loads environment variables from a `.env` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

