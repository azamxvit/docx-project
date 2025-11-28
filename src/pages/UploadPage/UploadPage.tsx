import React from 'react';
import './UploadPage.css';

import { Button } from '../../shared/components/Button';
import { useFileUpload } from '../../features/file-upload/useFileUpload';
import { DocInfoCard } from '../../entities/document/DocInfoCard';

export const UploadPage: React.FC = () => {
    const { file, handleFileChange, upload, isLoading, error } = useFileUpload();



    return (
        <main className="pages">

        <header>
        <h1 className="title">Загрузка документа</h1>
        </header>

        <section className="uploadSection">
                <input
                    type="file"
                    accept=".docx"
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
        </ main>
    );
};