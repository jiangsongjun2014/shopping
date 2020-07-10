<template>
	<div class="container">
		<!-- 头部 -->
		<el-card class="filter-container" shadow="never">
			<el-form :inline="true" :model="listQuery"  >
				<el-form-item style="margin-bottom: 0px;">
					<el-input v-model="listQuery.keyword"  placeholder="请输入名称" clearable></el-input>
				</el-form-item>
				<el-form-item style="margin-bottom: 0px;">
					<el-select v-model="listQuery.product_like_id"  placeholder="商品分类"  >
					  <el-option
					    v-for="item in selectLikeList"
					    :key="item.product_like_id"
					    :label="item.product_like_name"
					    :value="item.product_like_id">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 0px;">
					<el-button style="float:right" type="primary" @click="handleSearchList()">
						查询搜索
					</el-button>
				</el-form-item>
				<el-form-item style="margin-bottom: 0px;">
					<el-button style="float:right;" type="success" @click="handleResetSearch()" >
						重置搜索
					</el-button>
				</el-form-item>
				<el-form-item style="margin-bottom: 0px;">
					<el-button style="float:right;" type="warning" @click="handleAdd()" >
						添加商品
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 列表 -->
		<div class="main">
			<el-table ref="adminTable" :data="list" style="display: table-cell;" v-loading="listLoading" border >
				<el-table-column label="编号" width="100" align="center">
					<template slot-scope="scope">{{scope.row.product_id}}</template>
				</el-table-column>
				<el-table-column label="商品名称" width="150" align="center">
					<template slot-scope="scope">{{scope.row.product_name}}</template>
				</el-table-column>
				<el-table-column label="当前价格" width="120"align="center">
					<template slot-scope="scope">{{scope.row.price}}</template>
				</el-table-column>
				<el-table-column label="当前库存"width="100" align="center">
					<template slot-scope="scope">{{scope.row.stock}}</template>
				</el-table-column>
				<el-table-column label="创建时间"width="180" align="center">
					<template slot-scope="scope">{{scope.row.create_time}}</template>
				</el-table-column>
				<el-table-column label="所属分类" width="180" align="center">
					<template slot-scope="scope">{{scope.row.product_like_name}}</template>
				</el-table-column>
				<el-table-column label="商品图片"  width="180" align="center">
					<template slot-scope="scope">
						<img :src="imgheader + scope.row.imgpath" style="width: 50px; height: 50px;">
					</template>
				</el-table-column>
				<el-table-column label="更多信息" width="180" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="handleShowdetail(scope.$index, scope.row)">
							查看详情
						</el-button>
					</template>
				</el-table-column>
				<!-- <el-table-column label="是否启动" align="center">
					<template slot-scope="scope">
						<el-switch
					    @change="handleHiddenChange(scope.$index, scope.row)"
					    :active-value="1"
					    :inactive-value="0"
					    v-model="scope.row.product_status">
						</el-switch>
					</template>
				</el-table-column> -->
				<el-table-column label="操作" width="180" align="center">
				  <template slot-scope="scope">
				    <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
						编辑
				    </el-button>
				    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">
						删除
				    </el-button>
				  </template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div style="float: right; margin-top: 20px;">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					layout="total, sizes,prev, pager, next,jumper"
					:page-size="listQuery.pagesize"
					:page-sizes="[5,10,15]"
					:current-page.sync="listQuery.page"
					:total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 组件 -->
		<editadddiglog></editadddiglog>
	</div>
</template>

<script>
	import editadddiglog from "./components/editadddiglog"
	import bus from "@/utils/bus.js"
	import {productlist, deleteproduct} from "@/api/product.js"
	import {procategorylist} from "@/api/productcategory"
	// 列表数据
	const defaultListQuery = {
		page: 1,
		pagesize: 10,
		keyword: null,
		product_like_id: null
	}
	export default {
		data() {
			return {
				listQuery: Object.assign({}, defaultListQuery),
				list: null,
				listLoading: false,
				total: null,
				imgheader: "http://120.27.0.79:4399/",
				// imgheader: "http://localhost:4399/",
				selectLikeList: []
			}
		},
		components: {
			editadddiglog
		},
		mounted() {
			bus.$on("success", () => {
				this.getList()
			})
			this.getList()
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
			// 查询搜索
			handleSearchList () {
				this.listQuery.page = 1;
				this.getList();
			},
			// 重置搜索
			handleResetSearch(){
				this.listQuery = Object.assign({}, defaultListQuery)
				this.getList()
			},
			// 获取列表
			getList(){
				this.listLoading = true
				productlist(this.listQuery).then(res => {
					this.listLoading = false
					this.list = res.data
					this.total = res.totallength
				})
			},
			// 添加
			handleAdd(){
				bus.$emit("add", {
					dialogVisible: true,
					isEdit: false
				})
			},
			// 编辑
			handleUpdate(index, row){
				bus.$emit("edit", {
					dialogVisible: true,
					isEdit: true,
					row: row
				})
			},
			// 删除
			handleDelete(index, row) {
				this.$confirm('是否要删除该商品?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteproduct(row).then(response => {
						this.$message.success('删除成功');
						this.getList();
					});
				});
			},
			// 是否启用
			handleHiddenChange(index, row) {
				
			},
			// 每页数量改变
			handleSizeChange(val) {
				this.listQuery.page = 1;
				this.listQuery.pagesize = val;
				this.getList();
			},
			// 当前页改变
			handleCurrentChange(val) {
				this.listQuery.page = val;
				this.getList();
			},
			// 查看详情
			handleShowdetail(index, row) {
				this.$router.push({path: "/productDeatil", query:{productid: row.product_id}})
			}
		},
	}
</script>

<style>
</style>
