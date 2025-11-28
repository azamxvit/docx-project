import React from "react";
import "./DocInfoCard.css";

import type { UploadedDoc } from "./types";

interface Props {
  file: UploadedDoc | File;
}

export const DocInfoCard: React.FC<Props> = ({ file }) => {
  const name = file instanceof File ? file.name : file.name;
  const size = file instanceof File ? file.size : file.size;
  const type = file instanceof File ? file.type : file.type;

  return (
    <section className="card">
      <header>
        <h2 className="title">Информация о документе</h2>
      </header>

      <main>
        <section className="row">
          <span>Название:</span>
          <strong>{name}</strong>
        </section>

        <section className="row">
          <span>Размер:</span>
          <strong>{(size / 1024).toFixed(2)} KB</strong>
        </section>

        <section className="row">
          <span>Тип:</span>
          <strong>{type || "Неизвестно"}</strong>
        </section>
      </main>

      <footer />
    </section>
  );
};
