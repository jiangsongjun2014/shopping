import request from "@/utils/request.js"

// 添加分类
export function createprocategory(data) {
	return request({
		url:'/createprocategory',
		method:'post',
		data: data
	})
}

// 分类列表
export function procategorylist(data) {
	return request({
		url: "/procategorylist",
		method: "post",
		data: data
	})
}

// 编辑分类
export function updateprocategory(data) {
	return request({
		url: "/updateprocategory",
		method: "post",
		data: data
	})
}

// 删除分类 
export function deleteprocategory(data) {
	return request({
		url: "/deleteprocategory",
		method: "post",
		data: data
	})
}

// 编辑分类状态
export function updateprocategorystatus(data) {
	return request({
		url: "/updateprocategorystatus",
		method: "post",
		data: data
	})
}