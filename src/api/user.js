import request from "@/utils/request.js"

export function userlist(data) {
	return request({
		url: "/userlist",
		method: "post",
		data: data
	})
}