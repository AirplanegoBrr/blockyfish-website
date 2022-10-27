function download(link) {
	var element = document.createElement("a");
	element.setAttribute("href", link);
	element.setAttribute("download", "");
	element.style.display = "none";
	document.body.appendChild(element);
	element.target = "_blank";
	element.click();
	document.body.removeChild(element);
}

var plugin_search = document.querySelector("form.search-box input");
function filter_cards() {
	var cards_shown = false;
	var cards = document.getElementsByClassName("card");
	if (plugin_search.value == "") {
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.display = "block";
			cards_shown = true;
		}
	} else {
		for (let i = 0; i < cards.length; i++) {
			var plugin_name = document.querySelector(
				".card:nth-child(" + (i + 1) + ") .card-info-title h3"
			).innerText;
			if (
				plugin_name.toLowerCase().includes(plugin_search.value.toLowerCase())
			) {
				cards[i].style.display = "block";
				cards_shown = true;
			} else {
				cards[i].style.display = "none";
			}
		}
	}
	if (!cards_shown) {
		document.getElementById("not-found").style.display = "flex";
		document.getElementById("cards").style.display = "none";
	} else {
		document.getElementById("not-found").style.display = "none";
		document.getElementById("cards").style.display = "flex";
	}
}
plugin_search.addEventListener("keyup", () => {
	filter_cards();
});
document
	.querySelector("#title-banner form > button:nth-child(4)")
	.addEventListener("click", () => {
		plugin_search.value = "";
		filter_cards();
	});
