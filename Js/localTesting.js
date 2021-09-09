import{isLocal} from "../m"
export function gitHubPagesSucks(s) {
	return isLocal ? s.splice(0, 24) : s
}
