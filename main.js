$(document).ready(function() {
	var fdom = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()+1; //finds first day of month

	function refreshStuff() {
		for (var i=1; i<43; i++) {
			document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = ((i-fdom)+1); //labels days (with neg. #s, unfortunately)
			if ((i-fdom)+1<1) {
				//if there are days numbered 0 or less
				var x = daysInMonth(new Date().getMonth(),new Date().getUTCFullYear()); //days in previous month
				document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = (x+((i-fdom)+1)); //renumber dates before start of month correctly
			}
			if ((i-fdom)+1>daysInMonth(new Date().getMonth()+1,new Date().getUTCFullYear())) {
				//if there are days numbered over the max. # of days in this month
				document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = (((i-fdom)+1)-daysInMonth(new Date().getMonth()+1,new Date().getUTCFullYear())); //renumber dates after end of month correctly
			}
		}
	}

	refreshStuff();
});

function daysInMonth(month,year) 
{
   return new Date(year, month, 0).getDate();
}