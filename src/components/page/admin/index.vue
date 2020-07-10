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
				<el-table-column label="编号" width="100" align="center">
					<template slot-scope="scope">{{scope.row.user_id}}</template>
				</el-table-column>
				<el-table-column label="用户名称" width="175" align="center">
					<template slot-scope="scope">{{scope.row.nickname}}</template>
				</el-table-column>
				<el-table-column label="用户账号" align="center">
					<template slot-scope="scope">{{scope.row.username}}</template>
				</el-table-column>
				<el-table-column label="用户角色"  align="center">
					<template slot-scope="scope">{{scope.row.role_name}}</template>
				</el-table-column>
				<el-table-column label="用户密码" align="center">
					<template slot-scope="scope">{{scope.row.password}}</template>
				</el-table-column>
				<el-table-column label="支付密码" align="center">
					<template slot-scope="scope">{{scope.row.pay_password}}</template>
				</el-table-column>
				<el-table-column label="创建时间"  align="center">
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
	import {userlist} from "@/api/user.js"
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
				total: null
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
				userlist(this.listQuery).then(res => {
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
