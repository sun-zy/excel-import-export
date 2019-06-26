'use strict';

const Controller = require('egg').Controller;
const pinyin = require("pinyin");
const fs = require('fs')
const XLSX = require('xlsx');
const toArray = require('stream-to-array');
const Excel = require('exceljs');

class ImportExcelController extends Controller {
  	async index(req,res,next) {
  		let { ctx,app } = this,
			file = ctx.multipart(),
			part = await file(); 

		// 删除原有excel文件
		fs.unlink('./文件.xlsx', (err) => {
		  	if (err) throw err;
		  	console.log('文件已删除');
		});

		// 文件流转buffer，并存取
		const partData = await toArray(part).then(function (parts) {
          	const buffers = []
          	for (let i = 0, l = parts.length; i < l; ++i) {
                const part = parts[i]
                buffers.push((part instanceof Buffer) ? part : new Buffer(part))
          	}
          	return Buffer.concat(buffers)
        })

		// 读取excel数据
		let wb = XLSX.read(partData, {type:'buffer'}),
			excelData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]),
			workbook = new Excel.Workbook(),
			worksheet = workbook.addWorksheet('worksheet');

		// 定义excel列
		worksheet.columns = [
		  	{ header: '名称', key: 'name', width: 20 },
		  	{ header: '性别', key: 'sex', width: 10 }
		];

		// 文件
		excelData.forEach((item,index) => {
			let key = Object.keys(item),
				name = excelData[index][key];

			// 添加数据
			worksheet.addRow({name, py:pinyin(name).join(" ")}).commit();
		})

		// 生成excel文件
		await workbook.xlsx.writeFile('./文件.xlsx')

		ctx.body = {
			code:0,
			msg:"上传成功"
		}

		return ctx.body;
	}
}

module.exports = ImportExcelController;
