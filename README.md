# Shipping frontend

## Important

Make sure to have Docker installed.

## How to run

You can run the frontend locally using the Vite development server or building a Docker image that setup an Nginx server. I recommend the Docker image.

### Build Docker image

```bash
pnpm docker:build
```

This command will create a Docker image with the app. When finished, you need to setup the backend services in order to have a fully working app.

Navigate to the backend repository and follow the instructions in the README file.

### Run locally

```bash
pnpm install
pnpm dev
```

#### Environment configuration

Duplicate the `.env.example` file, rename it to `.env` and fill in the values using the values below (Just copy them):

```bash
VITE_API_BASE_URL=http://127.0.0.1:3000
VITE_API_BASE_URL_WS=ws://127.0.0.1:3000
```
