//Get selected option values for Army and Pointsystem
var army
pointsystem = $("select[name='pointsystem'] > option:checked").val()
console.log('pointsystem '+pointsystem)
$("#armyselect").change(function(){
		army = $("select[name='armyselect'] > option:checked").val()
		detachmentsList ()
		getPoints()
		detToggle2()
})

$("#pointsystem").change(function(){
		pointsystem = $("select[name='pointsystem'] > option:checked").val()
		detachmentsList ()
		getPoints()
		detToggle2()
})

var rosterformed = 0
//--------------------------------------------------------------------
//Toggle between detachments and roster
function detToggle(){
	if(rosterformed == 0){
		$("#detachments").toggle()
		$("#page").toggle()
		getRoster(army)
		rosterformed = 1
		$('#roster-btn').attr("value","Detachments")
		$('#roster-btn').attr("title","Select Detachments")
	}
	else{
		$("#detachments").toggle()
		$("#page").toggle()
		rosterformed = 0
		$('#roster-btn').attr("value","Roster")
		$('#roster-btn').attr("title","Generate Army Roster")
	}
}
//--------------------------------------------------------------------
//Go to detachments list
function detToggle2(){
	var mode = $('#roster-btn').attr("value")
	if(mode == "Detachments"){
		$("#detachments").toggle()
		$("#page").toggle()
		rosterformed = 0
		$('#roster-btn').attr("value","Roster")
		$('#roster-btn').attr("title","Generate Army Roster")
	}
}
//--------------------------------------------------------------------
//Declare if selected table must be printed
function printToggle(){
	// console.log('---------------------------------------------------- PRINT TOGGLE')
	var noprintarr = $( "input[type=checkbox]" )
		for (var i =0; i < noprintarr.length; i++) {
		var noprintname = noprintarr[i].value
		if(!$("#"+noprintname).hasClass( "noprint" )){
			// console.log("#"+noprintname+' has class noprint! Removed and added')
			$("#"+noprintname).addClass("noprint")
		}
	}
	var printarr = $( "input[type=checkbox]:checked" )
	for (var i =0; i < printarr.length; i++) {
		var printname = printarr[i].value
		// console.log(printname)
		// console.log($("#"+printname))
		if($("#"+printname).hasClass( "noprint" )){
			// console.log("#"+printname+' has class noprint!')
			$("#"+printname).removeClass("noprint")
		}
	}
}
//--------------------------------------------------------------------
function counterVal(){
	var pointsperarmy = 0
	for (var i =0; i < rosterarr.length; i++) { 
		// rosterarr[i]
		var weaponnumberarr = $('#'+rosterarr[i]+' input[type=number]')
		// console.log('---weaponnumberarr')
		// console.log(weaponnumberarr)
		// var counternames = []
		var modelsvalue = $('#'+rosterarr[i]+'-modelsnum').val()

		var pointsperunit = pointsarr[i]
		if(modelsvalue){
			// console.log(modelsvalue)
			pointsperunit = parseInt(pointsarr[i])*parseInt(modelsvalue)
		}
		var counterpoints = 0
		for (var j =0; j < weaponnumberarr.length; j++) {
			var countername = weaponnumberarr[j].name
			var countervalue = weaponnumberarr[j].value
			console.log(countervalue)
			if(countervalue > 0 && $(weaponnumberarr[j]).hasClass('modelsnum') == false){
				$(weaponnumberarr[j]).css('background-color','rgba(249,206,116,1)')
				console.log($(weaponnumberarr[j]).parent().parent('tr'))
				$(weaponnumberarr[j]).parent().parent('tr').removeClass('noprint')
			}
			else{
				$(weaponnumberarr[j]).css('background-color','white')
				$(weaponnumberarr[j]).parent().parent('tr').addClass('noprint')
			}
			// counternames.push(countername)
			if(library[army].weapons[countername] && library[army].weapons[countername].points){
				counterpoints += parseInt(countervalue)*parseInt(library[army].weapons[countername].points)
			}
		}
		pointsperunit += counterpoints
		// console.log(counternames)
		// console.log('counterpoints')
		// console.log(counterpoints)
		// console.log('pointsperunit')
		// console.log(pointsperunit)
		$('#'+rosterarr[i]+'-totalunitpoints').html(pointsperunit)
		pointsperarmy += pointsperunit
	}
	console.log('pointsperarmy')
	console.log(pointsperarmy)
	$('#roster-totalpoints').html(pointsperarmy)
}
//--------------------------------------------------------------------
//Add all army select options to menu
function armyList(library){
	var arr = []
	// selectarr = []
	for (p in library){
		arr.push(p)
	}
	// console.log(arr)
	for(var i = 0; i < arr.length; i++){
		if(library[arr[i]]){
			var option = $('<option />')
			option.attr('value',arr[i])
			if(i == 0){
				option.attr('selected','selected')
				army = arr[i]
				// console.log(army)
			}
			option.attr('label',library[arr[i]].armyname)
				$('#armyselect').append(option)
		}
	}
}
//--------------------------------------------------------------------
//Get points for all selected units ???
function getPoints(){
	//all selected units
	allrosterarr = []
	//all selected units by detachment
	detrosterarr = []
	// console.log("Changed option")
	// console.log(selectarr)
	// console.log(selectarr.length)
	detpoints = 0
	unitcount = 0
	for (var i =0; i < selectarr.length; i++) {
		var detachselectpoints = 0
		// $("#"+detachmentsarr[i]+"-points").html(detachselectpoints+' pts')
		var detachselect = selectarr[i]
		var detroster = []
		// console.log(detachselect)
		// console.log(detachselect.length)
		var previousunit
		for (var j =0; j < detachselect.length; j++) {
			var selectedunit = $("select[name='"+detachselect[j]+"'] > option:checked").val()
			if(selectedunit){
				allrosterarr.push(selectedunit)
				detroster.push(selectedunit)
				var unitpoints = 0
				// console.log(selectarr[i])
				// console.log('SELECTED UNIT '+selectedunit)
				// console.log(library[army].units[selectedunit].points)
				// console.log(detachmentsarr[i])
				if(pointsystem == 'powerpoints'){
					unitpoints = library[army].units[selectedunit].powerpoints || 0
				}
				if(pointsystem == 'points'){
					if(library[army].units[selectedunit].pointspermodel){
						unitpoints = library[army].units[selectedunit].pointspermodel || 0
						// unitpoints = $('#'+selectedunit+'-totalunitpoints').value || 0
						// $('#'+selectedunit+'-totalunitpoints')
					}
				}
				console.log('unitpoints '+unitpoints)
				unitcount+=1
				detpoints+=parseInt(unitpoints)
				detachselectpoints+=parseInt(unitpoints)
			}
			$("#"+detachmentsarr[i]+"-points").html(detachselectpoints+' pts')

		}
		detrosterarr.push(detroster)
	}
	// army = $("select[name='armyselect'] > option:checked").val()
	// console.log(unitcount+' units')
	// console.log(detpoints+' pts')
	$("#totalpoints").html(detpoints+' pts')

	//unique selected units
	rosterarr = []
	$.each(allrosterarr,function(i, el){
		if($.inArray(el, rosterarr) === -1) rosterarr.push(el);
	})


	console.log("allrosterarr: all selected units")
	console.log(allrosterarr)
	console.log(allrosterarr.length)
	console.log("detrosterarr: all selected units by detachment")
	console.log(detrosterarr)
	console.log(detrosterarr.length)
	console.log("rosterarr: unique selected units")
	console.log(rosterarr)
	console.log(rosterarr.length)
}
//--------------------------------------------------------------------
//Form detachments list with optional units from selected army
function detachmentsList () {
	selectarr = []
	var unitarr = []
	var hqarr = []
	var troopsarr = []
	var elitesarr = []
	var fastarr = []
	var heavyarr = []
	var flyersarr = []
	var dedicatedarr = []
	var lowarr = []
	var fortificationarr = []
	
	for(p in library[army].units){
		unitarr.push(p)
	}
	for (var i =0; i < unitarr.length; i++) {
		var thisunit = library[army].units[unitarr[i]]
		var role = thisunit.role
		if(role == 'HQ'){hqarr.push(unitarr[i])}
		if(role == 'Troops'){troopsarr.push(unitarr[i])}
		if(role == 'Elites'){elitesarr.push(unitarr[i])}
		if(role == 'Fast'){fastarr.push(unitarr[i])}
		if(role == 'Heavy'){heavyarr.push(unitarr[i])}
		if(role == 'Flyers'){flyersarr.push(unitarr[i])}
		if(role == 'Dedicated Transport'){dedicatedarr.push(unitarr[i])}
		if(role == 'Lord of War'){lowarr.push(unitarr[i])}
		if(role == 'Fortification'){fortificationarr.push(unitarr[i])}
	}
	detachmentsarr = []
	for(p in detachments){
		detachmentsarr.push(p)
	}
	var rolesarr = ['hq','troops','elites','fast','heavy','flyers','dedicated','low','fortification']
	var detarr = [hqarr,troopsarr,elitesarr,fastarr,heavyarr,flyersarr,dedicatedarr,lowarr,fortificationarr]
	var tr = $('<tr />');
	var td1 = $('<td />',{class:'detachment',text:'DETACHMENT'})
	var td2 = $('<td />',{class:'cp',text:'CP'})
	var td3 = $('<td />',{class:'hq',text:'HQ'})
	var td4 = $('<td />',{class:'troops',text:'Troops'})
	var td5 = $('<td />',{class:'elites',text:'Elites'})
	var td6 = $('<td />',{class:'fast',text:'Fast'})
	var td7 = $('<td />',{class:'heavy',text:'Heavy'})
	var td8 = $('<td />',{class:'flyers',text:'Flyers'})
	var td9 = $('<td />',{class:'dedicated',text:'Dedicated transport'})
	var td10 = $('<td />',{class:'low',text:'Lord of war'})
	var td11 = $('<td />',{class:'fortification',text:'Fortification'})
	var td12 = $('<td />',{class:'detpoints',text:'DetPts',id:'totalpoints'})

	var detachmentsinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10).append(td11).append(td12)
	$("#detachment").html(detachmentsinfo)

	for (var i =0; i < detachmentsarr.length; i++) {
		var thisdetachment = detachments[detachmentsarr[i]]
		var detselect = []
		var tr = $('<tr />',{id:detachmentsarr[i]})
		var td1 = $('<td />',{class:'detachment',text:thisdetachment.name})
		var td2 = $('<td />',{class:'cp',text:thisdetachment.cp})
		var detachmentsinfo = tr.append(td1).append(td2)
		$("#detachment").append(detachmentsinfo)

		for (var n =0; n < rolesarr.length; n++) {
			var minmax = thisdetachment[rolesarr[n]]
			var minrole = minmax[0]
			var maxrole = minmax[1]
			var diff = maxrole - minrole
			if(minrole == 0 && maxrole == 0){
				var td = $('<td />',{class:rolesarr[n]+' passive'})
			}
			else{
				if(minrole == 0){
					var td = $('<td />',{class:rolesarr[n]+' aux',text:minrole+'-'+maxrole}).append('<br>')
					for (var m =1; m <= maxrole; m++) {
						var select = $('<select />',{id:detachmentsarr[i]+'-'+rolesarr[n]+'-'+m,name:detachmentsarr[i]+'-'+rolesarr[n]+'-'+m,class:'rosterselect',title:"Auxilary choice"})
						detselect.push(detachmentsarr[i]+'-'+rolesarr[n]+'-'+m)
						select.change(function(){
							getPoints()
						})
						var thisdetarr = detarr[n]
						if(thisdetarr.length > 0){
							for(var o = 0; o < thisdetarr.length; o++){
									var option = $('<option />')
									option.attr('value',thisdetarr[o])
									option.attr('label',library[army].units[thisdetarr[o]].name)
									select.append(option)
							}
							var option = $('<option />')
							option.attr('selected','selected')
							select.prepend(option)
						}
						td.append(select)
					}
				}
				else{
					var td = $('<td />',{class:rolesarr[n]+' required',text:minrole+'-'+maxrole}).append('<br>')
					for (var m =1; m <= minrole; m++) {
						var select = $('<select />',{id:detachmentsarr[i]+'-'+rolesarr[n]+'-'+m,name:detachmentsarr[i]+'-'+rolesarr[n]+'-'+m,class:'required-select rosterselect',title:"Required choice"})
						detselect.push(detachmentsarr[i]+'-'+rolesarr[n]+'-'+m)
						select.change(function(){
							getPoints()
						})
						var thisdetarr = detarr[n]
						if(thisdetarr.length > 0){
							for(var o = 0; o < thisdetarr.length; o++){
									var option = $('<option />')
									option.attr('value',thisdetarr[o])
									if(o == 0){
										option.attr('selected','selected')
									}
									option.attr('label',library[army].units[thisdetarr[o]].name)
									select.append(option)
							}
							var option = $('<option />')
							option.attr('selected','selected')
							select.prepend(option)
						}
						td.append(select)
					}
					for (var m = minrole+1; m <= maxrole; m++) {
						var select = $('<select />',{id:detachmentsarr[i]+'-'+rolesarr[n]+'-'+m,name:detachmentsarr[i]+'-'+rolesarr[n]+'-'+m,class:'rosterselect',title:"Auxilary choice"})
						detselect.push(detachmentsarr[i]+'-'+rolesarr[n]+'-'+m)
						select.change(function(){
							getPoints()
						})
						var thisdetarr = detarr[n]
						if(thisdetarr.length > 0){
							for(var o = 0; o < thisdetarr.length; o++){
									var option = $('<option />')
									option.attr('value',thisdetarr[o])
									option.attr('label',library[army].units[thisdetarr[o]].name)
									select.append(option)
							}
							var option = $('<option />')
							option.attr('selected','selected')
							select.prepend(option)
						}
						td.append(select)
					}
				}
			}
			$("#"+detachmentsarr[i]).append(td)
		}
		var td = $('<td />',{id:detachmentsarr[i]+'-points',class:'detpoints',text:'DetPts'})
		$("#"+detachmentsarr[i]).append(td)
	selectarr.push(detselect)
	}
}
//--------------------------------------------------------------------
//Form datasheets for all selected units
function getRoster(army){
	if(army){
		console.log(rosterarr.length)
		//Form table with info on each selected detachment with list of units
		var table = $('<table />')
		table.attr('cellpadding',"0px")
		table.attr('cellspacing','0px')
		table.attr('width','100%')
		table.attr('class','topborder')
		table.attr('id','rostertable')
		$('#page').html(table)

		var tr = $('<tr />');
		if(pointsystem == 'powerpoints'){
			var td1 = $('<td />',{class:'weapon-stats-header',text:'Total Power Points'})
		}
		if(pointsystem == 'points'){
			var td1 = $('<td />',{class:'weapon-stats-header',text:'Total Matched Points'})
		}
		var td2 = $('<td />',{class:'weapon-stats-header',text:'Total CP'})
		var td3 = $('<td />',{class:'weapon-stats-header',text:'Total Units'})
		var td4 = $('<td />',{class:'weapon-stats-header',text:'Army'})

		var rosterinfo = tr.append(td1).append(td2).append(td3).append(td4)
		$('#rostertable').append(rosterinfo)

		var tr = $('<tr />');
		var td1 = $('<td />',{class:'weapon-stats-text',text:detpoints,id:'roster-totalpoints'})
		var td2 = $('<td />',{class:'weapon-stats-text',text:'',id:'roster-totalcp'})
		var td3 = $('<td />',{class:'weapon-stats-text',text:unitcount,id:'roster-totalunits'})
		var td4 = $('<td />',{class:'weapon-stats-text',text:library[army].armyname,id:'roster-army'})

		var rosterinfo = tr.append(td1).append(td2).append(td3).append(td4)
		$('#rostertable').append(rosterinfo)

		var tr = $('<tr />');
		var td1 = $('<td />',{class:'weapon-stats-header',text:'Points'})
		var td2 = $('<td />',{class:'weapon-stats-header',text:'CP'})
		var td3 = $('<td />',{class:'weapon-stats-header',text:'DETACHMENT"'})
		var td4 = $('<td />',{class:'weapon-stats-header',text:'Units'})
		
		var rosterinfo = tr.append(td1).append(td2).append(td3).append(td4)
		$('#rostertable').append(rosterinfo)
		//Write into roster table
		var TotalCP = 3
		for (var i =0; i < detachmentsarr.length; i++) {
			var Detpts = parseInt($("#"+detachmentsarr[i]+"-points").html())
			var DetCP = detachments[detachmentsarr[i]].cp
			var tr = $('<tr />',{id:detachmentsarr[i]+'-roster',class:'hide'});
			if(Detpts > 0){
				TotalCP += parseInt(DetCP)
				var tr = $('<tr />',{id:detachmentsarr[i]+'-roster'});
			}
			var td1 = $('<td />',{class:'weapon-stats-text',text:Detpts})
			var td2 = $('<td />',{class:'weapon-stats-text',text:DetCP})
			var td3 = $('<td />',{class:'weapon-stats-text',text:detachments[detachmentsarr[i]].name})
			var td4 = $('<td />',{class:'weapon-stats-text',id:detachmentsarr[i]+'-roster-units'})
			var rosterinfo = tr.append(td1).append(td2).append(td3).append(td4)
			$('#rostertable').append(rosterinfo)
		}
		$('#roster-totalcp').html(TotalCP)
		for (var i =0; i < detrosterarr.length; i++) {
			var unitlist = ''
			if(detrosterarr[i].length != 0){
				for (var j =0; j < detrosterarr[i].length; j++) {
					unitlist += library[army].units[detrosterarr[i][j]].name+'; '
				}
			}
			console.log('unitlist')
			console.log(unitlist)
			$('#'+detachmentsarr[i]+'-roster-units').html(unitlist)
		}

	//CANTICLES
		if(library[army].canticles){
			var wrap = $('<div />',{id:"canticles_wrap", class:"wrap noprint",title:"Canticles"})
			wrap.click(function(){
				$("#canticlestable tr").toggle()
			})
			var table = $('<table />')
			table.attr('cellpadding',"0px")
			table.attr('cellspacing','0px')
			table.attr('width','100%')
			table.attr('class','topborder noprint')
			table.attr('id','canticlestable')
			$('#page').append(table.append(wrap))
			var canticlesarr = []
			for (var c in library[army].canticles) {
				canticlesarr.push(c)
			}
			var canticlesquantity = canticlesarr.length
			var tr = $('<tr />')
			var input = $('<input />',{type:'checkbox',name:'canticlestable',value:'canticlestable',class:'noprint'})
			var td1 = $('<td />',{class:'army-header',text:'canticles'})
			var td2 = $('<td />',{class:'army-header'}).html('<span class="noprint">Print</span>').append(input)
			input.change(function(){
					printToggle()
			})
			var canticlesinfo = tr.append(td1).append(td2)
			$('#canticlestable').append(canticlesinfo)
			for (var s = 0; s < canticlesquantity; s++) {
				var thiscanticles = canticlesarr[s]
				var thiscanticlestext = library[army].canticles[thiscanticles]
				var tr = $('<tr />',{id:'canticles-'+(s+1)})
				// var input = $('<input />',{type:'checkbox',name:'canticlestable',value:'canticles-'+(s+1),class:'noprint'})
				var td1 = $('<td />',{class:'abilityheader'}).html(thiscanticles)
				// .prepend(input)
				var td2 = $('<td />',{class:'abilitytext'}).html(thiscanticlestext)
				var canticlesinfo = tr.append(td1).append(td2)
				$('#canticlestable').append(canticlesinfo)
				// input.change(function(){
				// 	printToggle()
				// })
			}
		}

	//DOGMA
		if(library[army].dogma){
			var wrap = $('<div />',{id:"dogma_wrap", class:"wrap noprint",title:"Dogma"})
			wrap.click(function(){
				$("#dogmatable tr").toggle()
			})
			var table = $('<table />')
			table.attr('cellpadding',"0px")
			table.attr('cellspacing','0px')
			table.attr('width','100%')
			table.attr('class','topborder noprint')
			table.attr('id','dogmatable')
			$('#page').append(table.append(wrap))
			var dogmaarr = []
			for (var c in library[army].dogma) {
				dogmaarr.push(c)
			}
			var dogmaquantity = dogmaarr.length
			var tr = $('<tr />')
			var input = $('<input />',{type:'checkbox',name:'dogmatable',value:'dogmatable',class:'noprint'})
			var td1 = $('<td />',{class:'army-header',text:'dogma'})
			var td2 = $('<td />',{class:'army-header'}).html('<span class="noprint">Print</span>').append(input)
			input.change(function(){
					printToggle()
				})
			var dogmainfo = tr.append(td1).append(td2)
			$('#dogmatable').append(dogmainfo)
			for (var s = 0; s < dogmaquantity; s++) {
				var thisdogma = dogmaarr[s]
				var thisdogmatext = library[army].dogma[thisdogma]
				var tr = $('<tr />',{class:'noprint',id:'dogma-'+(s+1)})
				var input = $('<input />',{type:'checkbox',name:'dogmatable',value:'dogma-'+(s+1),class:'noprint'})
				var td1 = $('<td />',{class:'abilityheader'}).html(thisdogma).prepend(input)
				var td2 = $('<td />',{class:'abilitytext'}).html(thisdogmatext)
				var dogmainfo = tr.append(td1).append(td2)
				$('#dogmatable').append(dogmainfo)
				input.change(function(){
					printToggle()
				})
			}
		}

	//TRAITS
		if(library[army].traits){
			var wrap = $('<div />',{id:"traits_wrap", class:"wrap noprint",title:"Traits"})
			wrap.click(function(){
				$("#traitstable tr").toggle()
			})
			var table = $('<table />')
			table.attr('cellpadding',"0px")
			table.attr('cellspacing','0px')
			table.attr('width','100%')
			table.attr('class','topborder noprint')
			table.attr('id','traitstable')
			$('#page').append(table.append(wrap))
			var traitsarr = []
			for (var c in library[army].traits) {
				traitsarr.push(c)
			}
			var traitsquantity = traitsarr.length
			var tr = $('<tr />')
			var input = $('<input />',{type:'checkbox',name:'traitstable',value:'traitstable',class:'noprint'})
			var td1 = $('<td />',{class:'army-header',text:'Traits'})
			var td2 = $('<td />',{class:'army-header'}).html('<span class="noprint">Print</span>').append(input)
			input.change(function(){
					printToggle()
				})
			var traitsinfo = tr.append(td1).append(td2)
			$('#traitstable').append(traitsinfo)
			for (var s = 0; s < traitsquantity; s++) {
				var thistrait = traitsarr[s]
				var thistraittext = library[army].traits[thistrait]
				var tr = $('<tr />',{class:'noprint',id:'trait-'+(s+1)})
				var input = $('<input />',{type:'checkbox',name:'traitstable',value:'trait-'+(s+1),class:'noprint'})
				var td1 = $('<td />',{class:'abilityheader'}).html(thistrait).prepend(input)
				var td2 = $('<td />',{class:'abilitytext'}).html(thistraittext)
				var traitsinfo = tr.append(td1).append(td2)
				$('#traitstable').append(traitsinfo)
				input.change(function(){
					printToggle()
				})
			}
		}

	//RELICS
		if(library[army].relics){
			var wrap = $('<div />',{id:"relics_wrap", class:"wrap noprint",title:"Relics"})
			wrap.click(function(){
				$("#relicstable tr").toggle()
			})
			var table = $('<table />')
			table.attr('cellpadding',"0px")
			table.attr('cellspacing','0px')
			table.attr('width','100%')
			table.attr('class','topborder noprint')
			table.attr('id','relicstable')
			$('#page').append(table.append(wrap))
			var relicsarr = []
			for (var c in library[army].relics) {
				relicsarr.push(c)
			}
			var relicsquantity = relicsarr.length
			var tr = $('<tr />')
			var input = $('<input />',{type:'checkbox',name:'relicstable',value:'relicstable',class:'noprint'})
			var td1 = $('<td />',{class:'army-header',text:'Relics'})
			var td2 = $('<td />',{class:'army-header'}).html('<span class="noprint">Print</span>').append(input)
			input.change(function(){
				printToggle()
			})
			var relicsinfo = tr.append(td1).append(td2)
			$('#relicstable').append(relicsinfo)
			for (var s = 0; s < relicsquantity; s++) {
				var thisrelic = relicsarr[s]
				var thisrelictext = library[army].relics[thisrelic]
				var tr = $('<tr />',{class:'noprint',id:'relic-'+(s+1)})
				var input = $('<input />',{type:'checkbox',name:'relicstable',value:'relic-'+(s+1),class:'noprint'})
				var td1 = $('<td />',{class:'abilityheader'}).html(thisrelic).prepend(input)
				var td2 = $('<td />',{class:'abilitytext'}).html(thisrelictext)
				//if found same weapon profile add it to the table
					if(library[army].weapons[thisrelic]){
						var wtable = $('<table />')
						wtable.attr('cellpadding',"2px")
						wtable.attr('cellspacing','0px')
						wtable.attr('width','100%')
						wtable.attr('class','relicprofile')
						var wtr = $('<tr />',{class:'relicprofileheader'})
						var wtd1 = $('<td />').html('Range')
						var wtd2 = $('<td />').html('Type')
						var wtd3 = $('<td />').html('Str')
						var wtd4 = $('<td />').html('AP')
						var wtd5 = $('<td />').html('Dmg')
						var wtd6 = $('<td />').html('Ability')
						wtable.append(wtr.append(wtd1).append(wtd2).append(wtd3).append(wtd4).append(wtd5).append(wtd6))
						var wtr = $('<tr />')
						var wtd1 = $('<td />').html(library[army].weapons[thisrelic].range)
						var wtd2 = $('<td />').html(library[army].weapons[thisrelic].type)
						var wtd3 = $('<td />').html(library[army].weapons[thisrelic].strength)
						var wtd4 = $('<td />').html(library[army].weapons[thisrelic].ap)
						var wtd5 = $('<td />').html(library[army].weapons[thisrelic].damage)
						var wtd6 = $('<td />').html(library[army].weapons[thisrelic].ability)
						wtable.append(wtr.append(wtd1).append(wtd2).append(wtd3).append(wtd4).append(wtd5).append(wtd6))
						td2.append(wtable)
					}
				var relicsinfo = tr.append(td1).append(td2)
				$('#relicstable').append(relicsinfo)
				input.change(function(){
					printToggle()
				})
			}
		}

	//MAGIC
			if(library[army].magic){
				var wrap = $('<div />',{id:"magic_wrap", class:"wrap noprint",title:"Magic"})
				wrap.click(function(){
					$("#magictable tr").toggle()
				})
				var table = $('<table />')
				table.attr('cellpadding',"0px")
				table.attr('cellspacing','0px')
				table.attr('width','100%')
				table.attr('class','topborder noprint')
				table.attr('id','magictable')
				$('#page').append(table.append(wrap))
				var magicarr = []
				for (var c in library[army].magic.spell) {
					magicarr.push(c)
				}
				var magicquantity = magicarr.length
				var tr = $('<tr />')
				var input = $('<input />',{type:'checkbox',name:'magictable',value:'magictable',class:'noprint'})
				var td1 = $('<td />',{class:'army-header',text:library[army].magic.magicname})
				var td2 = $('<td />',{class:'army-header'}).html('<span class="noprint">Print</span>').append(input)
				input.change(function(){
					printToggle()
				})
				var magicinfo = tr.append(td1).append(td2)
				$('#magictable').append(magicinfo)
				var tr = $('<tr />');
				var td1 = $('<td />',{class:'spell-header-name',text:'SPELL'})
				var td2 = $('<td />',{class:'spell-header',text:'cast'})
				var td3 = $('<td />',{class:'spell-header',text:'range'})
				var td4 = $('<td />',{class:'spell-header',text:'target'})
				var td5 = $('<td />',{class:'spell-header',text:'effect'})
				var magicinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5)
				$('#magictable').append(magicinfo)
				for (var s = 0; s < magicquantity; s++) {
					var name = magicarr[s]
					var cast = library[army].magic.spell[name].cast
					var range = library[army].magic.spell[name].range
					var target = library[army].magic.spell[name].target
					var effect = library[army].magic.spell[name].effect
					var tr = $('<tr />',{class:'noprint',id:'spell-'+(s+1)})
					var input = $('<input />',{type:'checkbox',name:'magictable',value:'spell-'+(s+1),class:'noprint'})
					var td1 = $('<td />',{class:'spell-name',text:name}).prepend(input)
					var td2 = $('<td />',{class:'spell-text'}).html(cast)
					var td3 = $('<td />',{class:'spell-text'}).html(range)
					var td4 = $('<td />',{class:'spell-text'}).html(target)
					var td5 = $('<td />',{class:'spell-text'}).html(effect)
					var magicinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5)
					$('#magictable').append(magicinfo)
					input.change(function(){
						printToggle()
					})
				}
			}

	//WARSCROLLS
		pointsarr = []

		for (var i =0; i < rosterarr.length; i++) {
			console.log(i)
			console.log(rosterarr[i])
			var unit = rosterarr[i]
			var thisunit = library[army].units[unit]
			console.log(thisunit)
			var name = thisunit.name
			var move = thisunit.move
			var ws = thisunit.ws
			var bs = thisunit.bs
			var strength = thisunit.strength
			var toughness = thisunit.toughness
			var wounds = thisunit.wounds
			var attacks = thisunit.attacks
			var leadership = thisunit.leadership
			var save = thisunit.save
			var invulsave = thisunit.invulsave
			var powerpoints = thisunit.powerpoints || 0
			var pointspermodel = thisunit.pointspermodel || 0
			var points = thisunit.points || 0
			var role = thisunit.role
			var rolename = name+' ('+role+')'
			var keywords = thisunit.keywords
			var factionkeywords = thisunit.factionkeywords


			if(pointsystem == 'powerpoints'){
				if(thisunit.role){rolename = name+' ('+role+')'+' ('+powerpoints+' pp )'}
				else{rolename = name}
			}
			if(pointsystem == 'points'){
				if(thisunit.role){rolename = name+' ('+role+')'+' (<span id="'+rosterarr[i]+'-totalunitpoints">'+pointspermodel+'</span> pts)'}
				else{rolename = name}
					pointsarr.push(parseInt(pointspermodel))
				if(thisunit.models){
					var minmodels = thisunit.models[0]
					var maxmodels = thisunit.models[1]
					// console.log(minmodels+'-'+maxmodels+' models in unit')
					if (minmodels && maxmodels) {
						rolename += (' models x '+'<input type="number" name="'+rosterarr[i]+'-modelsnum" id="'+rosterarr[i]+'-modelsnum" min="'+minmodels+'" max="'+maxmodels+'" value="'+minmodels+'"  class="modelsnum"/> ('+minmodels+'-'+maxmodels+')')
						//Add counter for models number
					}
				}
				else{
					rolename += (' models x '+'<input type="number" name="'+rosterarr[i]+'-modelsnum" id="'+rosterarr[i]+'-modelsnum" min="1" max="5" value="1" class="modelsnum"/>')
				}
			}
		

			$('#page').append($('<div />',{class:'warscroll',id:rosterarr[i]}))
			//CHARACTERISTICS
				$('#'+rosterarr[i]).append($('<div />',{class:'chars',id:rosterarr[i]+'-chars'}))
				if(thisunit.degradate){
					$('#'+rosterarr[i]+'-chars').append($('<div />',{class:'name'}).html(rolename).append($('<div />',{class:'level',id:rosterarr[i]+'-level'})))
					var degradatearr = thisunit.degradate
					var degradatequantity = degradatearr.length
					for (var s = 0; s < degradatequantity; s++) {
						$('#'+rosterarr[i]+'-level').append($('<div />',{class:'woundlevel',id:rosterarr[i]+'-level-'+s}))
						var level = parseInt(degradatearr[s])
						for (var l = 0; l < level; l++) {
							$('#'+rosterarr[i]+'-level-'+s).append($('<div />',{class:'wound'}))
						};
						$('#'+rosterarr[i]+'-level-'+s).append($('<div />',{class:'woundfiller'}))
					}
				}
				else{
					$('#'+rosterarr[i]+'-chars').append($('<div />',{class:'name'}).html(rolename))
				}
				$('#'+rosterarr[i]+'-modelsnum').change(function(){counterVal()})
				var table = $('<table />')
				table.attr('cellpadding',"0px")
				table.attr('cellspacing','0px')
				table.attr('width','100%')
				table.attr('class','topborder')
				table.attr('id',rosterarr[i]+'-statstable')
				$('#'+rosterarr[i]+'-chars').append(table)
				var tr = $('<tr />');
				var td1 = $('<td />',{class:'weapon-stats-header',text:'move"'})
				var td2 = $('<td />',{class:'weapon-stats-header',text:'WS'})
				var td3 = $('<td />',{class:'weapon-stats-header',text:'BS'})
				var td4 = $('<td />',{class:'weapon-stats-header smallstat',text:'S'})
				var td5 = $('<td />',{class:'weapon-stats-header smallstat',text:'T'})
				var td6 = $('<td />',{class:'weapon-stats-header',text:'W'})
				var td7 = $('<td />',{class:'weapon-stats-header',text:'A'})
				var td8 = $('<td />',{class:'weapon-stats-header smallstat',text:'Ld'})
				var td9 = $('<td />',{class:'weapon-stats-header',text:'Sv'})
				var td10 = $('<td />',{class:'weapon-stats-header',text:'InvSv'})
				var statsinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10)
				$('#'+rosterarr[i]+'-statstable').append(statsinfo)
				var tr = $('<tr />');
				var td1 = $('<td />',{class:'weapon-stats-text',text:move})
				var td2 = $('<td />',{class:'weapon-stats-text',text:ws})
				var td3 = $('<td />',{class:'weapon-stats-text',text:bs})
				var td4 = $('<td />',{class:'weapon-stats-text smallstat',text:strength})
				var td5 = $('<td />',{class:'weapon-stats-text smallstat',text:toughness})
				var td6 = $('<td />',{class:'weapon-stats-text',text:wounds})
				var td7 = $('<td />',{class:'weapon-stats-text',text:attacks})
				var td8 = $('<td />',{class:'weapon-stats-text smallstat',text:leadership})
				var td9 = $('<td />',{class:'weapon-stats-text',text:save})
				var td10 = $('<td />',{class:'weapon-stats-text',text:invulsave})
				var statsinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10)
				$('#'+rosterarr[i]+'-statstable').append(statsinfo)

			//WEAPON
				if(thisunit.weapon){
					$('#'+rosterarr[i]).append($('<div />',{class:'weapon',id:rosterarr[i]+'-weapon'}))
					var table = $('<table />')
					table.attr('cellpadding',"0px")
					table.attr('cellspacing','0px')
					table.attr('width','100%')
					table.attr('class','topborder')
					table.attr('id',rosterarr[i]+'-weapontable')
					$('#'+rosterarr[i]+'-weapon').append(table)
					var tr = $('<tr />');
					var td1 = $('<td />',{class:'weapon-type',text:'weapon'})
					var td2 = $('<td />',{class:'weapon-stats-header smallstat',text:'rng"'})
					var td3 = $('<td />',{class:'weapon-stats-header',text:'type'})
					var td4 = $('<td />',{class:'weapon-stats-header smallstat',text:'S'})
					var td5 = $('<td />',{class:'weapon-stats-header smallstat',text:'AP'})
					var td6 = $('<td />',{class:'weapon-stats-header smallstat',text:'Dmg'})
					var td7 = $('<td />',{class:'weapon-stats-header weapon-stats-ability',text:'Ability'})
					if(pointsystem == 'powerpoints'){
						var weaponinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7)
					}
					if(pointsystem == 'points'){
						var td8 = $('<td />',{class:'weapon-stats-header xsmallstat',text:'Pts'})
						var weaponinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8)
					}
					$('#'+rosterarr[i]+'-weapontable').append(weaponinfo)
					var weaponarr = thisunit.weapon
					var weaponquantity = weaponarr.length
					var wargearpoints = 0
					for (var s = 0; s < weaponquantity; s++) {
						var name = weaponarr[s]
						if(library[army].weapons[name]){
							var tr = $('<tr />',{class:'noprint'})
							var td1 = $('<td />',{class:'weapon-name',text:name})
							if(library[army].weapons[name].range){
								var weaponrange = library[army].weapons[name].range
								var td2 = $('<td />',{class:'weapon-stats-text smallstat',text:weaponrange})
							}
							else{
								var weaponrange = '???'
								var td2 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weaponrange})
							}
							if(library[army].weapons[name].type){
								var weapontype = library[army].weapons[name].type
								var td3 = $('<td />',{class:'weapon-stats-text',text:weapontype})
							}
							else{
								var weapontype = '???'
								var td3 = $('<td />',{class:'weapon-stats-text alert',text:weapontype})
							}
							if(library[army].weapons[name].strength){
								var weaponstrength = library[army].weapons[name].strength
								var td4 = $('<td />',{class:'weapon-stats-text smallstat',text:weaponstrength})
							}
							else{
								var weaponstrength = '???'
								var td4 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weaponstrength})
							}
							if(library[army].weapons[name].ap){
								var weaponap = library[army].weapons[name].ap
								var td5 = $('<td />',{class:'weapon-stats-text smallstat',text:weaponap})
							}
							else{
								var weaponap = '???'
								var td5 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weaponap})
							}
							if(library[army].weapons[name].damage){
								var weapondamage = library[army].weapons[name].damage
								var td6 = $('<td />',{class:'weapon-stats-text smallstat',text:weapondamage})
							}
							else{
								var weapondamage = '???'
								var td6 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weapondamage})
							}
							if(library[army].weapons[name].ability){
								var weaponability = library[army].weapons[name].ability
								var td7 = $('<td />',{class:'weapon-stats-text weapon-stats-ability'}).html(weaponability)
							}
							else{
								var weaponability = '???'
								var td7 = $('<td />',{class:'weapon-stats-text weapon-stats-ability alert'}).html(weaponability)
							}
							if(library[army].weapons[name].points){
								var weaponpoints = library[army].weapons[name].points
								wargearpoints += parseInt(weaponpoints)
								var td8 = $('<td />',{class:'weapon-stats-text xsmallstat',text:weaponpoints})
								//Add counter for each weapon option
								var counter = $('<input />',{type:'number',name:name,min:'0',max:'5',value:'0'})
								if(maxmodels){counter.attr('max',maxmodels)}
								counter.change(function(){counterVal()})
								var td9 = $('<td />',{class:'weapon-stats-text xsmallstat noprint'}).html(counter)
							}
							else{
								var weaponpoints = '???'
								var counter = '???'
								var td8 = $('<td />',{class:'weapon-stats-text xsmallstat alert',text:weaponpoints})
								var td9 = $('<td />',{class:'weapon-stats-text xsmallstat',text:counter})
							}
						}
						else{
							console.log(name+' : NO DATA FOUND')
							var weaponrange = '???'
							var weapontype = '???'
							var weaponstrength = '???'
							var weaponap = '???'
							var weapondamage = '???'
							weaponability = '???'
							var weaponpoints = '???'
							var tr = $('<tr />',{class:'noprint'})
							var td1 = $('<td />',{class:'weapon-name alert',text:name})
							var td2 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weaponrange})
							var td3 = $('<td />',{class:'weapon-stats-text alert',text:weapontype})
							var td4 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weaponstrength})
							var td5 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weaponap})
							var td6 = $('<td />',{class:'weapon-stats-text smallstat alert',text:weapondamage})
							var td7 = $('<td />',{class:'weapon-stats-text weapon-stats-ability alert'}).html(weaponability)
							var td8 = $('<td />',{class:'weapon-stats-text xsmallstat alert',text:weaponpoints})
							var td9 = $('<td />',{class:'weapon-stats-text xsmallstat alert',text:'???'})
						}
						if(pointsystem == 'powerpoints'){
							var weaponinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7)
						}
						if(pointsystem == 'points'){
							var weaponinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9)
						}
						$('#'+rosterarr[i]+'-weapontable').append(weaponinfo)
					}

					// var totalunitpoints = parseInt(pointspermodel)+parseInt(wargearpoints)
					if(minmodels){
						// totalunitpoints = parseInt(pointspermodel)*parseInt(minmodels)+parseInt(wargearpoints)
						var totalunitpoints = parseInt(pointspermodel)*parseInt(minmodels)
						console.log(parseInt(pointspermodel))
						console.log(parseInt(minmodels))
						console.log(parseInt(parseInt(pointspermodel)*parseInt(minmodels)))
						$('#'+rosterarr[i]+'-totalunitpoints').html(totalunitpoints)
					}
					// console.log(pointspermodel)
					// console.log(wargearpoints)
					// console.log(totalunitpoints)
					// $('#'+rosterarr[i]+'-totalunitpoints').html(totalunitpoints)
				}

			//ABILITIES
				if(thisunit.abilities){
					$('#'+rosterarr[i]).append($('<div />',{class:'abilities',id:rosterarr[i]+'-abilities'}))
					$('#'+rosterarr[i]+'-abilities').append($('<div />',{class:'header',text:'ABILITIES'}))
					var abilarr = []
					for (var c in thisunit.abilities) {
						abilarr.push(c)
					}
					var abilquantity = abilarr.length
					var table = $('<table />')
					table.attr('cellpadding',"0px")
					table.attr('cellspacing','0px')
					table.attr('width','100%')
					table.attr('id',rosterarr[i]+'-abiltable')
					for (var s = 0; s < abilquantity; s++) {
						var thisability = abilarr[s]
						var thisabilitytext = thisunit.abilities[thisability]
						if(library[army].abilities && library[army].abilities[thisability]){
							// console.log('found '+thisability)
							thisabilitytext = library[army].abilities[thisability]
						}
						var tr = $('<tr />');
						var td1 = $('<td />',{class:'abilityheader'}).html(thisability)
						var td2 = $('<td />',{class:'abilitytext'}).html(thisabilitytext)
						$('#'+rosterarr[i]+'-abilities').append(table.append(tr.append(td1).append(td2)))
					}
				}

			//KEYWORDS
				$('#'+rosterarr[i]).append($('<div />',{class:'abilities',id:rosterarr[i]+'-keywords'}))
				var table = $('<table />')
				table.attr('cellpadding',"0px")
				table.attr('cellspacing','0px')
				table.attr('width','100%')
				table.attr('class','topborder')
				table.attr('id',rosterarr[i]+'-keywordstable')
				var tr = $('<tr />');
				var td1 = $('<td />',{class:'abilityheader table-header',text:'FACTION KEYWORDS'})
				var td2 = $('<td />',{class:'abilitytext'}).html(factionkeywords)
				$('#'+rosterarr[i]+'-keywords').append(table.append(tr.append(td1).append(td2)))
				var tr = $('<tr />');
				var td1 = $('<td />',{class:'abilityheader table-header',text:'KEYWORDS'})
				var td2 = $('<td />',{class:'abilitytext'}).html(keywords)
				$('#'+rosterarr[i]+'-keywords').append(table.append(tr.append(td1).append(td2)))
		}	
		console.log('---- pointsarr')
		console.log(pointsarr)
	}
	$(".wrap").click(function(){
		if($(this).hasClass("wrap_closed")){
			$(this).removeClass("wrap_closed")
		}
		else{
			$(this).addClass("wrap_closed")
		}
	})
}
//--------------------------------------------------------------------

armyList(library)
detachmentsList ()
getPoints()