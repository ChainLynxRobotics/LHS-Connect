# LHS Connect

Quick links, Bell Schedule, Club list, and more! All in one easy-to-use student hub for Lincoln High School in Seattle.

## Services

- Quick Links to popular pages
- Bulletin Board
- Bell Schedule
- Contact Info for departments & other useful links
- Club List
- Short Link Generator (with short url `lhs.cx`)
- QR Code Generator
- File Transfer

## Features

- Both light & dark mode
- Admin panel
  - Public for anybody to view
  - Google OAuth for signing in
  - Permission system
- All one mongodb database
- [Umami](https://umami.is/) analytics support

## Developing

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Configure environment variables

Create a copy of [`.env.example`](/.env.example) named `.env` to define environment variables.

When deploying via a hosting service, use the deployment service's panel to define all the same variables that are seen in the [`.env.example`](/.env.example) file ([coolify example](https://coolify.io/docs/knowledge-base/environment-variables))

### Step 3: Run the dev server

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Setting up Google OAuth

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

## Setting up MongoDB

By either using a hosting service ([coolify example](https://coolify.io/docs/databases/)) or [self-hosting](https://www.mongodb.com/docs/manual/installation/), set up a database and set the `MONGO_DB_URI` env variable to the database uri in the format of `mongodb://localhost:27017/`.

Make sure the db uri has permission to read/write to a `prod` database when used in production, and a `dev` database when being used in development. Well it is recommended to use different users/uris/databases for each environment, it does work to to use the same uri/user/database for both places, and the code will select which of `prod` or `dev` to use based on the node environment.

## Building

To create a production version of the app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

When using the [node-adapter](https://svelte.dev/docs/kit/adapter-node) (the default adapter), configure your hosting service to start the server with the following command:

```bash
node build
```
