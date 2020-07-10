import request from "@/utils/request.js"

export function orderalllist(data) {
	return request({
		url: "/orderalllist",
		method: "post",
		data: data
	})
}