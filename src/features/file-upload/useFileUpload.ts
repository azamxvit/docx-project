import { useState } from 'react';


export const useFileUpload = () => {
    const [file, setFile] = useState<File | null >(null);
    const [idLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null >(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);


        const selected = e.target.files?.[0];
        if (!selected) return;


        if (!selected.name.endsWith(".docx")) {
            setError("Поддерживаются только .docx файлы");
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
            // аза это заглушка, заменишь на апишку
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        catch {
            setError("Ошибка при загрузке файла");
        } finally {
            setIsLoading(false);
        }
    };



    return {
        file,
        isLoading,
        error,
        handleFileChange,
        upload,
    };
};