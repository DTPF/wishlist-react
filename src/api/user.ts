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