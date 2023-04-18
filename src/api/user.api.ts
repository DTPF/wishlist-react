import { basePath, apiVersion } from "./utils/config";

export const initGetUserAPI = async (token: string, auth0Id: object): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
		},
    body: JSON.stringify(auth0Id),
	}
	const response = await fetch(`${basePath}/${apiVersion}/init-get-user`, params)
	const data = await response.json()
	return data
}

export const updateUserApi = async (userId: string, data: object, token: string): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/${apiVersion}/update-user/${userId}`, params)
	const result = await response.json()
	return result
}

export const changeLanguageAPI = async (data: object, token: string): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/${apiVersion}/change-language`, params)
	const result = await response.json()
	return result
}