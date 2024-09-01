# Dahlia Parking Application

The purpose of the Dahlia project is to address the challenges and frustrations associated with urban parking by providing a seamless and convenient on-demand parking solution for urban dwellers. Dahlia aims to simplify the parking process, enhance user experience, and improve accessibility to parking spaces in congested city centers.

## Tools

This is a Next.js application built with TypeScript, utilizing NextAuth for authentication. The app supports Google OAuth for user authentication and Leaflet for Maps.

## Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or later)
- npm or yarn
- Google Cloud Console account to obtain OAuth credentials

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Project-Dahlia/Dahlia.git
cd cd/packages/frontend
```

### 2. Install Dependencies

```bash
    npm install
    # or
    yarn install
```

### 3. Configure Environment Variables

Create a .env.local file in the root directory of your project and add the following variables:

    NEXTAUTH_SECRET=your-nextauth-secret
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_JWT_SECRET=your-nextauth-jwt-secret
    BACKEND_URL=http://localhost:3001

- NEXTAUTH_SECRET: A secret key for NextAuth session encryption.
- NEXTAUTH_URL: The base URL of your application (usually http://localhost:3000 in development).
- GOOGLE_CLIENT_ID: Your Google OAuth Client ID.
- GOOGLE_CLIENT_SECRET: Your Google OAuth Client Secret.
- NEXTAUTH_JWT_SECRET: A secret key for signing JSON Web Tokens (JWT).
- BACKEND_URL: The URL of your backend API or services.

### 4. Obtain Google OAuth Credentials

- Go to the Google Cloud Console.
- Create a new project (or select an existing one).
- Navigate to APIs & Services > Credentials.
- Create an OAuth 2.0 Client ID under OAuth consent screen.
- Add the Authorized redirect URIs for your app: http://localhost:3000/api/auth/callback/google
- Copy the Client ID and Client Secret and paste them into your .env.local file.

### 5. Run the Development Server

To build and start the production server:

```bash
    npm run build
    npm start
    # or
    yarn build
    yarn start
```

## Contributing

If you'd like to contribute to this project, please fork the repository, create a new branch, and submit a pull request using the contributing template present in the repository.

### License

This project is licensed under the MIT License.
