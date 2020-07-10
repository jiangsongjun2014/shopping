<template>
	<div class="container">
		<!-- 头部 -->
		<el-card class="filter-container" shadow="never">
			<el-form :inline="true" :model="listQuery"  >
				<el-form-item style="margin-bottom: 0px;">
					<el-input v-model="listQuery.keyword"  placeholder="请输入名称" clearable></el-input>
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
			</el-form>
		</el-card>
		<!-- 列表 -->
		<div class="main">
			<el-table ref="adminTable" :data="list" style="display: table-cell;" v-loading="listLoading" border >
				<el-table-column label="编号" width="130" align="center">
					<template slot-scope="scope">{{scope.row.order_id}}</template>
				</el-table-column>
				<el-table-column label="用户名称" width="150" align="center">
					<template slot-scope="scope">{{scope.row.user_address_name}}</template>
				</el-table-column>
				<el-table-column label="商品名称" width="100" align="center">
					<template slot-scope="scope">{{scope.row.product_name}}</template>
				</el-table-column>
				<el-table-column label="商品图片" width="180" align="center">
					<<template slot-scope="scope">
						<img :src="imgheader + scope.row.imgpath" style="width: 50px; height: 50px;">
					</template>
				</el-table-column>
				<el-table-column label="商品总额" width="150" align="center">
					<template slot-scope="scope">{{scope.row.total_money}}</template>
				</el-table-column>
				<el-table-column label="收货地址"width="180" align="center">
					<template slot-scope="scope">{{scope.row.user_address_detail}}</template>
				</el-table-column>
				<el-table-column label="手机号码"width="150" align="center">
					<template slot-scope="scope">{{scope.row.user_address_phone}}</template>
				</el-table-column>
				<el-table-column label="订单状态"width="150" align="center">
					<template slot-scope="scope">{{scope.row.order_status == '1' ? '已签收': '未签收'}}</template>
				</el-table-column>
				<el-table-column label="创建时间" width="180" align="center">
					<template slot-scope="scope">{{scope.row.create_time}}</template>
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
	</div>
</template>

<script>
	import {orderalllist} from "@/api/order.js"
	// 列表数据
	const defaultListQuery = {
		page: 1,
		pagesize: 10,
		keyword: null
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
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
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
				orderalllist(this.listQuery).then(res => {
					this.listLoading = false
					this.list = res.data
					this.total = res.totallength
				})
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
			}
		},
	}
</script>

<style>
</style>
