import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRouterMap = [
	{
		path: "/login",
		component: () => import("../components/page/login/index.vue"),
		meta: { title: "登录" }
	},
	{
      path: "/",
      redirect: '/home'
    },
	{
		path: "/",
		component: () => import ("../components/common/Home.vue"),
		children: [
			{
				path: "/home",
				component: () => import ("../components/page/home/home.vue"),
				meta: {title: "系统首页"}
			},
			{
				path: "/user",
				component: () => import ("../components/page/admin/index.vue"),
				meta: {title: "用户管理"}
			},
			{
				path: "/product",
				component: () => import ("../components/page/product/index.vue"),
				meta: {title: "商品管理"}
			},
			{
				path: "/productDeatil",
				component: () => import ("../components/page/product/productDeatil.vue"),
				meta: {title: "商品详情"}
			},
			{
				path: "/productcategory",
				component: () => import ("../components/page/productcategory/index.vue"),
				meta: {title: "类别管理"}
			},
			{
				path: "/orderlist",
				component: () => import ("../components/page/order/orderlist.vue"),
				meta: {title: "订单管理"}
			},
		]
	}
]

export default new Router({
	routes: constantRouterMap
})
