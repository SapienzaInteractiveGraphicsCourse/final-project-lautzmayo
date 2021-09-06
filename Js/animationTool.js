export class animationTool {
	#isAnimToolActive = false
	get isAnimToolActive() {
		return this.#isAnimToolActive
	}
	#rootNode
	#dropDown
	#sliders
	#sliderX
	#sliderY
	#sliderZ

	#bones = [
		new boneTool(0, "ROOT"),
		new boneTool(6, "HEAD"),
		new boneTool(15, "LEFTUPPERARM"),
		new boneTool(16, "LEFTLOWERARM"),
		new boneTool(17, "LEFTHAND"),
		new boneTool(47, "RIGHTUPPERARM"),
		new boneTool(48, "RIGHTLOWERARM"),
		new boneTool(49, "RIGHTHAND"),
		new boneTool(81, "LEFTUPPERLEG"),
		new boneTool(82, "LEFTLOWERLEG"),
		new boneTool(83, "LEFTFEET"),
		new boneTool(76, "RIGHTUPPERLEG"),
		new boneTool(77, "RIGHTLOWERLEG"),
		new boneTool(78, "RIGHTFEET")
	]

	#makeUiItem() {
		this.#rootNode = document.createElement("div")
		this.#rootNode.setAttribute("id", "animTool")
		document.body.appendChild(this.#rootNode)

		let label = document.createElement("label")
		label.innerText = "Bone: "
		this.#rootNode.appendChild(label)

		this.#dropDown = document.createElement("select")
		this.#dropDown.setAttribute("id", "animToolDropdown")
		this.#dropDown.setAttribute("class", "animToolDropdown")
		this.#rootNode.appendChild(this.#dropDown)

		let a
		this.#bones.forEach((b) => {
			a = document.createElement("option")
			a.setAttribute("id", `${b.boneName.toLowerCase()}ManBone`)
			a.setAttribute("name", `${b.boneName.toLowerCase()}`)
			a.setAttribute("value", b.boneId)
			a.innerText = b.boneName
			this.#dropDown.appendChild(a)
		})

		this.#sliders = document.createElement("div")
		this.#sliders.setAttribute("id", "animToolSliders")
		this.#rootNode.appendChild(this.#sliders)

		this.#sliders.appendChild(document.createElement("br"))
		label = document.createElement("label")
		label.innerText = "X: "
		this.#sliders.appendChild(label)

		this.#sliderX = document.createElement("input")
		this.#sliderX.setAttribute("type", "range")
		this.#sliderX.setAttribute("min", "-3.14")
		this.#sliderX.setAttribute("max", "3.14")
		this.#sliderX.setAttribute("value", "0")
		this.#sliderX.setAttribute("step", "0.01")
		this.#sliderX.setAttribute("id", "animToolSliderX")
		this.#sliderX.setAttribute("orient", "horizontal")
		this.#sliders.appendChild(this.#sliderX)

		this.#sliders.appendChild(document.createElement("br"))
		label = document.createElement("label")
		label.innerText = "Y: "
		this.#sliders.appendChild(label)

		this.#sliderY = document.createElement("input")
		this.#sliderY.setAttribute("type", "range")
		this.#sliderY.setAttribute("min", "-3.14")
		this.#sliderY.setAttribute("max", "3.14")
		this.#sliderY.setAttribute("value", "0")
		this.#sliderY.setAttribute("step", "0.01")
		this.#sliderY.setAttribute("id", "animToolSliderY")
		this.#sliderY.setAttribute("orient", "horizontal")
		this.#sliders.appendChild(this.#sliderY)

		this.#sliders.appendChild(document.createElement("br"))
		label = document.createElement("label")
		label.innerText = "Z: "
		this.#sliders.appendChild(label)

		this.#sliderZ = document.createElement("input")
		this.#sliderZ.setAttribute("type", "range")
		this.#sliderZ.setAttribute("min", "-3.14")
		this.#sliderZ.setAttribute("max", "3.14")
		this.#sliderZ.setAttribute("value", "0")
		this.#sliderZ.setAttribute("step", "0.01")
		this.#sliderZ.setAttribute("id", "animToolSliderZ")
		this.#sliderZ.setAttribute("orient", "horizontal")
		this.#sliders.appendChild(this.#sliderZ)
	}

	constructor() {
		this.#isAnimToolActive = false
		this.#makeUiItem()
		this.#toggleVisualization(this.#rootNode, this.#isAnimToolActive)
	}

	toggleAnimationTool(active) {
		this.#isAnimToolActive = active
		this.#toggleVisualization(this.#rootNode, this.#isAnimToolActive)
	}

	#toggleVisualization(div, isActive) {
		div.hidden = !isActive
	}
}

class boneTool {
	#boneId
	#boneName
	constructor(id, name) {
		this.#boneId = id
		this.#boneName = name
	}

	get boneId() {
		return this.#boneId
	}

	get boneName() {
		return this.#boneName
	}
}
