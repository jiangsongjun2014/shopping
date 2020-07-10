import request from "@/utils/request.js"

// 添加详情
export function createproductdetail(data) {
	return request({
		url:'/createproductdetail',
		method:'post',
		data: data
	})
}

// 详情列表
export function productdetaillist(data) {
	return request({
		url: "/productdetaillist",
		method: "post",
		data: data
	})
}

// 编辑详情
export function updateproductdetail(data) {
	return request({
		url: "/updateproductdetail",
		method: "post",
		data: data
	})
}

// 删除详情
export function deleteproductdetail(data) {
	return request({
		url: "/deleteproductdetail",
		method: "post",
		data: data
	})
}

// 编辑详情状态
// export function updateprocategorystatus(data) {
// 	return request({
// 		url: "/updateprocategorystatus",
// 		method: "post",
// 		data: data
// 	})
// }