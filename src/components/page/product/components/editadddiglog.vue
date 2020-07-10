<template>
	<el-dialog :title="isEdit?'编辑商品':'添加商品'" :visible.sync="dialogVisible" width="40%">
		<el-form :model="product"  label-width="150px" size="small">
			<el-form-item label="商品名称：">
				<el-input v-model="product.product_name" style="width: 250px"></el-input>
			</el-form-item>
			<el-form-item label="商品类别：">
				<el-select v-model="product.product_like_id"  placeholder="请选择" size="small" style="width: 250px">
				  <el-option
				    v-for="item in selectLikeList"
				    :key="item.product_like_id"
				    :label="item.product_like_name"
				    :value="item.product_like_id">
				  </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品单价：">
				<el-input v-model="product.price" style="width: 250px"></el-input>
			</el-form-item>
			<el-form-item label="商品库存：">
				<el-input v-model="product.stock" style="width: 250px"></el-input>
			</el-form-item>
			<el-form-item label="商品图片：">
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
				<el-radio-group v-model="product.product_status">
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
	import {procategorylist} from "@/api/productcategory"
	import {createproduct, updateproduct} from "@/api/product"
	
	const defaultproduct = {
		product_id: null,
		product_name: null,
		price: null,
		stock: null,
		imgpath: null,
		product_like_id: null,
		product_status: 1
	};
	export default {
		data() {
			return {
				product: Object.assign({}, defaultproduct),
				dialogVisible: false,
				isEdit: false,
				uploadflag: true,
				selectLikeList: []
			}
		},
		mounted(){
			// 监听添加
			bus.$on("add", data => {
				this.dialogVisible = data.dialogVisible
				this.isEdit = data.isEdit
				this.product = Object.assign({},defaultproduct);
			})
			// 监听编辑
			bus.$on("edit", data => {
				this.dialogVisible = data.dialogVisible
				this.isEdit = data.isEdit
				this.product = Object.assign({},data.row);
			})
			// 获取类别
			this.getSelectLikeList()
		},
		methods: {
			// 获取类别
			getSelectLikeList(){
				var data = {page: 1, pagesize: 1000}
				procategorylist(data).then(res => {
					this.selectLikeList = res.data
				})
			},
			// 确认
			handleDialogConfirm() {
				if (this.isEdit) {
					// 编辑
					console.log(this.product)
					updateproduct(this.product).then(res =>{
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
					createproduct(this.product).then(res => {
						if (res.code == 1) {
							this.$message.error(res.msg)
						} else {
							this.$message.success("添加成功")
							this.product = Object.assign({},defaultproduct);
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
				console.log(res)
				if (res.code == 1) {
					this.$message.error("上传失败")
				} else {
					this.product.imgpath = res.path
					this.uploadflag = false 
				}
			},
			// 移除图片
			handleRemove(file, fileList){
				if (file.status == "success") {
					this.uploadflag = true
					this.product.imgpath = ""
				} else if (file.status == "ready"){
					this.$message.error("图片格式错误")
				} else {
					this.$message.error("移除失败")
				}
			}
		},
	}
</script>

<style scoped="scoped">
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
