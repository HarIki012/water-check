import { baseUrl } from './config.js'

// 
export function patrolAll(){
	
	return uni.request({
		url: `${baseUrl}/patrols`,
		method:'GET',
	});
}