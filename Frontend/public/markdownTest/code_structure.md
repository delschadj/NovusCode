Here's your formatted text:

Code Structure
Directory Layout
Examine the directory structure to understand where different types of files and modules are located.

css
Copy code
├── app
│   ├── dashboard
│   │   ├── kanban
│   │   │   └── page.tsx
│   │   ├── employee
│   │   │   ├── [employeeId]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── user
│   │   │   ├── [userId]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── (auth)
│   │   └── (signin)
│   │       └── page.tsx
│   ├── api
│   │   ├── uploadthing
│   │   │   ├── route.ts
│   │   │   └── core.ts
│   │   └── auth
│   │       └── [...nextauth]
│   │           └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components
│   ├── kanban
│   │   ├── new-task-dialog.tsx
│   │   ├── new-section-dialog.tsx
│   │   ├── column-action.tsx
│   │   ├── task-card.tsx
│   │   └── board-column.tsx
│   ├── layout
│   │   ├── ThemeToggle
│   │   │   ├── theme-provider.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── user-nav.tsx
│   │   ├── sidebar.tsx
│   │   ├── sidebar-old.tsx
│   │   ├── providers.tsx
│   │   ├── page-container.tsx
│   │   ├── mobile-sidebar.tsx
│   │   └── header.tsx
│   ├── modal
│   │   └── alert-modal.tsx
│   ├── tables
│   │   ├── user-tables
│   │   │   ├── columns.tsx
│   │   │   ├── client.tsx
│   │   │   └── cell-action.tsx
│   │   └── employee-tables
│   │       ├── employee-table.tsx
│   │       ├── columns.tsx
│   │       └── cell-action.tsx
│   ├── ui
│   │   ├── use-toast.ts
│   │   ├── tooltip.tsx
│   │   ├── toaster.tsx
│   │   ├── toast.tsx
│   │   ├── textarea.tsx
│   │   ├── tabs.tsx
│   │   ├── table.tsx
│   │   ├── switch.tsx
│   │   ├── slider.tsx
│   │   ├── skeleton.tsx
│   │   ├── sheet.tsx
│   │   ├── separator.tsx
│   │   ├── select.tsx
│   │   ├── scroll-area.tsx
│   │   ├── popover.tsx
│   │   ├── modal.tsx
│   │   ├── label.tsx
│   │   ├── input.tsx
│   │   ├── heading.tsx
│   │   ├── form.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── data-table.tsx
│   │   ├── collapsible.tsx
│   │   ├── checkbox.tsx
│   │   ├── chart.tsx
│   │   ├── calendar.tsx
│   │   ├── button.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── alert.tsx
│   │   └── alert-dialog.tsx
│   ├── forms
│   │   ├── user-profile-stepper
│   │   │   └── create-profile.tsx
│   │   ├── user-auth-form.tsx
│   │   ├── product-form.tsx
│   │   └── employee-form.tsx
│   ├── charts
│   │   ├── pie-graph.tsx
│   │   ├── bar-graph.tsx
│   │   └── area-graph.tsx
│   ├── recent-sales.tsx
│   ├── overview.tsx
│   ├── github-auth-button.tsx
│   ├── file-upload.tsx
│   ├── date-range-picker.tsx
│   └── dashboard-nav.tsx
├── constants
│   └── data.ts
├── hooks
│   ├── useSidebar.tsx
│   └── useMultistepForm.tsx
├── lib
│   ├── utils.ts
│   ├── store.ts
│   └── form-schema.ts
├── public
│   ├── vercel.svg
│   └── next.svg
├── types
│   ├── next-auth.d.ts
│   └── index.ts
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
├── next.config.js
├── middleware.ts
├── env.example.txt
├── components.json
├── auth.ts
├── auth.config.ts
├── README.md
├── LICENSE
├── .prettierrc
├── .gitignore
├── .eslintrc.json
└── .husky
    └── pre-commit
app: This directory contains the application's main layout, global styles, and page components.
dashboard: This subdirectory houses the components and pages related to the dashboard.
(auth): This subdirectory contains components and pages related to authentication.
api: This subdirectory contains serverless functions and API routes.
globals.css: This file defines global styles for the application.
layout.tsx: This file defines the main layout of the application.
not-found.tsx: This file defines the 404 page.
components: This directory contains reusable UI components.
kanban: This subdirectory contains components related to the kanban board.
layout: This subdirectory contains components related to the layout of the application.
modal: This subdirectory contains components related to modals.
tables: This subdirectory contains components related to tables.
ui: This subdirectory contains basic UI components.
forms: This subdirectory contains components related to forms.
charts: This subdirectory contains components related to charts.
constants: This directory contains constant values and data used in the application.
hooks: This directory contains custom React hooks.
lib: This directory contains utility functions and helpers.
public: This directory contains static assets that are publicly accessible.
types: This directory contains TypeScript type definitions.
tailwind.config.js: This file contains the configuration for Tailwind CSS.
postcss.config.js: This file contains the configuration for PostCSS.
package.json: This file contains the project's dependencies and scripts.
package-lock.json: This file contains the exact versions of the project's dependencies.
next.config.js: This file contains the configuration for Next.js.
middleware.ts: This file defines middleware functions for Next.js.
env.example.txt: This file is an example environment file.
components.json: This file contains the configuration for Shadcn UI.
auth.ts: This file defines the authentication configuration.
auth.config.ts: This file defines the authentication configuration.
README.md: This file contains the project's documentation.
LICENSE: This file contains the project's license.
.prettierrc: This file contains the configuration for Prettier.
.gitignore: This file specifies files and directories that should be ignored by Git.
.eslintrc.json: This file contains the configuration for ESLint.
.husky: This directory contains the configuration for Husky.
This directory structure provides a clear and organized way to manage the codebase, making it easy to find and maintain different parts of the application.