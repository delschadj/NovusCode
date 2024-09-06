# Build and Deployment Process

## Build Tools

This project uses **npm** as the build tool. 

## Deployment Pipeline

This project is designed to be deployed on **Vercel**. Vercel provides a seamless CI/CD pipeline for Next.js applications.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env.local` file:**

   ```bash
   cp env.example.txt .env.local
   ```

4. **Add environment variables:**

   Open the `.env.local` file and add the necessary environment variables. Refer to the comments within the file for guidance.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

The application should now be accessible at `http://localhost:3000`.
