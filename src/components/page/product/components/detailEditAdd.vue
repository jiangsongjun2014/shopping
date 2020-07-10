<template>
	<el-dialog :title="isEdit?'编辑详情':'添加详情'" :visible.sync="dialogVisible" width="40%">
		<el-form :model="productdetail"  label-width="150px" size="small">
			<el-form-item label="详情名称：">
				<el-input v-model="productdetail.product_detail_name" style="width: 250px"></el-input>
			</el-form-item>
			<el-form-item label="详情内容：">
				<el-input v-model="productdetail.product_detail" style="width: 250px"></el-input>
			</el-form-item>
			<el-form-item label="详情图片：">
				<el-upload
					class="avatar-uploader"
					action="http://120.27.0.79:4399/api/uploads"
					list-type="picture"
					:multiple="false" 
					name="avatar"
					:before-upload="beforeUpload"
					:on-remove="handleRemove"
					:on-success="handleUploadSuccess">
					<el-button size="small" type="primary" v-if="uploadflag">点击上传</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="是否启用：">
				<el-radio-group v-model="productdetail.product_detail_status">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false" size="small">取 消</el-button>
			<el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import bus from "@/utils/bus.js"
	import {createproductdetail, updateproductdetail} from "@/api/productdetail"
	
	const defaultproductdetail = {
		product_detail_id: null,
		product_detail_name: null,
		product_detail: null,
		product_detail_status: 1,
		product_detail_imgpath: null,
		product_id: null,
	};
	export default {
		data() {
			return {
				productdetail: Object.assign({}, defaultproductdetail),
				dialogVisible: false,
				isEdit: false,
				uploadflag: true,
				productid: null
			}
		},
		mounted(){
			// 监听添加
			bus.$on("add", data => {
				this.dialogVisible = data.dialogVisible
				this.isEdit = data.isEdit
				this.productid = data.product_id
				this.productdetail = Object.assign({},defaultproductdetail);
			})
			// 监听编辑
			bus.$on("edit", data => {
				this.dialogVisible = data.dialogVisible
				this.isEdit = data.isEdit
				this.productid = data.product_id
				this.productdetail = Object.assign({},data.row);
			})
		},
		methods: {
			// 确认
			handleDialogConfirm() {
				if (this.isEdit) {
					// 编辑
					this.productdetail.product_id = this.productid
					updateproductdetail(this.productdetail).then(res =>{
						if (res.code == 1) {
							this.$message.error(res.msg)
						} else {
							this.$message.success("编辑成功")
							this.dialogVisible = false
							bus.$emit("success")
						}
					})
				} else {
					// 添加
					this.productdetail.product_id = this.productid
					createproductdetail(this.productdetail).then(res => {
						if (res.code == 1) {
							this.$message.error(res.msg)
						} else {
							this.$message.success("添加成功")
							this.dialogVisible = false
							bus.$emit("success")
						}
					})
				}
			},
			// 上传之前
			beforeUpload(file){
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 上传成功获取地址
			handleUploadSuccess(res, file){
				if (res.code == 1) {
					this.$message.error("上传失败")
				} else {
					this.productdetail.product_detail_imgpath = res.path
					this.uploadflag = false 
				}
			},
			// 移除图片
			handleRemove(file, fileList){
				if (file.status == "success") {
					this.uploadflag = true
					this.productdetail.product_detail_imgpath = ""
				} else {
					this.$message.error("移除失败")
				}
			}
		},
	}
</script>

<style scoped="scoped">
	
</style>
