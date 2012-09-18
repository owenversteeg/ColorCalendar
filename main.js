var dtu = new Date();

$(document).ready(function() {
	//Only do this stuff when the document's ready...
	"use strict"; //puts the browser into strict mode... helps me catch errors quicker
	
	Mousetrap.bind('left', function() { if(yearsShowing) { chYr('p'); } else { chMon('p'); } });
	
	Mousetrap.bind('right', function() { if(yearsShowing) { chYr('n'); } else { chMon('n'); } });
	
	Mousetrap.bind('up up down down left right left right b a enter', function() {
  		alert('Konami code!');
	});

	Mousetrap.bind('esc', function() {
 		refreshYears(parseInt($('#ytext')[0].innerText.substring(0,4)));
		showYears(); 
	});

	bindTouchStuff();

	resizeStuff();

	refreshStuff();
	
	refreshYears(2001);
	
	reloadBubbles();
});

function reloadBubbles() {
	//remove all dots
	var x = 1;
	$.each($('.dots'), function() { 
		this.innerHTML = ""; 
		this.id = 'dots'+x;
		x++;
	});
	x=1;
	$.each($('.open'), function() { 
		this.innerHTML = ""; 
		this.id = 'open'+x;
		x++;
	});
	
	//create new dots	
	for (var i=0; i<datas.length; i++) {
		for (var x=1; x<daysInMonth(dtu.getMonth()+1,dtu.getUTCFullYear())+1; x++) {
			//for each day in month
			var dated = (dtu.getMonth()+1).toString()+'/'+x.toString()+'/'+dtu.getUTCFullYear().toString();
			if (typeof datas[i][dated] !== 'undefined') {
				$('#dots'+(x+dfb))[0].innerHTML += '<li class="'+datas[i].color+'"></li> ';
				
				//console.log(x+'  '+datas[i].color);
			}
		}
	}
	
	//ending
	for (var x=1; x<daysInMonth(dtu.getMonth()+1,dtu.getUTCFullYear())+1; x++) {
		//for each day in month
		$('#dots'+(x+dfb))[0].innerHTML = '<ul>' + $('#dots'+(x+dfb))[0].innerHTML + '</ul>';
	}
	
	//create new stuffs	
	for (var i=0; i<datas.length; i++) {
		for (var x=1; x<daysInMonth(dtu.getMonth()+1,dtu.getUTCFullYear())+1; x++) {
			//for each day in month
			var dated = (dtu.getMonth()+1).toString()+'/'+x.toString()+'/'+dtu.getUTCFullYear().toString();
			if (typeof datas[i][dated] !== 'undefined') {
				var when = parseInt(datas[i][dated].substr(0,5))+(parseInt(datas[i][dated].substr(0,5).substr(3))/60);
				when=when*20;
				$('#open'+(x+dfb))[0].innerHTML += '<li class="'+datas[i].color+'" style="margin-top:'+when+'px;"><p>'+datas[i][dated]+'</p></li> ';
				
				//console.log(x+'  '+datas[i].color);
			}
		}
	}
	
	//ending
	for (var x=1; x<daysInMonth(dtu.getMonth()+1,dtu.getUTCFullYear())+1; x++) {
		//for each day in month
		$('#open'+(x+dfb))[0].innerHTML = '<ul>' + $('#open'+(x+dfb))[0].innerHTML + '</ul>';
	}
}

var yearsShowing = false;

function bindTouchStuff() {
	var hammer = new Hammer(document.getElementById("all"));

	hammer.ondragstart = function(ev) { 
		if (yearsShowing) {
			if (ev.direction == "right") {
				chYr('p');
			}
			if (ev.direction == "left") {
				chYr('n');
			}
		}
		else {
			if (ev.direction == "right") {
				chMon('p');
			}
			if (ev.direction == "left") {
				chMon('n');
			}
		}
	};
	var hammer = new Hammer(document.getElementById("all"));

	hammer.ontransformstart = function(ev) { 
		refreshYears(parseInt($('#ytext')[0].innerText.substring(0,4)));
		showYears();
	};
}

function daysInMonth(month,year) {
	return new Date(year, month, 0).getDate();
}

var dfb = 0;

