<template>
	<el-dialog :title="isEdit?'编辑商品':'添加商品'" :visible.sync="dialogVisible" width="40%">
		<el-form :model="productcategory"  label-width="150px" size="small">
			<el-form-item label="类别名称：">
				<el-input v-model="productcategory.product_like_name" style="width: 250px"></el-input>
			</el-form-item>
			<el-form-item label="是否启用：">
				<el-radio-group v-model="productcategory.product_like_status">
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
	import {createprocategory, updateprocategory} from "@/api/productcategory.js"
	
	const defaultproductcategory = {
		product_like_id: null,
		product_like_name: null,
		product_like_status: 1,
	};
	export default {
		data() {
			return {
				productcategory: Object.assign({}, defaultproductcategory),
				dialogVisible: false,
				isEdit: false,
				uploadflag: true
			}
		},
		mounted(){
			// 监听添加
			bus.$on("add", data => {
				this.dialogVisible = data.dialogVisible
				this.isEdit = data.isEdit
				this.productcategory = Object.assign({},defaultproductcategory);
			})
			// 监听编辑
			bus.$on("edit", data => {
				this.dialogVisible = data.dialogVisible
				this.isEdit = data.isEdit
				this.productcategory = Object.assign({},data.row);
			})
		},
		methods: {
			// 确认
			handleDialogConfirm() {
				if (this.isEdit) {
					// 编辑
					updateprocategory(this.productcategory).then(res => {
						if (res.code == 1) {
							this.$message.error("添加失败")
						} else {
							this.$message.success("修改成功")
							this.dialogVisible = false
							bus.$emit("success")
						}
					})
				} else {
					// 添加
					createprocategory(this.productcategory).then(res => {
						if (res.code == 1) {
							this.$message.error("添加失败")
						} else {
							this.$message.success("添加成功")
							this.dialogVisible = false
							bus.$emit("success")
						}
					})
				}
			},
		},
	}
</script>

<style scoped="scoped">
	
</style>
