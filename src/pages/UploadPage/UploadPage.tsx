import React, { useState } from 'react';
import './UploadPage.css';

import { Button } from '../../shared/components/Button';
import { useFileUpload } from '../../features/file-upload/useFileUpload';
import { DocInfoCard } from '../../entities/document/DocInfoCard';
import { MOCK_DATA } from '../../features/file-upload/mockData';

export const UploadPage: React.FC = () => {
    const { file, parsedInfo, handleFileChange, upload, isLoading, error, fillAndDownload } = useFileUpload();

    
    const [formData, setFormData] = useState<Record<string, string>>(MOCK_DATA);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fillAndDownload(formData);
    };

    return (
        <main className="pages">
            <header>
                <h1 className="title">Загрузка документа</h1>
            </header>

            <section className="uploadSection">
                <input
                    type="file"
                    accept=".doc,.docx"
                    onChange={handleFileChange}
                    className="input"
                    aria-label="Выберите файл .docx"
                />

                <Button disabled={isLoading} onClick={upload}>
                    {isLoading ? "Обработка..." : "Загрузить и обработать"}
                </Button>
            </section>

            {error && <p className="error">{error}</p>}

            {file && (
                <section className="preview">
                    <DocInfoCard file={file} />
                </section>
            )}

            {parsedInfo && (
                <section className="docInfoDetails">
                    <header>
                        <strong>Количество страниц:</strong> {parsedInfo.pageCount ?? 'Неизвестно'}
                    </header>

                    <section className="placeholdersList">
                        <h3>Плейсхолдеры в документе:</h3>
                        {parsedInfo.placeholders.length === 0 ? (
                            <div>Плейсхолдеры не найдены</div>
                        ) : (
                            <ul>
                                {parsedInfo.placeholders.map((p) => (
                                    <li key={p}>{p}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                    
     <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        {Object.entries(formData).map(([key, value]) => (
             <div key={key} style={{ marginBottom: 10 }}>
                 <label htmlFor={key} style={{ fontWeight: "bold", display: "block" }}>
                    {key}:
                  </label>
                    {key === "NOTES" ? (
                <textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    rows={3}
                    style={{ width: "100%" }} /> ) : (
                <input
                id={key}
                name={key}
                type="text"
                value={value}
                onChange={handleChange}
                style={{ width: "100%" }} />
        )}
                </div>
))}

    <footer className="placeholdersActions">
        <Button disabled={isLoading} type="submit">
            Сформировать и скачать (с данными из формы)
        </Button>
    </footer>
                    </form>
                </section>
            )}
        </main>
    );
};
