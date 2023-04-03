export default function createResize() {
    const block_playground = document.getElementById("script-dragspace")
    const block_list = document.getElementById("script-block-list")
    const list_diff = 150
    const playground_diff_y = 40
    const playground_diff_x = 845
    function resize() {
        block_list.style.height = (window.innerHeight - list_diff)+"px";
        block_playground.style.height = (window.innerHeight - playground_diff_y)+"px"
        block_playground.style.width = (window.innerWidth - playground_diff_x)+"px"
    }
    document.body.onresize = resize;
    resize()
}