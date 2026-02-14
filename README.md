# Docx Web Manager

![Status](https://img.shields.io/badge/status-active-success)
![Tech](https://img.shields.io/badge/stack-Vite_|_React_|_TypeScript_|_FSD_|_Docxtemplater-blue)

A robust client-side application for dynamic document generation and processing. Built with **Feature-Sliced Design (FSD)** architecture, this project enables users to parse DOCX templates, detect placeholders, fill them with data, and preview the results instantly without server-side processing.

## 🚀 Key Features

- **Smart Document Processing**:
  - **Template Engine**: Powered by `docxtemplater` to inject data into `.docx` files programmatically (`fillDocTemplate.ts`).
  - **Placeholder Detection**: Automatically parses and identifies variable placeholders within uploaded documents (`parsePlaseholders.ts`).
- **Feature-Sliced Design**:
  - **Modular Architecture**: Strictly organized into **Entities** (Business Logic), **Features** (User Actions), and **Shared** (UI/Libs) layers for scalability.
  - **Isolation**: Clean separation of concerns between UI components (`DocInfoCard`) and service logic (`DocumentService`).
- **Client-Side Performance**:
  - **Instant Preview**: Renders DOCX layouts directly in the browser using `renderPreview` logic.
  - **Secure**: All file processing happens locally in the browser; no data is sent to external servers.

## 🛠 Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Architecture**: Feature-Sliced Design (FSD)
- **Processing**:
  - `docxtemplater` (Templating)
  - `pizzip` (Zip manipulation)
  - `docx-preview` / `mammoth` (Rendering)
- **Styling**: CSS Modules, PostCSS
- **State & Hooks**: Custom hooks (`useFileUpload`, `useAsync`)

## ⚙️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/azamxvit/docx-project.git](https://github.com/azamxvit/docx-project.git)
    cd docx-project
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or pnpm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

## 🏗 Architecture & Decisions

The project follows **Feature-Sliced Design (FSD)** to ensure maintainability:

- **`app/`**: Application entry point, providers, and global styles.
- **`pages/`**: Composition layer constructing full views (e.g., `UploadPage`).
- **`features/`**: User interactions that bring value:
  - `docx-processing`: Core logic for filling templates and parsing tags.
  - `file-upload`: Handling file selection and drag-and-drop mechanics.
- **`entities/`**: Business entities (e.g., `document`) containing domain logic and specific UI cards (`DocInfoCard`).
- **`shared/`**: Reusable infrastructure code (UI Kit, generic hooks like `useAsync`, and helper libs).

## 🎥 Project Structure

```text
src/
  ├── app/                 # Entry point & setup
  │   └── App.tsx
  ├── pages/               # Routing pages
  │   └── UploadPage/      # Main upload interface
  ├── features/            # User scenarios
  │   ├── docx-processing/ # Templating logic
  │   └── file-upload/     # File handling hooks
  ├── entities/            # Business models
  │   └── document/        # Doc service & display cards
  └── shared/              # Reusable components & utils
      ├── components/      # UI Kit (Buttons, etc.)
      ├── hooks/           # Generic hooks (useAsync)
      └── lib/             # Helpers (renderPreview)
