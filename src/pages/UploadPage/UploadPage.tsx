import React from 'react';
import styles from './UploadPage.css';

import { Button } from '@shared/ui/Button/Button';
import { useFileUpload } from '@features/file-upload/useFileUpload.ts';
import { DocInfoCard } from '@entities/document/DocInfoCard.tsx';

export const UploadPage: React.FC = () => {
    const { file, handleFileChange, handleUpLoad } = useFileUpload ();



    return (
        <main className={styles.pages}>

        <header>
        <h1 className={styles.title}>Загрузка документа</ h1>
        </ header>

        <section className={styles.uploadSection}>
        <input 
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className={styles.input}
        />

        <Button disabled={isLoading}>
            {isLoading ? "Обработка..." : "Загрузить и обработать"}
        </ Button>
        </ section>

        {error && <p className=styles.error}> {error} </ p>}

        {file && (
            <section className={styles.preview}>
                <DocInfoCard file={file} />
            </ section>
        )}
        </ main>
    );
};