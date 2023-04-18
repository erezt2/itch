import global from "./global.js"

export default function createListWrap(data, exists) {
    let dom, selected, dropdown, div
    let has_div = (data.default.length !== 0)
    if (exists !== undefined) {
        dom = exists;
        selected = dom.firstChild
        dropdown = dom.lastChild
        div = dropdown.querySelector(".selectable-division")
    }
    else {
        dom = document.createElement("span")
        selected = document.createElement("span")
        dom.appendChild(selected)
        let vari = data.variable()

        if(data.default.length !== 0) selected.innerHTML = data.default[0]
        else if (vari.length !== 0) selected.innerHTML = vari[0]
        else selected.innerHTML = ""

        dropdown = document.createElement("div")
        dom.appendChild(dropdown)

        if(data.default.length !== 0) {
            for(let s of data.default) {
                let temp = document.createElement("div")
                temp.innerHTML = s
                dropdown.appendChild(temp)
            }

            div = document.createElement("div")
            div.classList.add("selectable-division")
            dropdown.appendChild(div)
        }

        dropdown.classList.add("selectable-dropdown")
        dom.classList.add("selectable")
    }
    
    dropdown.style.display = "none"

    if(has_div) {
        for(let i=0; dropdown.children[i] !== div; i++) {
            dropdown.children[i].onclick = function(event) {
                event.preventDefault()
                event.stopPropagation()
                dropdown.style.display = "none"
                selected.innerHTML = dropdown.children[i].innerHTML
            }
        }
    }
    
    dom.onclick = function(event) {
        event.stopPropagation()
        event.preventDefault()
        if(dropdown.style.display === "flex") {
            dropdown.style.display = "none"
            global.handle_dropdown()
        }
        else {
            global.handle_dropdown()
            global.open_dropdown = dropdown
            dropdown.style.display = "flex"
        }
        
        
        if(has_div) {
            while(dropdown.lastChild !== div)
                dropdown.removeChild(dropdown.lastChild);
        }
        else {
            while(dropdown.firstChild)
                dropdown.removeChild(dropdown.lastChild);
        }
        
        let vari = data.variable()
        for(let s of vari) {
            let temp = document.createElement("div")
            temp.innerHTML = s

            temp.onclick = function(event) {
                event.preventDefault()
                event.stopPropagation()
                dropdown.style.display = "none"
                selected.innerHTML = s
            }

            dropdown.appendChild(temp)
        }
        dropdown.style.left = "0px"
        dropdown.style.top = "100%"
        let rect = dropdown.getBoundingClientRect()
        dropdown.style.left = Math.min(window.innerWidth - rect.left - dropdown.offsetWidth - 20, 0) + "px"
        dropdown.style.top = "calc(100% + " + Math.min(window.innerHeight - rect.top - dropdown.offsetHeight - 20, 0) + "px)"
    }
    
    return dom
}