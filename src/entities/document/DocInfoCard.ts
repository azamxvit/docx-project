import React from 'react';
import styles from './DocInfoCard.module.css';

import { UploadedDoc } from './types';


interface Props {
    file: UploadedDoc | File;
}

export const DocInfoCard: React.FC<Props> = ({ file }) => {
    const name = file instanceof File ? file.name : file.name;
    const file = file instanceof File ? file.size : file.size;
    const type = file instanceof File ? file.type : file.type;


    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <h2 className={styles.title}>Информация о документе</ h2>
            </ header>


            <main className={styles.bode}>
                <section className={styles.row}>
                    <span>Название:</ span>
                    <strong>{name}</strong>
                </ section>
            
                <section className={styles.row}>
                    <span>Размер:</ span>
                    <strong>{(file / 1024).toFixed(2)} KB</strong>
                </ section>

                <section className={styles.row}>
                    <span>Тип:</ span>
                    <strong>{type || 'Неизвестно'}</strong>
                </ section>
            </ main>


            <footer className={styles.footer}></footer> //мейбиии пригодится в будущем
        </ section>
    );
};