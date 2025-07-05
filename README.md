# LHS Connect

> Quick links, Bell Schedule, Club list, and more! All in one easy-to-use student hub for Lincoln High School in Seattle.

- Quick Links to popular pages
- Bulletin Board
- Bell Schedule
- Contact Info for departments & other useful links
- Club List
- Short Link Generator (with short url `lhs.cx`)
- QR Code Generator
- File Upload/Transfer

## Features
- Data is easily editable via the admin panel
- Responsive design
- Both light & dark mode
- Admin panel
  - Public for anybody to view
  - Google OAuth for signing in
  - Permission system
- Contact Us form, forwarded to a Discord Webhook

## Technology
- [Typescript](https://www.typescriptlang.org/)
- [SvelteKit](https://kit.svelte.dev/)
- [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
- [S3](https://aws.amazon.com/s3/)/[R2](https://r2.cloudflare.com/) (for file uploads)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite-svelte.com/) (for UI components)
- [Lucia](https://lucia-auth.com/) with [Google OAuth](https://developers.google.com/identity/protocols/oauth2) (for authentication)
- [Prettier](https://prettier.io/) (for code formatting)

# Developing

## Program Prerequisites

### Required Programs:
- [NodeJS](https://nodejs.org/en), a JavaScript Engine
- [pnpm](https://pnpm.io/installation#using-corepack), a package manager for handling libraries
  - Its recommended to use `corepack enable pnpm` install install it, corepack is included in the NodeJS install
- [Git](https://git-scm.com/), for source control
  
### Recommended Programs:
- [VSCode](https://code.visualstudio.com/Download), an all around IDE
  - Recommended Extensions:
    - [Svelte for VSCode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
    - [Svelte Intellisense](https://marketplace.visualstudio.com/items?itemName=ardenivanov.svelte-intellisense)
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Local Project Setup

Download and navigate to the repo:
```shell
git clone https://github.com/1withspaghetti/LHS-Connect-Svelte
cd LHS-Connect-Svelte
```

Install the libraries with pnpm:
```shell
pnpm install
```

### Commands

Start the development server:
```shell
pnpm run dev
```

Run [Prettier](https://prettier.io/) to format the code:
```shell
pnpm run format
```

Build the project and preview it:
```shell
pnpm run build
pnpm run preview
```

## Configuring environment variables

Create a copy of [`.env.example`](/.env.example) named `.env` to define environment variables, or use the hosting service's panel to define them.

**Refer to the [3rd Party Services](#3rd-party-services) section for more information on how to set up the required services.**
```properties
# App
PUBLIC_BASE_URL="https://lhsconnect.com" # Use http://localhost:5173 for local development
PUBLIC_BASE_SHORT_URL="https://lhs.cx" # Use https://localhost:5173 for local development

# Database
MONGO_DB_URI=mongodb://localhost:27017/

# S3 Bucket for file transfer uploads
# Suggested to use cloudflare r2 or aws s3
S3_ACCESS_KEY_ID="ACCESS_KEY"
S3_SECRET_ACCESS_KEY="SECRET_KEY"
S3_ENDPOINT="ENDPOINT" # e.g. https://[BUCKET_NAME].[ACCOUNT_ID].r2.cloudflarestorage.com
S3_BUCKET_NAME="BUCKET_NAME"

# Auth
# Created by registering a new app at https://console.developers.google.com/
GOOGLE_CLIENT_ID="ID_HERE"
GOOGLE_CLIENT_SECRET="SECRET_HERE"

# A link added to the admin panel for anybody to view
PUBLIC_ANALYTICS_URL="" # Umami or google analytics or some other public link to an analytics service (optional)

# Discord webhook for sending messages to a channel when somebody submits the contact form
DISCORD_WEBHOOK_URL=""
```

## 3rd Party Services
To run the app, you will need to set up a few services and environment variables.

### MongoDB

You will need a MongoDB database to store the app's data. You can either use a hosting service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended) or [self-host](https://www.mongodb.com/docs/manual/installation/) on a VPS.

Then, set the following environment variables to allow the app to access the db:
```properties
MONGO_DB_URI="YOUR_MONGO_DB_URI"
```

Make sure the db uri has permission to read/write to a `prod` database when used in production, and a `dev` database when being used in development. Well it is recommended to use different users/uris/databases for each environment, it does work to to use the same uri/user/database for both places, and the code will select which of `prod` or `dev` to use based on the node environment.

### S3/R2 Bucket
You will need an S3 bucket to store file uploads. You can use [Cloudflare R2](https://r2.cloudflare.com/) (suggested) or [AWS S3](https://aws.amazon.com/s3/) for this. You can keep the bucket private, as the app will handle file access through signed URLs.

Make sure to set the following environment variables to allow the app to access the bucket:
```properties
S3_ACCESS_KEY_ID="ACCESS_KEY"
S3_SECRET_ACCESS_KEY="SECRET_KEY"
S3_ENDPOINT="https://[BUCKET_NAME].[ACCOUNT_ID].r2.cloudflarestorage.com"
S3_BUCKET_NAME="BUCKET_NAME"
```

**IF USING CLOUDFLARE R2:** Make sure to set the correct CORS Policy in the bucket dashboard settings:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:5173",
      "https://lhsconnect.com"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST"
    ],
    "AllowedHeaders": [
      "Content-Type"
    ]
  }
]
```

### Google OAuth

Follow instructions [here](https://support.google.com/googleapi/answer/6158849?hl=en).

In the cloud console, make sure to add the following as **Authorized JavaScript origins**:

- `https://lhsconnect.com`
- `http://localhost:5173`

And the following as **Authorized redirect URIs**:

- `https://lhsconnect.com/admin/login/google/callback`
- `http://localhost:5173/admin/login/google/callback`

And finally define the environment variables in `.env` or your hosting provider:

```properties
GOOGLE_CLIENT_ID="[id].apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="[secret]"
```

### Discord Webhook (optional)

You can set up a Discord webhook to receive messages when users submit the Contact Us form. To do this, create a webhook in your Discord server, copy the link, and set the following environment variable:

```properties
# Optional, leave empty to disable
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/[webhook_id]/[webhook_token]"
```

### Analytics (optional)

You can integrate various analytics services to track user interactions and gather insights about your application. Some popular options include:

- [Google Analytics](https://analytics.google.com/)
- [Umami](https://umami.is/) (suggested for self-hosting)
- [PostHog](https://posthog.com/)

To set up analytics, follow the documentation for the service you choose and add the necessary scripts or SDKs to the project.

You can also set a public link to view public analytics, visible to everybody in the admin panel by defining the following environment variable:

```properties
# Public Analytics URL (optional, set to "" to disable)
PUBLIC_ANALYTICS_URL="https://analytics.example.com"
```