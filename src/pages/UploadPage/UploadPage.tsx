import React from 'react';
import './UploadPage.css';

import { Button } from '../../shared/components/Button';
import { useFileUpload } from '../../features/file-upload/useFileUpload';
import { DocInfoCard } from '../../entities/document/DocInfoCard';

export const UploadPage: React.FC = () => {
    const { file, parsedInfo, handleFileChange, upload, isLoading, error, fillAndDownload } = useFileUpload();

    const MOCK_DATA: Record<string, string> = {
        PROJECT_NUMBER: "199437",
        DOCUMENT_TITLE: "Passport RoK Regulations Equipment. LPG Export Project",
        INFORMATION_CLASSIFICATION: "Internal",
        SUPPLIER_NAME: "ERREESSE CASPIAN VALVES LLP",
        CONTRACT_NUMBER: "99573",
        TAG_NUMBER: "A1-2210-ESV-036",
        NOTES: "",
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
        </ section>

        {error && <p className="error">{error}</p>}

        {file && (
            <section className="preview">
                <DocInfoCard file={file} />
            </ section>
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


                <footer className="placeholdersActions">
                
                    <Button disabled={isLoading} onClick={() => fillAndDownload(MOCK_DATA)}>
                        Сформировать и скачать (mock)
                    </Button>
                
                </footer>
            </section>
        )}
        </ main>
    );
};