var fdom = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()+1; //finds first day of month

function refreshStuff() {
	for (var i=1; i<35; i++) {
		document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = ((i-fdom)+1); //labels days
	}
}

refreshStuff();