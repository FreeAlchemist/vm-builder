function Print(info){console.log(info)}
function getRandomInt(min, max){return Math.floor(Math.random() * (max - min + 1)) + min;}
/*Declare if selected table must be printed*/
function printToggle(){
	var noprintarr = $( "input[type=checkbox]" )
		for (var i =0; i < noprintarr.length; i++) {
		var noprintname = noprintarr[i].value
		if(!$("#"+noprintname).hasClass( "noprint" )){
			$("#"+noprintname).addClass("noprint")
		}
	}
	var printarr = $( "input[type=checkbox]:checked" )
	for (var i =0; i < printarr.length; i++) {
		var printname = printarr[i].value
		if($("#"+printname).hasClass( "noprint" )){
			$("#"+printname).removeClass("noprint")
		}
	}
}