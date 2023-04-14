import { baseUrl } from './config.js'

// 
export function patrolAll(){
	
	return uni.request({
		url: `${baseUrl}/patrols`,
		method:'GET',
	});
}
export function projectsAll(data) {
	return uni.request({
		url: `${baseUrl}/projects`,
		data: data,
		method:'GET',
	})
}