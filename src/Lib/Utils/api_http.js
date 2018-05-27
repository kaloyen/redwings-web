import axios from "axios"
const API_ROUTE = 'api'
const api_auth_keys = [`access-token`, `client`, `expiry`, `token-type`, `uid`]
const key_prefix = `auth_`
import STORAGE from 'Lib/storage.js'
import Session from 'Carrier/Session.js'
export const getApiHeaders = () => {
	const headers = {}
	try {
		api_auth_keys.forEach(key => (headers[key] = STORAGE.get(`${key_prefix}${key}`)))
	} catch (e) {
		console.error(`Cant obtain headers`, e)
	}
	return headers
}

export const setApiHeaders = headers => {
	if (headers.hasOwnProperty(`access-token`)) {
		api_auth_keys.forEach(key => {
			STORAGE.set(`${key_prefix}${key}`, headers[key])
		})
	}
}
export const storeUserData = headers => {
	if (headers.hasOwnProperty(`email`)) {
		Object.keys(Session.data).forEach(key => {
			STORAGE.set(`user`, {...STORAGE.get('user'), ...headers[key]})
		})
	}
}

export const clearApiHeaders = () => {
	try {
		api_auth_keys.forEach(key => {
			STORAGE.delete(`${key_prefix}${key}`)
		})
	} catch (e) {
		console.error(`Cant obtain headers`, e)
	}
}

export const buildUrl = (parts, params = {}) => {
	parts = Array.isArray(parts) ? parts.map(part => part.trim(`/`)) : [parts.trim(`/`)]
	// parts.unshift(API_ROUTE.trim(`/`))
	let url = parts.join(``)
	if (Object.keys(params).length > 0) url += `?${qs.stringify(params)}`
	return url
}

export const request = (
	method,
	path,
	{ headers = {}, data, process_data = true, send_tokens = true, ...options } = {},
) => {
	const url = buildUrl(path)
	headers = { ...headers, ...getApiHeaders() }
	// if (process_data && data) data = objectToFormData(data)
	return axios({ method, url, ...options, data: { ...data }, headers }).
		then(response => {
			setApiHeaders(response.headers)
			return response
		}).
		catch(error => {
			console.error(error.status, error)
			if (error.status === 401) redirect(`/`, { reload: true })
			else throw error
		})
}
export const get = (path, params = {}) => request(`get`, path, { params })

export const post = (path, data = {}, options) => request(`post`, path, { data, ...options })
export const put = (path, data = {}, options) => request(`put`, path, { data, ...options })
export const del = (path, data = {}, options) => request(`delete`, path, { data, ...options })

export const apiRoute = API_ROUTE