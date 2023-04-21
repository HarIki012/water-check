import { baseUrl } from './config.js'

// 
export function patrolAll(){
	
	return uni.request({
		url: `${baseUrl}/patrols`,
		method:'GET',
	});
}

// 按页获取多个工程项目
export function projectsAll(data) {
	return uni.request({
		url: `${baseUrl}/projects`,
		data: data,
		method:'GET',
	})
}

// 新建项目
export function createProject(data) {
	return uni.request({
		url: `${baseUrl}/project_create`,
		data: data,
		method:'POST',
	})
}