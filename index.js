//background darkens as you scroll down
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

//download button without using href
// async function getLatestFile() {
//     let e = await (await (fetch('https://api.github.com/repos/blockyfish-client/desktop-client/releases/latest'))).json();
//     return e
// }
function download(link) {
    var element = document.createElement('a');
    element.setAttribute('href', link);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
const download_buttons = document.getElementsByClassName('download')
for (const download_button of download_buttons) {
    download_button.addEventListener("click", async e => {
        let t = await (await (fetch('https://api.github.com/repos/blockyfish-client/desktop-client/releases/latest'))).json();
        download(t.assets[0].browser_download_url)
    })
}