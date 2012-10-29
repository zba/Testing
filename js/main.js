/*  
	Jason Woolard 
	MiU 1211
	Project 2
	- main.js
*/
	//jQuery calls
    $("#additem").on("pagecreate", function(){
    makeRunRecord();
	});
    $("#additem").on("pageinit", function(){
    save.click(validate);
	});
    $('#showAll').on("pagecreate", function() {
    if (localStorage.length === 0){
        autoFillData();
    }
    	getData("all");
	});
	$("#clearAll").bind("click", function(){
    	clearData();
	});
	$('#distance').on("pagecreate", function() {
    if (localStorage.length === 0){
        autoFillData();
    }
    getData("Distance");
	});
	$('#timed').on("pagecreate", function() {
	    if (localStorage.length === 0){
	        autoFillData();
	    }
	    getData("Timed");
	});
	$('#group').on("pagecreate", function() {
	    if (localStorage.length === 0){
	        autoFillData();
	    }
	    getData("Group");
	});
	$('#marathon').on("pagecreate", function() {
	    if (localStorage.length === 0){
	        autoFillData();
	    }
	    getData("Marathon");
	});
	$('#endurance').on("pagecreate", function() {
	    if (localStorage.length === 0){
	        autoFillData();
	    }
	    getData("Endurance");
	});
    //


	// getElementbyId Function
	function ge(x) {
		var theElement = document.getElementById(x);
		return theElement;
	};
	// Create select element with options.
	function makeRunRecord() {
		var formTag = document.getElementsByTagName('form'),
			selectList = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("class", "required select");
			makeSelect.setAttribute("id", "styles");
    		makeSelect.setAttribute("name", "styles");
    		makeSelect.setAttribute("data-mini", "true");
 			makeSelect.selectedIndex = "Choose";
    		makeSelect.setAttribute("data-placeholder", "true");
    		
   			makeSelect.setAttribute("data-native-menu", "false");
   		    var makePlace = document.createElement('option');
    		makeSelect.appendChild(makePlace);
		for (var i=0, j=runningStyles.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = runningStyles[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectList.appendChild(makeSelect);
	};

	// Finds the value of selected checkbox
	/*function getCheckboxValue() {
		if (ge('hydrated').checked) {
			hydratedValue = "Yes!";
		}else{
			hydratedValue = "No!";
		}
	};*/

	// Finds the Value of Selected Radio Button
	/*function getSelectedRadio() {
		var radios = document.forms[0].timeOfDay;
		for (var i=0, j=radios.length; i<j; i++) {
			if (radios[i].checked) {
				timeValue = radios[i].value;
			}
		}
	};*/

	// Turn on and off form by use of case during getData() 
	/*function toggleControls(x) {
		switch(x) {
			case "on":
				ge('runRecForm').style.display = "none";
				ge('showData').style.display = "none";
				//ge('clearData').style.display = "inline";
				ge('saveData').style.display = "none";
				break;
			case "off":
				ge('runRecForm').style.display = "block";
				ge('showData').style.display = "inline";
				//ge('clearData').style.display = "inline";
				ge('saveData').style.display = "inline";
				ge('items').style.display = "none";
				break;
			default:
				return false;
		}
	};*/

	// Gathers Form Data & Places it into local storage
	function saveData(data) {
		var george = ge('submit').key;
		console.log(data.key);
		if(!data.key) {
			var id = Math.floor(Math.random()*10001);
		}else{
			var id = data.key;
		}
		console.log(ge('submit').key);
		// Call Functions...
		//getCheckboxValue();
		//getSelectedRadio();
		var item 				= {};
			item.rStyle 		= ["Running Style: ", $("#styles").val()];
			item.rLocation		= ["Running Location: ", $("#rLocation").val()];
			item.runDate		= ["Running Date: ", $("#runDate").val()];
			item.hydrated		= ["Hydrated: ", $("#hydrated").val()];
			item.rComments		= ["Running Comments: ", $("#rComments").val()];
			item.howLong		= ["How long you ran: ", $("#howLong").val() + " hours"];
			item.howFar			= ["How far you ran: ", $("#howFar").val() + " miles"];
			item.timeOfDay		= ["Time of day you ran: ", $("#timeOfDay").val()];	
		localStorage.setItem(id, JSON.stringify(item));
		alert("Mileage Recorded!");
		location.reload();
	};

	// Writes the Data from Local Storage to the browser.
	function getData(id) {
		//toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in Local Storage. \n Default Data was added!");
			autoFillData();
		}
		var category = id;
		var makeUl = document.createElement('ul');
		ge(id+'Content').appendChild(makeUl);
        makeUl.setAttribute("id", id+"items");
        makeUl.setAttribute("data-role", "listview");
        makeUl.setAttribute("data-inset", "true");
        makeUl.setAttribute("data-filter", "true");
        makeUl.setAttribute("data-filter-placeholder", "Search...");
		//ge('items').style.display = "block";
		for(key in localStorage) {
			//var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//var makeLi = document.createElement('li');
			//var buttonsLi = document.createElement('li');
			//makeList.appendChild(makeLi);
		 
			var obj = JSON.parse(value);
			objdate = obj.runDate[1]!==null? obj.runDate[1]:'';
			var iddate = objdate.replace(/\-/g,"");
			var makeSubList = document.createElement('div');
            var linksP = document.createElement('p');
			getImage(obj.rStyle[1], makeSubList);

		    //If category then populate
            if(category === obj.rStyle[1] || category === "all"){
                makeSubList.setAttribute("id", iddate); //gives list item an id by stored date
                makeSubList.setAttribute("data-role", "collapsible");
                makeSubList.setAttribute("data-collapsed", "true");
                makeSubList.setAttribute("data-inset", "true");
                makeSubList.setAttribute("data-theme", "a");
                makeUl.appendChild(makeSubList);
                var makeH3 = document.createElement('h3');
                makeSubList.appendChild(makeH3);
                var optHText = obj.runDate[1];
                for (var n in obj){
                    var makeSubP = document.createElement('p');
                    makeH3.innerHTML = optHText;
                    makeSubList.appendChild(makeSubP);
                    makeSubP.setAttribute("class", "inner");
                    var optSubText = obj[n][0]+" "+obj[n][1];
                    makeSubP.innerHTML = optSubText;
                    makeSubList.appendChild(linksP);
                    linksP.setAttribute("class", "links");
                }
                makeButtonsList(key, linksP);
            }
        }
	    //Sort the list items by id
	    $(function(){
	        var elems = $('#'+id+'items').children('div').remove();
	        elems.sort(function(a,b){
	            return parseInt(a.id) > parseInt(b.id);
	        });
	        $('#'+id+'items').append(elems);
	    });
	};
	// Get the image for the right category that is displayed
	function getImage(imgName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "img/" + imgName + ".png");
		newImage.style.paddingTop = "10px";
		imageLi.appendChild(newImage);
	};
	// Auto populates the Local Storage
	function autoFillData() {
		// Retrieve JSON OBJECT from json.js & stores JSON object to Local Storage.
		for(var n in json) {
		var id = Math.floor(Math.random()*10001);
		localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	function makeButtonsList(key, linksP) {
	var editLink = document.createElement('a');
    editLink.setAttribute("id", "edit-btn");
    editLink.setAttribute("data-role", "button");
    editLink.setAttribute("data-inline", "true");
    editLink.href = "#additem";
    editLink.key = key;
    var editText = "Edit";
    editLink.addEventListener("click", editItem);
    editLink.innerHTML = editText;
    linksP.appendChild(editLink);
    
    var deleteLink = document.createElement('a');
    deleteLink.setAttribute("id", "delete-btn");
    deleteLink.setAttribute("data-role", "button");
    deleteLink.setAttribute("data-inline", "true");
    deleteLink.href = "#";
    deleteLink.key = key;
    var deleteText = "Delete";
    deleteLink.addEventListener("click", deleteItem);
    deleteLink.innerHTML = deleteText;
    linksP.appendChild(deleteLink);
	};
	/*$(document).delegate('#simplebool', 'click', function() {
	  	$('<div>').simpledialog2({
		    mode: 'button',
		    headerText: 'Warning',
		    headerClose: true,
		    buttonPrompt: 'Delete Running Record? Cannot be undone!',
		    buttons : {
		      'OK': {
		        click: function () { 
					deleteItem();
		            window.location.reload();
		            return false;
		          }
		       },
		      'Cancel': {
		        click: function () { 
		        	cancelDialog2( this);
		        },
		        icon: "delete",
		        theme: "b"
	      		}
	    	}
	  	})
	})*/
	/*$(document).delegate('#clearSData', 'click', function() {
	  	$('<div>').simpledialog2({
			mode: 'button',
		    headerText: 'Warning',
		    headerClose: true,
		    buttonPrompt: 'Clear ALL Running Records? This cannot be undone.',
		    buttons : {
		      'OK': {
		        click: function () { 
		        	localStorage.clear();
					location.reload();
		         }
		      },
		      'Cancel': {
		        click: function () { 
		        	cancelDialog2( this);
		        },
		        icon: "delete",
		        theme: "b"
		      	}
		    }
		})
	})*/
	function cancelDialog2(el){
   		var self=el; 
   		$('<div>').simpledialog2({
		    mode: 'blank',
		    headerText: 'Info',
		    headerClose: true,
		    blankContent : 
		      "<ul><li>Running records have not been touched.</li></ul>"+
		      // NOTE: the use of rel="close" causes this button to close the dialog.
		      "<a rel='close' data-role='button' href='#'>Close</a>"
 		 })
	}
	function editItem() {
		console.log("edit fires");
		// Grabs data from our item from Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// Shows the form
		//toggleControls("off");

		// Populates the Form Fields with current LocalStorage Values
		$('#styles').val(item.rStyle[1]);
	
		$('#rLocation').val(item.rLocation[1]);
		$('#runDate').val(item.runDate[1]);
		//if(item.hydrated[1] == "Yes") {
			$('#hydrated').val(item.hydrated[1]);
			//ge('hydrated').setAttribute("checked", "checked");
		//}

		$('#rComments').val(item.rComments[1]);
		$('#howLong').val(item.howLong[1]);
		$('#howFar').val(item.howFar[1]);
		$('#timeOfDay').val(item.timeOfDay[1]);
		/*var radios = document.forms[0].timeOfDay;
		for (var i=0, j=radios.length; i<j; i++) {
			if(radios[i].value == "morning" && item.timeOfDay[1] == "morning") {
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "afternoon" && item.timeOfDay[1] == "afternoon") {
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "evening" && item.timeOfDay[1] == "evening") {
				radios[i].setAttribute("checked", "checked");
			}*/

		// Remove initial event listener from input save record button
		//ge('article').removeChild(ge('items'));
		//submitData.removeEventListener("click", saveData);
		// Changes text on save button to "Save Changes"
		ge('saveData').value = "Save Changes";
	    ge('submit').key = this.key;
		//var editSubmit = ge('saveData');
		/* Save to original key value established in this function as a property of the editSubmit event
			so we can use that value when we save the data we edited.*/
		//editSubmit.addEventListener("click", validate);
		//editSubmit.key = this.key;
	};

// Delete individual key storage from localStorage //
	function deleteItem() {
		var ask = confirm("Delete this running record?");
		//Confirm with the user to delete individual item (running record)
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Running record has been deleted.");
			location.reload();
			return false;
		// If declined, do not delete and send user alert.
		}else{
			alert("Running record was not deleted.");
		}
	};

	// Clear Data Function
	function clearData() {
		if (localStorage.length === 0) {
			alert("There are no running records to delete.");
		}else{
			var clear = confirm("Are you sure you want to delete your running records? This action cannot be undone.");
		if (clear) {
			localStorage.clear();
			alert("All mileage has been cleared!");
			location.reload();
			return false;
		}else{
			alert("Your running records have not been touched.");
			}
		}
	};
	// Validate Function
	/*function validate(e) {
		// Define elements to validate
		var getStyle = ge('styles');
		var getLocation = ge('rLocation');
		var getRComments = ge('rComments');
		var getRDate = ge('date');

		// Reset error messages.
		errMsg.innerHTML = "";
		getStyle.style.border = "1px solid black";
		getLocation.style.border = "1px solid black";
		getRComments.style.border = "1px solid black";
		getRDate.style.border = "1px solid black";

		// Get error messages..
		var messageAry = [];
		// Run Style Validation
		if(getStyle.value === "- Chose Run Style -") {
			var styleError = "Please choose a running style.";
			getStyle.style.border = "1px solid red";
			messageAry.push(styleError);
		}
		// Run Location Validation
		if(getLocation.value === "") {
			var locationError = "Please enter a running location.";
			getLocation.style.border = "1px solid red";
			messageAry.push(locationError);
		}		
		if(getRDate.value === "") {
			var runDateError = "Please enter the date you ran.";
			getRDate.style.border = "1px solid red";
			messageAry.push(runDateError);
		}
		if(getRComments.value === "") {
			var rCommentError = "Please enter some running comments.";
			getRComments.style.border = "1px solid red";
			messageAry.push(rCommentError);
		}

		// If there were errors, display them on screen.
		if(messageAry.length >= 1) {
			for (var i=0, j=messageAry.length; i<j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
		// If errors found, stop the form from submitting & alert the user 
			alert("There are required fields left empty!");
			e.preventDefault();
			return false;
		}else{
			// If there are no errors, save the data.
			saveData(this.key);
			}
		};
*/
function validate(e){
    var addform = $("#runRecForm");
    
    addform.validate({
        invalidHandler: function(form, validator){
        },
        submitHandler: function(){
            var data = addform.serializeArray();
            console.log(data);
            saveData(data);
        }
    });
};

	// Variable Defaults
	var runningStyles = ["Distance", "Endurance", "Group", "Marathon", "Timed"],
	timeValue,
	confirmClear,
	hydratedValue = "Yes",
	save = $("#submit"),
	errMsg = $('#errors');
	;

	// Set Link & Submit Click Events 
	//var displayLink = ge('showData');
	//displayLink.addEventListener("click", getData);
	//var clearButton = ge('clearData');
	//clearButton.addEventListener("click", clearData);
	//var submitData = ge('saveData');
	//submitData.addEventListener("click", validate);

	// Call Functions
    //makeRunRecord();


//refresh value			

        // $('#timeselect').selectmenu('refresh');
      // console.log('Opening time select in 300ms...');
      // setTimeout("$('#timeselect').selectmenu('open');", 300)
