
function selectPlayground(name) {
    document.querySelector("#script-dragspace > .active")?.classList.remove("active");
    document.querySelector(`#ds_${name}`).classList.add("active")
    document.querySelector("#sprites > .selected")?.classList.remove("selected");
    document.querySelector(`#ss_${name}`).classList.add("selected")
}
const sprites = document.getElementById("sprites")
const new_char = document.getElementById("new-character")
function createSpriteSelection(name, immutable) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    container.appendChild(document.createElement("img"))
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    template.id = "ss_" + name
    template.onclick = (event) => {
        selectPlayground(name)
    }

    sprites.insertBefore(template, new_char)

}

export {createSpriteSelection, selectPlayground}