import http from './axios'

const getAll = async (path) => {
	return await http.get(path).then((res) => res.data)
}

const get = async (path, id) => {
	return await http.get(path, id).then((res) => res.data)
}

const post = async (path, data) => {
	await http.post(path, data)
}

const patch = async (path, data) => {
	await http.patch(path, data).then((res) => res.data)
}

const api = {
	getAll,
	get,
	post,
	patch
}

export default api
