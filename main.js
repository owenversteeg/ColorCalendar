var fdom = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()+1; //finds first day of month

function refreshStuff() {
	for (var i=1; i<34; i++) {
		document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = ((i-fdom)); //labels days
	}
}

refreshStuff();