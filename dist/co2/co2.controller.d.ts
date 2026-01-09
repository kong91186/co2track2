import * as ExcelJS from 'exceljs';
export declare class Co2Controller {
    save(data: any): Promise<{
        message: string;
    }>;
    getAll(): Promise<{
        id: string;
    }[]>;
    exportExcel(): Promise<ExcelJS.Buffer>;
}
