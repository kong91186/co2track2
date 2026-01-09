"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Co2Controller = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../firebase/firebase-admin");
const ExcelJS = __importStar(require("exceljs"));
let Co2Controller = class Co2Controller {
    async save(data) {
        await firebase_admin_1.firestore.collection('travel_logs').add({
            ...data,
            timestamp: new Date(),
        });
        return { message: 'saved' };
    }
    async getAll() {
        const snap = await firebase_admin_1.firestore.collection('travel_logs').get();
        return snap.docs.map(d => ({
            id: d.id,
            ...d.data(),
        }));
    }
    async exportExcel() {
        const snap = await firebase_admin_1.firestore.collection('travel_logs').get();
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('CO2 Logs');
        sheet.columns = [
            { header: 'Origin', key: 'origin', width: 15 },
            { header: 'Destination', key: 'destination', width: 15 },
            { header: 'Distance (km)', key: 'distance_km', width: 15 },
            { header: 'Vehicle', key: 'vehicle', width: 15 },
            { header: 'Fuel', key: 'fuel', width: 15 },
            { header: 'CO2 (kg)', key: 'co2', width: 10 },
            { header: 'One Way', key: 'one_way', width: 10 },
            { header: 'User Type', key: 'userType', width: 15 },
            { header: 'Timestamp', key: 'timestamp', width: 20 },
        ];
        snap.docs.forEach(doc => {
            sheet.addRow(doc.data());
        });
        return await workbook.xlsx.writeBuffer();
    }
};
exports.Co2Controller = Co2Controller;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Co2Controller.prototype, "save", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Co2Controller.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('export/excel'),
    (0, common_1.Header)('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename=co2_logs.xlsx'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Co2Controller.prototype, "exportExcel", null);
exports.Co2Controller = Co2Controller = __decorate([
    (0, common_1.Controller)('co2')
], Co2Controller);
//# sourceMappingURL=co2.controller.js.map