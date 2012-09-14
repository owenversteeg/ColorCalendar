var fdom = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()+1; //finds first day of month

function refreshStuff() {
	document.getElementById('day'+fdom).childNodes[1].childNodes[0].innerText = '1'; //labels days
}

refreshStuff();