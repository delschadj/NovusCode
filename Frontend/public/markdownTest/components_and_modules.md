# Components and Modules

## Key Components and Modules

### Core Modules

*   **`app/layout.tsx`**: This is the root layout component for the application and defines the overall structure of the app. It includes providers for theme and session management.
*   **`app/(auth)/(signin)/page.tsx`**: This component handles user authentication using `next-auth`. It provides both social logins (GitHub) and email login options.
*   **`app/dashboard/layout.tsx`**: This layout component is specific to the dashboard section of the application. It includes the header and sidebar components.
*   **`components/kanban/kanban-board.tsx`**: This component implements the Kanban board functionality using `dnd-kit` and `zustand` for state management.
*   **`lib/store.ts`**: This module defines the `zustand` store used for managing the state of the Kanban board, including tasks and columns.

### Dependencies

*   **`next`**: The core Next.js framework.
*   **`next-auth`**: Library for handling authentication.
*   **`react-hook-form`**: Library for managing forms.
*   **`zod`**: Library for schema validation.
*   **`zustand`**: Library for state management.
*   **`@dnd-kit/core`**: Library for drag-and-drop functionality.
*   **`@uploadthing/react`**: Library for file uploading.
*   **`@tanstack/react-table`**: Library for data tables.
*   **`recharts`**: Library for charts.
*   **`lucide-react`**: Library for icons.
*   **`tailwind-merge`**: Library for merging Tailwind CSS classes.
*   **`clsx`**: Library for conditionally applying CSS classes.

