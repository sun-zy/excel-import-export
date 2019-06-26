<style type="text/css">
	span {
	    padding: 6px 15px;
	    border-radius: 4px;
	    background-color: #2d8cf0;
        color: #fff;
        cursor: pointer;
	}
</style>
<template>
	<div class="home">
		导入转写文档：<input type="file" accept=".xls,.xlsx" name="files" @change="readExcel($event)">

		<span @click="exportExcel">下载</span>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Provide } from "vue-property-decorator";

	@Component({
		components: {}
	})
	export default class Home extends Vue {
		@Provide() outputs: object = []

		// 上传文件
		readExcel(this: any,e: any): any { //表格导入 
			let that = this,
				files = e.target.files;
			
			if(!files.length) { //如果没有文件名
				return false;
			}else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
				alert('上传格式不正确，请上传xls或者xlsx格式');
				return false;
			}

			let formData = new FormData();
			formData.append("files", files[0]);

			that.$http("/importExcel",'postFile',formData,'上传异常').then(function(response:any){
				if(response.code === 0){

				}
            },function(error:any){
                console.log(222,error)
            })
		}

		// 导出文件
		exportExcel(this:any){
			let that = this,
				url = window.location.protocol + '//' + window.location.host;
			
			window.location.href = url + '/exportExcel';
		}
	}
</script>