function refreshStuff() {
	$('#daysmonth').addClass('zoom');

	var fdom = new Date(dtu.getFullYear(), dtu.getMonth(), 1).getDay()+1; //finds first day of month
	
	dfb = 0; //days from beginning that month starts
	
	var mdtu = moment(dtu);
	$('#mtext')[0].innerText = moment.months[mdtu.month()]+' '+mdtu.year();
	
	for (var i=1; i<43; i++) { //43 not 42 and 1 not 0 because dates are not arrayish
		//for each of the 42 cells
		
		decolorize(i);
		
		document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = ((i-fdom)+1); //labels days (with neg. #s, unfortunately)
		if ((i-fdom)+1<1) {
			dfb++;
			//if there are days numbered 0 or less
			var x = daysInMonth(dtu.getMonth(),dtu.getUTCFullYear()); //days in previous month
			document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = (x+((i-fdom)+1)); //renumber dates before start of month correctly
		}
		else if ((i-fdom)+1>daysInMonth(dtu.getMonth()+1,dtu.getUTCFullYear())) {
			//if there are days numbered over the max. # of days in this month
			document.getElementById('day'+i).childNodes[1].childNodes[0].innerText = (((i-fdom)+1)-daysInMonth(dtu.getMonth()+1,dtu.getUTCFullYear())); //renumber dates after end of month correctly
		}
		else {
			colorize(i);
		}
	}
	//console.log(dfb);
	if (mdtu.month() == new Date().getMonth()) {
		$('#day'+(new Date().getDate()+dfb)).addClass('today');
	}
	
	setTimeout('$("#daysmonth").removeClass("zoom");', 200);
	
	//document.body.style.webkitTransformOrigin = "";	document.body.style.webkitTransform = "";		document.body.style.operaTransformOrigin = "";	document.body.style.operaTransform = "";		document.body.style.MozTransformOrigin = "";	document.body.style.MozTransform = "";		document.body.style.transformOrigin = "";	document.body.style.transform = "";
}

var go;

function showYears() {
	$('#calendar')[0].style.display = "none";
	$('#yearendar')[0].style.display = "block";
	yearsShowing = true;
}

function refreshYears(start) {
	go = false;

	var i = 0;
	
	for (var z=1; z<11; z++) {
		//console.log($('#tr'+z)[0]);
		$.each($('#tr'+z)[0].childNodes, function() { 
			if (this.toString().indexOf('td') != -1) console.log(this);
			if (this.innerText !== undefined) {
				this.innerText = start+i;
				this.onclick=function () { if (go==true) { yearsShowing = false;dtu.setYear(parseInt(this.innerText)); refreshStuff(); $('#yearendar')[0].style.display = "none"; $('#calendar')[0].style.display = "block"; } };
				//console.log(this.onclick);
				i++;
			}
		});
	}
	
	$('#ytext')[0].innerText = start + '-' + (start+99);
	
	go=true;
}

function chYr(n) {
	//console.log('chYr'+n);
	if (n == 'n') refreshYears(parseInt(($('#ytext')[0].innerText).substring(0,4))+100)
	if (n == 'p') refreshYears(parseInt(($('#ytext')[0].innerText).substring(0,4))-100)
}

function colorize(i) {
	document.getElementById('day'+i).childNodes[1].childNodes[0].style.cssText += "color:black !important;";
	document.getElementById('day'+i).childNodes[1].style.background = "#E0E0E0";
}

function decolorize(i) {
	$('#day'+i).removeClass('today');
	document.getElementById('day'+i).childNodes[1].childNodes[0].style.cssText += "color:#969696 !important;";
	document.getElementById('day'+i).childNodes[1].style.background = "#F3F3F3";
}
	
function chMon(p) {
	if (p == 'p') dtu.setMonth(dtu.getMonth()-1);
	else if (p == 'n') dtu.setMonth(dtu.getMonth()+1);
	refreshStuff();
}

$(window).resize(function() {
	resizeStuff();
});

function resizeStuff() {
	$.each($('.day'), function() {
		this.setAttribute('style', 'width:'+($('#calheader')[0].clientWidth-6)/7+'px !important');
	});
	
	$.each($('.dayweek'), function() {
		this.setAttribute('style', 'width:'+($('#calheader')[0].clientWidth-6)/7+'px !important');
	});
}