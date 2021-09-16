export function createNewUserMessage(stringOfMessage, durationInSeconds = 6) {
	let root = document.getElementById("userMessageDiv")
	if (!root) {
		root = document.createElement("div")
		root.setAttribute("id", "userMessageDiv")
		root.style.position = "absolute"
		root.style.right = "50%"
		root.style.top = "20%"
		root.style.transformOrigin = "center center"
		document.body.appendChild(root)
	}

	let m = document.createElement("div")
	m.setAttribute("id", "userMessageItem")
	m.className = "userMessage"
	m.innerText = stringOfMessage
	m.style.animation = `userMessageAnimation ${durationInSeconds}s ease-in-out`
	m.style.transformOrigin = "center center"
	m.style.position = "relative"
	m.style.right = "50%"
	m.style.top = "20%"
	m.style.animationDelay = `${document.getElementsByClassName("userMessage").length / 2}s`
	root.appendChild(m)
	setTimeout(async () => root.removeChild(m), durationInSeconds * 600)
}
//TODO should find a way to make this messages stay in the middle of the screen
// also they look really raw
