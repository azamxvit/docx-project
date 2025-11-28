import React from "react";
import { UploadPage } from "../pages/UploadPage/UploadPage";

export const App: React.FC = () => {
  return (
    <>
      <header>
        <nav>
          <h1>DOCX Project</h1>
        </nav>
      </header>

      <main>
        <UploadPage />
      </main>

      <footer>
        <p>© 2025 DOCX Tools</p>
      </footer>
    </>
  );
};
