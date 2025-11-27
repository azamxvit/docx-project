import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export const fillDocTemplate = async (
    file: File,
    data: Record<string, string>
): 

Promise<Blob> => {
    const arrayBuffer = await file.arrayBuffer();
    const zip = new PizZip(arrayBuffer);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    }
);


doc.setData(data);

    try {
        doc.render();
    }
    catch (error) {
        console.error("Ошибка в плейсхолдерах: ", error);
        throw new Error("Документ содержить ошибочные плейсхолдеры");
    }


const out = doc.getZip().generate(
    {
        type: "blob",
        mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
);


return out;
};