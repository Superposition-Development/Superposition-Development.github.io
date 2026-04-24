function sleep(time_ms) {
    return new Promise((resolve) => {
	setTimeout(resolve, time_ms);
    })
}


async function switchPage(to) {
    let location = ""
    switch (to) {
    case "about":
	location = "pages/about.html"
	break;

    case "projects":
	location = "pages/projects.html"
	break;

    case "people":
	location = "pages/people.html"
	break;

    }
    
    document.body.classList.add("blur-out");
    await sleep(1000); // blur-out animation time
    document.body.classList.remove("blur-out");
    
    window.location.href = location
}
