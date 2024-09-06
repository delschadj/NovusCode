# General Information

## Project Overview

This project is a Next.js 14 admin dashboard starter template built with the Next.js App Router and Shadcn-ui. It provides a basic dashboard with various features and functionalities, including authentication, data tables, forms, charts, and a Kanban board.

## Main Objectives

The main objectives of this project are:

- To provide a pre-built and customizable dashboard template for developers to quickly start building their own admin dashboards.
- To showcase the use of modern web technologies such as Next.js 14, TypeScript, Tailwind CSS, and Shadcn-ui.
- To demonstrate best practices for authentication, state management, data fetching, and UI component design.

## Architecture

### Main Components

The project is structured using the Next.js App Router and consists of the following main components:

- **Pages:**
    - `/`: Signup page with authentication using NextAuth.js (supports social and email logins).
    - `/dashboard`: Main dashboard page with cards and charts for analytics.
    - `/dashboard/user`: User management page with TanStack tables for displaying user details.
    - `/dashboard/user/new`: User creation form with Uploadthing for file uploading.
    - `/dashboard/employee`: Employee management page with TanStack tables and server-side functionalities.
    - `/dashboard/profile`: User profile page with multi-step forms and form validation.
    - `/dashboard/kanban`: Kanban board for task management using dnd-kit and Zustand.
    - `/dashboard/notfound`: Not Found page.

- **Components:**
    - UI components from Shadcn-ui, providing a consistent and customizable design system.
    - Custom components for specific functionalities, such as charts, forms, tables, and the Kanban board.

- **API Routes:**
    - `/api/auth/[...nextauth]`: API route for handling authentication with NextAuth.js.
    - `/api/uploadthing`: API route for file uploading using Uploadthing.

- **State Management:**
    - Zustand is used for managing the state of the Kanban board.

- **Data Fetching:**
    - Data for the employee table is fetched from an external API.

### Interaction

- Pages are rendered using the Next.js App Router, providing server-side rendering and client-side navigation.
- Authentication is handled by NextAuth.js, which integrates with the API routes.
- UI components are used to build the user interface, and data is fetched and displayed using API routes and state management.
- The Kanban board utilizes dnd-kit for drag-and-drop functionality and Zustand for persisting the state locally.

## Important Things to Know

- **Environment Variables:** The project requires environment variables for authentication and file uploading. Make sure to create a `.env.local` file and add the necessary variables.
- **Dependencies:** The project uses various dependencies, including Next.js, TypeScript, Tailwind CSS, Shadcn-ui, Zod, Zustand, Auth.js, Uploadthing, TanStack Tables, and React Hook Form. Familiarize yourself with these technologies.
- **Code Structure:** The project follows a structured code organization with separate folders for pages, components, API routes, and types. Adhere to the existing code structure when making changes.
- **Styling:** Tailwind CSS is used for styling. Learn the basics of Tailwind CSS to customize the appearance of the dashboard.
- **Authentication:** Authentication is implemented using NextAuth.js. Understand the authentication flow and how to protect routes.
- **State Management:** The Kanban board uses Zustand for state management. Learn how to use Zustand to manage the state of your components.
- **Data Fetching:** Data for the employee table is fetched from an external API. Understand how to fetch data from APIs and display it in the dashboard.
