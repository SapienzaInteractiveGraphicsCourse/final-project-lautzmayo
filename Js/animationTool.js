import { Vector3 } from "../build/three.module.js"
import { helper } from "../main.js"

export class animationTool {
	#isAnimToolActive = false
	get isAnimToolActive() {
		return this.#isAnimToolActive
	}

	#rootNode

	#dropDown

	#sliders
	#inputX
	#sliderX
	#inputY
	#sliderY
	#inputZ
	#sliderZ

	#logBtn

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
		this.#dropDown.addEventListener("input", () => this.changeBone())

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

		this.#inputX = document.createElement("input")
		this.#inputX.setAttribute("type", "number")
		this.#inputX.setAttribute("min", "-3.14")
		this.#inputX.setAttribute("max", "3.14")
		this.#inputX.setAttribute("value", "0.00")
		this.#inputX.setAttribute("step", "0.01")
		this.#inputX.setAttribute("id", "animToolInputX")
		this.#sliders.appendChild(this.#inputX)
		this.#inputX.addEventListener("input", () => this.adjustSliders())

		this.#sliderX = document.createElement("input")
		this.#sliderX.setAttribute("type", "range")
		this.#sliderX.setAttribute("min", "-3.14")
		this.#sliderX.setAttribute("max", "3.14")
		this.#sliderX.setAttribute("value", "0.00")
		this.#sliderX.setAttribute("step", "0.01")
		this.#sliderX.setAttribute("id", "animToolSliderX")
		this.#sliderX.setAttribute("orient", "horizontal")
		this.#sliders.appendChild(this.#sliderX)
		this.#sliderX.addEventListener("input", () => this.adjustInput())

		this.#sliders.appendChild(document.createElement("br"))
		label = document.createElement("label")
		label.innerText = "Y: "
		this.#sliders.appendChild(label)

		this.#inputY = document.createElement("input")
		this.#inputY.setAttribute("type", "number")
		this.#inputY.setAttribute("min", "-3.14")
		this.#inputY.setAttribute("max", "3.14")
		this.#inputY.setAttribute("value", "0.00")
		this.#inputY.setAttribute("step", "0.01")
		this.#inputY.setAttribute("id", "animToolInputY")
		this.#sliders.appendChild(this.#inputY)
		this.#inputY.addEventListener("input", () => this.adjustSliders())

		this.#sliderY = document.createElement("input")
		this.#sliderY.setAttribute("type", "range")
		this.#sliderY.setAttribute("min", "-3.14")
		this.#sliderY.setAttribute("max", "3.14")
		this.#sliderY.setAttribute("value", "0.00")
		this.#sliderY.setAttribute("step", "0.01")
		this.#sliderY.setAttribute("id", "animToolSliderY")
		this.#sliderY.setAttribute("orient", "horizontal")
		this.#sliders.appendChild(this.#sliderY)
		this.#sliderY.addEventListener("input", () => this.adjustInput())

		this.#sliders.appendChild(document.createElement("br"))
		label = document.createElement("label")
		label.innerText = "Z: "
		this.#sliders.appendChild(label)

		this.#inputZ = document.createElement("input")
		this.#inputZ.setAttribute("type", "number")
		this.#inputZ.setAttribute("min", "-3.14")
		this.#inputZ.setAttribute("max", "3.14")
		this.#inputZ.setAttribute("value", "0.00")
		this.#inputZ.setAttribute("step", "0.01")
		this.#inputZ.setAttribute("id", "animToolInputZ")
		this.#sliders.appendChild(this.#inputZ)
		this.#inputZ.addEventListener("input", () => this.adjustSliders())

		this.#sliderZ = document.createElement("input")
		this.#sliderZ.setAttribute("type", "range")
		this.#sliderZ.setAttribute("min", "-3.14")
		this.#sliderZ.setAttribute("max", "3.14")
		this.#sliderZ.setAttribute("value", "0.00")
		this.#sliderZ.setAttribute("step", "0.01")
		this.#sliderZ.setAttribute("id", "animToolSliderZ")
		this.#sliderZ.setAttribute("orient", "horizontal")
		this.#sliders.appendChild(this.#sliderZ)
		this.#sliderZ.addEventListener("input", () => this.adjustInput())

		this.#sliders.appendChild(document.createElement("br"))
		label = document.createElement("h3")
		label.innerText = "TOOLS"
		this.#rootNode.appendChild(label)

		this.#logBtn = document.createElement("button")
		this.#logBtn.setAttribute("id", "animToolLogBtn")
		this.#logBtn.innerText = "LOG"
		this.#rootNode.appendChild(this.#logBtn)
		this.#logBtn.addEventListener("click", () => this.printAllQuaternions())
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

	rotatebone() {
		let boneId = this.#dropDown.options[this.#dropDown.selectedIndex].value

		helper.bones[boneId].quaternion.setFromEuler(
			new THREE.Euler(this.#inputX.value, this.#inputY.value, this.#inputZ.value, "XYZ")
		)
	}

	adjustSliders() {
		this.#sliderX.value = this.#inputX.value
		this.#sliderY.value = this.#inputY.value
		this.#sliderZ.value = this.#inputZ.value
		this.rotatebone()
	}
	adjustInput() {
		this.#inputX.value = this.#sliderX.value
		this.#inputY.value = this.#sliderY.value
		this.#inputZ.value = this.#sliderZ.value
		this.rotatebone()
	}

	changeBone() {
		let boneId = this.#dropDown.options[this.#dropDown.selectedIndex].value

		let rot = helper.bones[boneId].rotation
		rot = new Vector3(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2))

		this.#inputX.value = rot.x
		this.#inputY.value = rot.y
		this.#inputZ.value = rot.z

		this.adjustSliders()
	}

	printAllQuaternions() {
		let ret = ""

		let holder
		this.#bones.forEach((b) => {
			holder = helper.bones[b.boneId].quaternion
			ret += `x: ${holder.x.toFixed(2)}, y: ${holder.y.toFixed(2)}, z: ${holder.z.toFixed(2)}\n`
		})
		alert("Actual Relevant Bones Rotations: \n" + ret)
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
