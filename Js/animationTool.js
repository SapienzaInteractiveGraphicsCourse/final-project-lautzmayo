import { Euler, Quaternion, Vector3 } from "../build/three.module.js"
import { helper } from "../main.js"
import { animationExec } from "./animationExec.js"
import { animationClips } from "../main.js"
import { walkData, walkNaming } from "./animationData/walkAnimation.js"
import { idleData, idleNaming } from "./animationData/idleAnimation.js"
import { collectData, collectNaming } from "./animationData/collectAnimation.js"
import { disposeData, disposeNaming } from "./animationData/disposeAnimation.js"

class boneTool {
	#boneId
	#boneName
	#short
	constructor(id, name, s) {
		this.#boneId = id
		this.#boneName = name
		this.#short = s
	}

	get boneId() {
		return this.#boneId
	}

	get boneName() {
		return this.#boneName
	}

	get short() {
		return this.#short
	}
}

export const bones = [
	new boneTool(0, "ROOT", "root"),
	new boneTool(6, "HEAD", "head"),
	new boneTool(15, "LEFTUPPERARM", "lua"),
	new boneTool(16, "LEFTLOWERARM", "lla"),
	new boneTool(17, "LEFTHAND", "lh"),
	new boneTool(47, "RIGHTUPPERARM", "rua"),
	new boneTool(48, "RIGHTLOWERARM", "rla"),
	new boneTool(49, "RIGHTHAND", "rh"),
	new boneTool(81, "LEFTUPPERLEG", "lul"),
	new boneTool(82, "LEFTLOWERLEG", "lll"),
	new boneTool(83, "LEFTFEET", "lf"),
	new boneTool(76, "RIGHTUPPERLEG", "rul"),
	new boneTool(77, "RIGHTLOWERLEG", "rll"),
	new boneTool(78, "RIGHTFEET", "rf")
]

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

	#toolDiv

	#logBtn
	#constructAnimBtn

	#animArrayLoadBtn
	#animClipsList
	#currentClip
	#currentFrameLabel

	#keyFrameArray = []
	#keyFrameNaming = []

	#animPartsDiv
	#selectedClipDiv

	#clipToolsDiv

	#addCurrentBtn
	#addCurrentTxt

	#modifySelectedBtn
	#modifySelectedList

	#removeSelectedBtn
	#removeSelectedList

	#printClip

	#bones = [
		new boneTool(0, "ROOT", "root"),
		new boneTool(6, "HEAD", "head"),
		new boneTool(15, "LEFTUPPERARM", "lua"),
		new boneTool(16, "LEFTLOWERARM", "lla"),
		new boneTool(17, "LEFTHAND", "lh"),
		new boneTool(47, "RIGHTUPPERARM", "rua"),
		new boneTool(48, "RIGHTLOWERARM", "rla"),
		new boneTool(49, "RIGHTHAND", "rh"),
		new boneTool(81, "LEFTUPPERLEG", "lul"),
		new boneTool(82, "LEFTLOWERLEG", "lll"),
		new boneTool(83, "LEFTFEET", "lf"),
		new boneTool(76, "RIGHTUPPERLEG", "rul"),
		new boneTool(77, "RIGHTLOWERLEG", "rll"),
		new boneTool(78, "RIGHTFEET", "rf"),
		new boneTool(2, "LOWERSPINE", "ls"),
		new boneTool(3, "MIDDLESPINE", "ms"),
		new boneTool(4, "UPPERSPINE", "us")
	]
	get bones() {
		return this.#bones
	}

	#availableAnimations = [animationClips.idle, animationClips.walk, animationClips.collect, animationClips.dispose]

	#makeUiItem() {
		this.#rootNode = document.createElement("div")
		this.#rootNode.setAttribute("id", "animTool")
		this.#rootNode.setAttribute("class", "animTool")
		document.body.appendChild(this.#rootNode)

		let refreshBtn = document.createElement("button")
		refreshBtn.setAttribute("class", "animToolLogBtn")
		refreshBtn.innerText = "Back To Main Menu"
		refreshBtn.addEventListener("click", () => {
			location.reload()
		})
		this.#rootNode.appendChild(refreshBtn)

		this.#rootNode.appendChild(document.createElement("br"))

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

		//TODO : add style auto fit width to numerical input

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

		this.#toolDiv = document.createElement("div")
		this.#toolDiv.setAttribute("id", "toolDiv")
		this.#rootNode.appendChild(this.#toolDiv)

		label = document.createElement("h3")
		label.innerText = "TOOLS"
		this.#toolDiv.appendChild(label)

		// this.#logBtn = document.createElement("button")
		// this.#logBtn.setAttribute("id", "animToolLogBtn")
		// this.#logBtn.setAttribute("class", "animToolLogBtn")
		// this.#logBtn.innerText = "LOG"
		// this.#rootNode.appendChild(this.#logBtn)
		// this.#logBtn.addEventListener("click", () => this.printAllQuaternions())

		// this.#toolDiv.appendChild(document.createElement("br"))
		this.#constructAnimBtn = document.createElement("button")
		this.#constructAnimBtn.setAttribute("id", "constructAnimBtn")
		this.#constructAnimBtn.setAttribute("class", "animToolLogBtn")
		this.#constructAnimBtn.innerText = "Print current status for animation"
		this.#toolDiv.appendChild(this.#constructAnimBtn)
		this.#constructAnimBtn.addEventListener("click", () => this.constructAnim())

		this.#toolDiv.appendChild(document.createElement("br"))

		let loadingDiv = document.createElement("div")
		loadingDiv.setAttribute("id", "loadingDiv")
		this.#toolDiv.appendChild(loadingDiv)

		this.#animArrayLoadBtn = document.createElement("button")
		this.#animArrayLoadBtn.setAttribute("id", "animArrayLoadBtn")
		this.#animArrayLoadBtn.setAttribute("class", "animToolLogBtn")
		this.#animArrayLoadBtn.innerText = "LOAD"
		loadingDiv.appendChild(this.#animArrayLoadBtn)

		this.#animClipsList = document.createElement("select")
		this.#animClipsList.setAttribute("id", "animToolanimClipsList")
		this.#animClipsList.setAttribute("class", "animToolanimClipsList")
		loadingDiv.appendChild(this.#animClipsList)

		this.#availableAnimations.forEach((b) => {
			a = document.createElement("option")
			a.setAttribute("id", `${b}Clip`)
			a.setAttribute("name", `${b}Clip`)
			a.setAttribute("value", b)
			a.innerText = b
			this.#animClipsList.appendChild(a)
		})
		this.#animArrayLoadBtn.addEventListener("click", () =>
			this.createAnimationArray(this.#animClipsList.options[this.#animClipsList.selectedIndex].value)
		)
	}

	constructor() {
		this.#isAnimToolActive = false
		this.#animPartsDiv = null
		this.#makeUiItem()
		this.#toggleVisualization(this.#rootNode, this.#isAnimToolActive)
	}

	#createClipToolsDiv() {
		if (this.#clipToolsDiv != null) {
			this.#rootNode.removeChild(this.#clipToolsDiv)
			this.#clipToolsDiv = null
		}
		this.#clipToolsDiv = document.createElement("div")
		this.#clipToolsDiv.setAttribute("id", "clipTools")
		this.#rootNode.appendChild(this.#clipToolsDiv)

		this.#addCurrentBtn = document.createElement("button")
		this.#addCurrentBtn.setAttribute("class", "animToolLogBtn")
		this.#addCurrentBtn.innerText = "Add Current To Clip"
		this.#addCurrentBtn.addEventListener("click", () => {
			this.#addKeyframe()
		})
		this.#clipToolsDiv.appendChild(this.#addCurrentBtn)

		this.#addCurrentTxt = document.createElement("input")
		this.#addCurrentTxt.setAttribute("type", "text")
		this.#addCurrentTxt.setAttribute("placeholder", "set keyframe name")
		this.#clipToolsDiv.appendChild(this.#addCurrentTxt)

		this.#clipToolsDiv.appendChild(document.createElement("br"))

		this.#modifySelectedBtn = document.createElement("button")
		this.#modifySelectedBtn.setAttribute("class", "animToolLogBtn")
		this.#modifySelectedBtn.innerText = "Modify existent keyframe"
		this.#modifySelectedBtn.addEventListener("click", () => {
			this.#modifyKeyframe()
		})
		this.#clipToolsDiv.appendChild(this.#modifySelectedBtn)

		this.#modifySelectedList = document.createElement("select")
		this.#clipToolsDiv.appendChild(this.#modifySelectedList)

		for (let i = 0; i < this.#keyFrameArray.length; i++) {
			let opt = document.createElement("option")
			opt.setAttribute("value", i)
			opt.innerText = this.#keyFrameNaming[i]
			this.#modifySelectedList.appendChild(opt)
		}

		this.#clipToolsDiv.appendChild(document.createElement("br"))

		this.#removeSelectedBtn = document.createElement("button")
		this.#removeSelectedBtn.setAttribute("class", "animToolLogBtn")
		this.#removeSelectedBtn.innerText = "remove existent keyframe"
		this.#clipToolsDiv.appendChild(this.#removeSelectedBtn)
		this.#removeSelectedBtn.addEventListener("click", () => {
			this.#removeKeyframe()
		})

		this.#removeSelectedList = document.createElement("select")
		this.#clipToolsDiv.appendChild(this.#removeSelectedList)

		for (let i = 0; i < this.#keyFrameArray.length; i++) {
			let opt = document.createElement("option")
			opt.setAttribute("value", i)
			opt.innerText = this.#keyFrameNaming[i]
			this.#removeSelectedList.appendChild(opt)
		}

		this.#clipToolsDiv.appendChild(document.createElement("br"))

		this.#printClip = document.createElement("button")
		this.#printClip.setAttribute("class", "animToolLogBtn")
		this.#printClip.innerText = "print current animation clip"
		this.#clipToolsDiv.appendChild(this.#printClip)
		this.#printClip.addEventListener("click", () => {
			this.#printAnimation()
		})
	}

	#addKeyframe() {
		let ret = []
		this.#bones.forEach((b) => {
			let holder
			holder = helper.bones[b.boneId].quaternion
			ret.push(new Quaternion(holder.x, holder.y, holder.z, holder.w))
		})
		this.#keyFrameArray.push(ret)
		this.#keyFrameNaming.push(this.#addCurrentTxt.value.toString())

		this.#updateAnimationParts(true)
	}

	#modifyKeyframe() {
		let i = this.#modifySelectedList.options[this.#modifySelectedList.selectedIndex].value

		let ret = []
		this.#bones.forEach((b) => {
			let holder
			holder = helper.bones[b.boneId].quaternion
			ret.push(new Quaternion(holder.x, holder.y, holder.z, holder.w))
		})

		this.#keyFrameArray[i] = ret

		this.#updateAnimationParts(true)
	}

	#removeKeyframe() {
		let i = this.#removeSelectedList.options[this.#removeSelectedList.selectedIndex].value

		this.#keyFrameArray.splice(i, 1)
		this.#keyFrameNaming.splice(i, 1)

		this.#updateAnimationParts(true)
	}

	#printAnimation() {
		let ret = `export let ${this.#currentClip}Data = [\n`

		for (let i = 0; i < this.#keyFrameArray.length; i++) {
			ret += "[\n"
			for (let j = 0; j < this.#keyFrameArray[i].length; j++) {
				let h = this.#keyFrameArray[i][j]
				ret += `new THREE.Quaternion(${h.x}, ${h.y}, ${h.z}, ${h.w}), //${this.#bones[j].short}\n`
			}
			ret += "],\n"
		}

		ret += `] \nexport let ${this.#currentClip}Naming = [\n`
		for (let i = 0; i < this.#keyFrameNaming.length; i++) {
			let h = this.#keyFrameNaming[i]
			ret += `"${h}", \n`
		}
		ret += "]"

		console.log(ret)
		alert(
			"Copy the message in the console and paste it in the correct file, replacing all the previous content. " +
				"Mind that at the end may stick some text from the console, like the js file from where the message comes. delete it."
		)
	}

	#createAnimationPartsDiv() {
		this.#animPartsDiv = document.createElement("div")
		this.#animPartsDiv.setAttribute("id", "animPartsDiv")
		this.#animPartsDiv.setAttribute("class", "animTool")
		this.#animPartsDiv.style.setProperty("right", "10px")
		this.#animPartsDiv.style.setProperty("left", "auto")
		document.body.appendChild(this.#animPartsDiv)

		this.#selectedClipDiv = null

		this.#updateAnimationParts()
	}

	#updateAnimationParts(modified = false) {
		if (this.#selectedClipDiv == null) {
			if (this.#selectedClipDiv != "new") {
				this.#selectedClipDiv = document.createElement("div")
				this.#selectedClipDiv.setAttribute("id", "selectedClipDiv")
				this.#selectedClipDiv.currentClip = this.#currentClip
				this.#animPartsDiv.appendChild(this.#selectedClipDiv)

				let label = document.createElement("h3")
				label.innerText = "Selected Animation: " + this.#currentClip
				this.#selectedClipDiv.appendChild(label)

				this.#currentFrameLabel = document.createElement("label")
				this.#currentFrameLabel.innerText = "Selected Keyframe: none"
				this.#selectedClipDiv.appendChild(this.#currentFrameLabel)
				this.#selectedClipDiv.appendChild(document.createElement("br"))
			} else {
				this.#selectedClipDiv = document.createElement("div")
				this.#selectedClipDiv.setAttribute("id", "selectedClipDiv")
				this.#selectedClipDiv.currentClip = "new"
				this.#animPartsDiv.appendChild(this.#selectedClipDiv)

				let label = document.createElement("h3")
				label.innerText = "Selected Animation: " + "new"
				this.#selectedClipDiv.appendChild(label)

				this.#currentFrameLabel = document.createElement("label")
				this.#currentFrameLabel.innerText = "Selected Keyframe: none"
				this.#selectedClipDiv.appendChild(this.#currentFrameLabel)
				this.#selectedClipDiv.appendChild(document.createElement("br"))
			}
		}
		if (this.#selectedClipDiv.currentClip != this.#currentClip || modified) {
			this.#animPartsDiv.removeChild(this.#selectedClipDiv)
			this.#selectedClipDiv = null
			this.#updateAnimationParts()
		} else if (this.#selectedClipDiv.children[this.#selectedClipDiv.children.length - 2].className != "animToolLogBtn") {
			for (let i = 0; i < this.#keyFrameArray.length; i++) {
				let btn = document.createElement("button")
				btn.setAttribute("id", this.#keyFrameNaming[i] + "KeyFrame")
				btn.setAttribute("class", "animToolLogBtn")
				btn.innerText = this.#keyFrameNaming[i]
				this.#selectedClipDiv.appendChild(btn)
				btn.addEventListener("click", () => this.#adjustPosition(i))
				this.#selectedClipDiv.appendChild(document.createElement("br"))
			}
			this.#createClipToolsDiv()
		}
	}

	#adjustPosition(index) {
		let boneId
		this.#currentFrameLabel.innerText = "Selected Keyframe: " + this.#keyFrameNaming[index]

		for (let i = 0; i < this.#keyFrameArray[index].length; i++) {
			boneId = this.#bones[i].boneId

			const h = this.#keyFrameArray[index][i]
			helper.bones[boneId].quaternion.set(h.x, h.y, h.z, h.w)

			if (this.#dropDown.options[this.#dropDown.selectedIndex].value == boneId) {
				let rot = helper.bones[boneId].rotation
				rot = new Vector3(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2))
				this.#inputX.value = rot.x
				this.#inputY.value = rot.y
				this.#inputZ.value = rot.z
				this.adjustSliders()
			}
		}
	}

	createAnimationArray(clip) {
		if (clip != null && clip != "new") {
			eval(`this.#keyFrameArray = ${clip}Data`)
			eval(`this.#keyFrameNaming = ${clip}Naming`)
		} else {
			this.#keyFrameArray = []
			this.#keyFrameNaming = []
		}
		this.#currentClip = clip

		if (this.#animPartsDiv == null) {
			this.#createAnimationPartsDiv()
		} else {
			this.#updateAnimationParts()
		}
	}

	// test() {
	// 	let aniExe = new animationExec()
	// 	aniExe.getAnimation(null, null, animationClips.walk)
	// }

	//TODO: enhance tool by constructing full animation
	// addCurrentToAnimArray() {
	// 	let current = []
	// }
	// removeLastToAnimArray() {
	// 	this.#keyFrameArray.pop()
	// 	console.log(this.#keyFrameArray)
	// }

	toggleAnimationTool(active) {
		this.#isAnimToolActive = active
		this.#toggleVisualization(this.#rootNode, this.#isAnimToolActive)
	}

	#toggleVisualization(div, isActive) {
		div.hidden = !isActive
	}

	rotatebone() {
		let boneId = this.#dropDown.options[this.#dropDown.selectedIndex].value

		helper.bones[boneId].quaternion.setFromEuler(new THREE.Euler(this.#inputX.value, this.#inputY.value, this.#inputZ.value, "XYZ"))
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
			ret += `${holder.x.toFixed(2)}, ${holder.y.toFixed(2)}, ${holder.z.toFixed(2)}, ${holder.w.toFixed(2)}\n`
		})
		alert("Actual Relevant Bones Quaternions (x, y, z, w): \n" + ret)
	}
	constructAnim() {
		let ret = ""

		let holder
		this.#bones.forEach((b) => {
			holder = helper.bones[b.boneId].quaternion
			ret += `new THREE.Quaternion(${holder.x.toFixed(2)}, ${holder.y.toFixed(2)}, ${holder.z.toFixed(2)}, ${holder.w.toFixed(2)}), //${
				b.short
			}\n`
		})
		alert("copy this: \n[\n" + ret + "],")
	}
}
