var b = document.getElementById('body')
var scroll_prompt = document.querySelector('div.prompt')
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > 400) {
        var pos = 400
        scroll_prompt.style.opacity = 0
    }
    else {
        var pos = scroll
        scroll_prompt.style.opacity = 1
    }
    b.style.setProperty('--opacity', 0.2 + pos/800)
});