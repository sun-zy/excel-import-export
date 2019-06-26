'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')

class ExportController extends Controller {
  	async index() {
  		let { ctx,app } = this; 
  		// 格式必须
		ctx.attachment(`文件.xlsx`)
  		ctx.set('Content-Type', 'text/xml');
  		ctx.body = fs.readFileSync('./文件.xlsx');
	}
}

module.exports = ExportController;
