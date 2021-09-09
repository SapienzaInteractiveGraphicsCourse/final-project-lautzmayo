import { isLocal } from "../main.js"
export function gitHubPagesSucks(s) {
	return isLocal ? s.splice(0, 24) : s
}
