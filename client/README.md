# Notice Analyzer Replier

This project is a web application designed to analyze tax notices and facilitate user replies. It allows users to upload notices, view them, and draft responses based on the analysis provided by the application.

## Features

- Upload tax notices in PDF format.
- View a list of uploaded notices.
- Analyze the content of notices to extract relevant information.
- Draft replies to notices based on the analysis.

## Technologies Used

- React for the frontend.
- Express.js for the backend.
- MongoDB for data storage.
- Cloudinary for file storage.
- Google Gemini API for text analysis and generation.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up and accessible.
- Cloudinary account for file storage.
- Google Gemini API access.

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory:

   ```
   cd client
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root of the client directory and add the necessary environment variables.

### Running the Application

1. Start the development server:

   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

### API Endpoints

- `POST /api/notices/upload`: Upload a new notice.
- `GET /api/notices`: Retrieve a list of notices.
- `GET /api/notices/:id`: Retrieve details of a specific notice.
- `PUT /api/notices/:id/reply`: Update the reply for a specific notice.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
