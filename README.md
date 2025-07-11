# API Key Vault

A secure storage solution for managing and encrypting API keys built with Next.js, Prisma, and Supabase.

## Overview

API Key Vault is a web application that allows users to securely store, retrieve, and manage their API keys. With end-to-end encryption, your sensitive credentials remain protected while being easily accessible when needed for your applications.

## Features

- **Secure Storage**: End-to-end encryption for all API keys
- **Easy Retrieval**: Simple API for storing and retrieving keys
- **User Management**: Authentication and authorization
- **Modern UI**: Clean interface built with React and Tailwind CSS

## Technology Stack

- **Frontend**: React 19, Next.js 15
- **Backend**: Next.js API Routes
- **Database**: Prisma with Supabase
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/A-Shalchian/api-key-vault.git
   cd api-key-vault
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# PostgreSQL connection for Prisma
DATABASE_URL=postgresql://user:password@host:5432/database

# 32-byte symmetric key (Base64).  Generate with:
#   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
ENCRYPTION_KEY=your_base64_key

# (Optional) Development only: allow a throw-away random key if ENCRYPTION_KEY is missing.
ALLOW_DEV_RANDOM_KEY=true
```

4. Set up the database schema:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

The application provides both a web interface and API endpoints for managing your keys:

### Web Interface

Navigate to the homepage to access the key management dashboard where you can:
- Add new API keys
- View existing keys
- Delete or modify stored keys

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
