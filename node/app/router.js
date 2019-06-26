'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	router.post('/importExcel', controller.importExcel.index);
	router.get('/exportExcel', controller.exportExcel.index);
};
