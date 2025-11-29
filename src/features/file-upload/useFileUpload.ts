import { useState } from 'react';
import { DocumentService } from '../../entities/document/DocumentService';
import { fillDocTemplate } from '../docx-processing/fillDocTemplate';
import type { ParsedDocInfo } from '../../entities/document/types';


export const useFileUpload = () => {
    const [file, setFile] = useState<File | null >(null);
    const [parsedInfo, setParsedInfo] = useState<ParsedDocInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null >(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);


        const selected = e.target.files?.[0];
        if (!selected) return;


        // accept both .docx and .doc; .doc will be allowed but parsing/filling is only supported for .docx
        if (!selected.name.endsWith(".docx") && !selected.name.endsWith('.doc')) {
            setError("Поддерживаются только .docx и .doc файлы");
            return;
        }

        setFile(selected);
    };

    const upload = async () => {
        if (!file) {
            setError("Файл не выбран");
            return;
        }

        setIsLoading(true);

        try {
            
            if (file) {
                const info = await DocumentService.parse(file);
                setParsedInfo(info);
            }

            // fake upload delay kept for UX
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        catch {
            setError("Ошибка при загрузке файла");
        } finally {
            setIsLoading(false);
        }
    };

        const fillAndDownload = async (data: Record<string,string>) => {
            if (!file) {
                setError('Файл не выбран');
                return;
            }

            setIsLoading(true);

            try {
                if (!file!.name.toLowerCase().endsWith('.docx')) {
                    throw new Error('Заполнение поддерживается только для .docx файлов на клиенте');
                }
                const blob = await fillDocTemplate(file, data);
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const downloadName = file.name.replace(/\.docx?$/i, '') + '_filled.docx';
                
                a.href = url;
                a.download = downloadName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            } catch {
                setError('Ошибка при заполнении документа');
            } finally {
                setIsLoading(false);
            }
        };



    return {
        file,
        parsedInfo,
        isLoading,
        error,
        handleFileChange,
        upload,
        fillAndDownload,
    };
};