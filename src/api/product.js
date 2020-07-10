import request from "@/utils/request.js"

// 添加商品
export function createproduct(data) {
	return request({
		url:'/createproduct',
		method:'post',
		data: data
	})
}

// 商品列表
export function productlist(data) {
	return request({
		url: "/productlist",
		method: "post",
		data: data
	})
}

// 编辑商品
export function updateproduct(data) {
	return request({
		url: "/updateproduct",
		method: "post",
		data: data
	})
}

// 删除分商品
export function deleteproduct(data) {
	return request({
		url: "/deleteproduct",
		method: "post",
		data: data
	})
}

// 编辑商品状态
export function updateprocategorystatus(data) {
	return request({
		url: "/updateprocategorystatus",
		method: "post",
		data: data
	})
}