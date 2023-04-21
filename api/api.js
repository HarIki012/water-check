import { baseUrl } from './config.js'

// 获取所有的巡检活动
export function patrolAll(){
	
	return uni.request({
		url: `${baseUrl}/patrols`,
		method:'GET',
	});
}


// 按ID获取单次巡检活动
export function patrolById(id){
	
	return uni.request({
		url: `${baseUrl}/patrols?id=${id}`,
		method:'GET',
	});
}
// 获取所有的项目详情
export function projectsAll(data) {
	return uni.request({
		url: `${baseUrl}/projects`,
		data: data,
		method:'GET',
	})
}

// 按ID获取项目详情
export function projectInfo(id){
	return uni.request({
		url:`${baseUrl}/project?id=${id}`,
		method:'GET',
	})
}

// 按照工程项目获取历史巡检活动
export function patrolByProject(id){
	return uni.request({
		url:`${baseUrl}/patrols_by_project?id=${id}`,
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

