export function makeLoadingScreen() {
	const ldng = "loadingScreen"
	//how to center and must be removed in timer first loop
	let rootDiv = document.createElement("div")
	rootDiv.setAttribute("id", ldng + "Div")
	rootDiv.style.position = "absolute"
	rootDiv.style.margin = "0"
	rootDiv.style.padding = "0"
	rootDiv.style.width = "100%"
	rootDiv.style.height = "100%"
	rootDiv.style.backgroundColor = "#333"
	// rootDiv.style.top = "50%"
	// rootDiv.style.left = "50%"
	// rootDiv.style.transform = "translate (-50%, -50%)"
	document.body.appendChild(rootDiv)

	let middleDiv = document.createElement("div")
	middleDiv.className = "middle"
	middleDiv.style.position = "absolute"
	middleDiv.style.transformOrigin = "center center"
	middleDiv.style.top = "50%"
	middleDiv.style.left = "50%"
	middleDiv.style.transform = "translate (-50%, -50%)"

	rootDiv.appendChild(middleDiv)

	let bar
	// let text = ["L", "O", "A", "D", "I", "N", "G", ".", ".", "."]
	for (let i = 0; i < 10; i++) {
		bar = document.createElement("div")
		bar.style.position = "relative"
		bar.className = "bar bar" + i
		middleDiv.style.top = "50%"
		middleDiv.style.left = "50%"
		// bar.innerHTML = `<b>${text[i]}</b>`
		bar.style.width = "12px" //"15px"
		bar.style.height = "120px"
		bar.style.background = "white"
		bar.style.display = "inline-block"
		bar.style.marginLeft = "4px"
		bar.style.marginRight = "4px"
		bar.style.transformOrigin = "bottom center"
		bar.style.animation = "loadingScreen 3s ease-in-out infinite"
		bar.style.animationDelay = `${i / 10}s`

		middleDiv.appendChild(bar)
	}
}
export function removeLoadingScreen() {
	document.getElementById("loadingScreenDiv").remove()
}
