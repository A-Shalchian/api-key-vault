# API Key Vault

<div align="center">

  **Secure storage for your API keys with military-grade encryption**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

##  Screenshots

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="./public/API-KV-Thumbnail.png" alt="API Key Vault - Light Mode" />
        <p align="center"><em>Light Mode</em></p>
      </td>
      <td width="50%">
        <img src="./public/API-KV-Thumbnail-dark.png" alt="API Key Vault - Dark Mode" />
        <p align="center"><em>Dark Mode</em></p>
      </td>
    </tr>
  </table>
</div>

---

##  Overview

API Key Vault is a modern web application that allows developers to securely store, retrieve, and manage their API keys with **end-to-end encryption**. Built with the latest technologies, it provides a seamless experience for keeping your sensitive credentials safe while making them easily accessible when needed.

##  Features

-  **End-to-End Encryption** - API keys are encrypted using libsodium (NaCl) before storage
-  **Easy Key Management** - Store, retrieve, and organize all your API keys in one place
-  **User Authentication** - Secure authentication powered by Supabase Auth
-  **Row-Level Security** - Database-enforced access control with RLS policies
-  **Dark Mode Support** - Beautiful UI that adapts to your preference
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
-  **Fast & Modern** - Built with Next.js 15 and React 19
-  **Zero-Knowledge Architecture** - Your keys are encrypted client-side

##  Technology Stack

### Frontend
- **React 19** - Latest React features and performance
- **Next.js 15** - Server-side rendering and API routes
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first styling
- **Lucide React** - Beautiful icon library

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Supabase** - PostgreSQL database and authentication
- **libsodium** - Industry-standard encryption (NaCl)
- **Row-Level Security** - Database-level access control

### Database
- **PostgreSQL** (via Supabase) - Relational database
- **RLS Policies** - Secure data isolation per user

##  Security Features

### Encryption
- **Algorithm**: XSalsa20-Poly1305 (via libsodium)
- **Key Size**: 256-bit encryption keys
- **Nonce**: Random 24-byte nonce per encryption
- **AEAD**: Authenticated encryption prevents tampering

### Database Security
- **Row-Level Security (RLS)** - Users can only access their own data
- **Foreign Key Constraints** - Data integrity enforced at database level
- **Secure Authentication** - Powered by Supabase Auth with JWT tokens

### Best Practices
- Encryption keys stored separately from encrypted data
- API keys never stored in plaintext
- Server-side token verification on all protected routes
- HTTPS required in production

##  Usage

### Web Interface

1. **Sign Up / Login** - Create an account or sign in
2. **Store a Key** - Navigate to "Store Keys" and add your API key with a descriptive name
3. **View Keys** - Access your stored keys from the "Vault" page
4. **Copy Keys** - Click to reveal and copy keys when needed
5. **Manage Profile** - View analytics and manage your account

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- [Supabase](https://supabase.com/) - Backend infrastructure and authentication
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [libsodium](https://libsodium.gitbook.io/) - Encryption library

---

<div align="center">
  Made with ❤️ by developers, for developers
</div>
