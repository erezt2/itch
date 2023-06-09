
export default function createNavbar() {
  let selected_editor = undefined;
  let selected_editor_screen = undefined;
  const navbar = document.getElementById("editor-navbar")
  const wrapper = document.getElementById("editor-wrapper")
  function selectNavbarWrapper(index) {
    return () => selectNavbar(index)
  }

  function selectNavbar(num) {
    selected_editor?.classList.remove("editor-selected")
    selected_editor_screen?.classList.remove("editor-selected")
    selected_editor = navbar.children[3+num]
    selected_editor_screen = wrapper.children[num]
    selected_editor.classList.add("editor-selected")
    selected_editor_screen.classList.add("editor-selected")
  }

  for(let i=0; i<3; i++) {
    navbar.children[3+i].onclick = selectNavbarWrapper(i)
  }

  selectNavbarWrapper(0)()
}
