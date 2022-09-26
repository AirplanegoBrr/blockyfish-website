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
function matches(text, partial) {
    try {
        return text.toLowerCase().indexOf(partial.toLowerCase()) > -1;
    } catch (e) {
        console.log('uh oh')
    }
}

const download_buttons = document.getElementsByClassName('download')
const download_text = document.getElementById('download-text')
const pre_download = document.getElementById('pre-download')
const post_download = document.getElementById('post-download')
const redownload = document.getElementById('redownload-link')
function download(link) {
    var element = document.createElement('a')
    element.setAttribute('href', link)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
const download_pos = findPos(download_text)
async function startDownload() {
    window.scroll({
        top: download_pos,
        behavior: 'smooth'
    })
    Name = "unknown"
    if (navigator.appVersion.indexOf("Win") != -1) Name = "win";
    if (navigator.appVersion.indexOf("Mac") != -1) Name = "mac";
    if (navigator.appVersion.indexOf("X11") != -1) Name = "x11";
    if (navigator.appVersion.indexOf("Linux") != -1) Name = "linux";
    let t = await (await (fetch('https://api.github.com/repos/blockyfish-client/desktop-client/releases/latest'))).json();
    for (let i = 0; i < t.assets.length; i++) {
        if (matches(t.assets[i].name, Name)) {
            download(t.assets[i].browser_download_url)
            redownload.href = t.assets[i].browser_download_url 
        }
    }
    pre_download.style.opacity = '0'
    document.getElementById('bottom-download').style.opacity = '0'
    setTimeout(function() {
        pre_download.style.display = 'none'
        document.getElementById('bottom-download').style.display = 'none'
        post_download.style.display = 'grid'
    }, 500)
    setTimeout(function() {
        post_download.style.opacity = '1'
    }, 510)
}
for (const download_button of download_buttons) {
    download_button.addEventListener("click", async e => {
        if (navigator.userAgent.indexOf("Win")!=-1||navigator.userAgent.indexOf("Linux")!=-1) {
            startDownload()
        }
        else {
            modal.style.opacity = '1'
            modal.style.pointerEvents = 'all'
        }
    })
}

//discord server button
document.querySelector('button.discord').addEventListener("click", () => {
    window.open('https://discord.gg/vQnrUVxAvT')
})

//incompat. download modal
const modal = document.getElementById('modal-bg')
const modal_cancel = document.getElementById('modal-cancel')
const modal_proceed = document.getElementById('modal-proceed')
modal.style.opacity = '0'
modal.style.pointerEvents = 'none'
modal_cancel.addEventListener("click", () => {
    modal.style.opacity = '0'
    modal.style.pointerEvents = 'none'
})
modal_proceed.addEventListener("click", () => {
    modal.style.opacity = '0'
    modal.style.pointerEvents = 'none'
    startDownload()
})

//download count fetcher
async function getDownloadCount() {
    let json_data = await (await (fetch('https://api.github.com/repos/blockyfish-client/desktop-client/releases/latest'))).json();
    const download_count = document.getElementById('download-count')
    Name = "unknown"
    if (navigator.appVersion.indexOf("Win") != -1) Name = "win";
    if (navigator.appVersion.indexOf("Mac") != -1) Name = "mac";
    if (navigator.appVersion.indexOf("X11") != -1) Name = "x11";
    if (navigator.appVersion.indexOf("Linux") != -1) Name = "linux";
    for (let i = 0; i < json_data.assets.length; i++) {
        if (matches(json_data.assets[i].name, Name)) {
            download_count.innerText = json_data.assets[i].download_count + ' downloads for ' + json_data.tag_name
        }
    }
}
getDownloadCount()