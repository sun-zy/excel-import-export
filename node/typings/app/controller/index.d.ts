// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportExportExcel = require('../../../app/controller/exportExcel');
import ExportImportExcel = require('../../../app/controller/importExcel');

declare module 'egg' {
  interface IController {
    exportExcel: ExportExportExcel;
    importExcel: ExportImportExcel;
  }
}
