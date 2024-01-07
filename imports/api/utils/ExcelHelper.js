export const ExcelParser = (sheet, rowIndex) => {
    try {
        const productInfo = {
            // -----------------------------------------------User Information
            productType: sheet.getCell(`D${rowIndex}`).value,
            name: sheet.getCell(`A${rowIndex}`).value,
            barcode: sheet.getCell(`B${rowIndex}`).value,
            category: sheet.getCell(`C${rowIndex}`).value,
            internalReference: sheet.getCell(`E${rowIndex}`).value,
            manufacturerreference: sheet.getCell(`F${rowIndex}`).value,
            brand: sheet.getCell(`G${rowIndex}`).value,
            salesPrices: sheet.getCell(`H${rowIndex}`).value,
            publicPrice: sheet.getCell(`I${rowIndex}`).value,
            result: sheet.getCell(`J${rowIndex}`).value,
            type: sheet.getCell(`K${rowIndex}`).value,
            tax: sheet.getCell(`L${rowIndex}`).value,
            vat: sheet.getCell(`M${rowIndex}`).value,
        };
        return { productInfo };
    } catch (e) {
        throw e;
    }
}
export const CustomerExcelParser = (sheet, rowIndex) => {
    try {
        const customerInfo = {
            // -----------------------------------------------User Information
            civility: sheet.getCell(`B${rowIndex}`).value,
            fullName: sheet.getCell(`A${rowIndex}`).value,
            email: sheet.getCell(`C${rowIndex}`).value,
            uid: sheet.getCell(`D${rowIndex}`).value,
            phoneNumber: sheet.getCell(`E${rowIndex}`).value,
            socialReason: sheet.getCell(`F${rowIndex}`).value,
            website: sheet.getCell(`G${rowIndex}`).value,
            country: sheet.getCell(`H${rowIndex}`).value,
            region: sheet.getCell(`I${rowIndex}`).value,
            postalCode: sheet.getCell(`J${rowIndex}`).value,
        };
        return { customerInfo };
    } catch (e) {
        throw e;
    }
}

export const SupplierExcelParser = (sheet, rowIndex) => {
    try {
        const supplierInfo = {
            // -----------------------------------------------User Information
            civility: sheet.getCell(`B${rowIndex}`).value,
            fullName: sheet.getCell(`A${rowIndex}`).value,
            email: sheet.getCell(`C${rowIndex}`).value,
            uid: sheet.getCell(`D${rowIndex}`).value,
            phoneNumber: sheet.getCell(`E${rowIndex}`).value,
            socialReason: sheet.getCell(`F${rowIndex}`).value,
            website: sheet.getCell(`G${rowIndex}`).value,
            country: sheet.getCell(`H${rowIndex}`).value,
            region: sheet.getCell(`I${rowIndex}`).value,
            postalCode: sheet.getCell(`J${rowIndex}`).value,
        };
        return { supplierInfo };
    } catch (e) {
        throw e;
    }
}