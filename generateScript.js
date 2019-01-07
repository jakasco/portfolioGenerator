var codes = ["Java", "Python", "Unity", "Javascript", "C"];
var colors = ["Beige", "Green", "Brown", "Green", "Purple"];

$(document).ready(function() {

	$.createDiagram = function(json) {

  //Kielien määrä
  var jsonLength = json.length;
  //yhden projektin tietojen määrä
  var details = json[0].length;

	//päivitetään projektien määrä
		var $this = $("#countPercentage");
		$this.text(jsonLength);
		  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
		    duration: 2000,
		    easing: 'swing',
		    step: function () {
		      $this.text(Math.ceil(this.Counter));
		    }
			});	////

  //kielet
  var languages = getLanguages(json, jsonLength); //palauttaa Arrayn
//Montako projektia on yhdessä kielessä
var amount = [];
  //Projektien titlet
  var titles = getTitle(json, jsonLength);

  //kaikkien projektien tiedot
  var projectDetails = getProjectDetails(json,jsonLength);

  var p = [] //p = projetien tiedot kielen mukaan
for (var i=0; i<languages.length; i++){
var projectDetailsByLanguage = getProjectDetailbyLanguage(json, jsonLength, languages[i]);
p.push(projectDetailsByLanguage);
console.log("dadsa "+projectDetailsByLanguage);
amount.push([languages[i], p[i].length]);
}



	var diagram = $("#diagram");


	var aNav = $("#sideNav"); //Nav bar editointi
	aNav.append("<a onClick=smoothScroll('#sectionHeader')>&#8593;<a>"); //nuoi ylöspäin
	aNav.append("<p><b>Select Category</b></p>");

	var projects = [];

	var widthBetween = 0; //pylväiden väli
  //tehdään kielien määrän mukaan
	for(var i=0; i<languages.length; i++){


		aNav.append("<a onClick=smoothScroll('#section"+i+"')>"+languages[i]+"</a>");

		projects.push(amount[i][1]);

    //          määärä/kieli, i, kielen nimi
		generateGrid(amount[i][1], i, languages[i], p);

		widthBetween +=  15;
		diagram.append("<div id='child"+i+"' onClick=linkTo("+i+") style='background-color: "+colors[i]+"; height: 5px; width: 10%; font-size: 20px; text-align: center; overflow:hidden; opacity: 0; position: absolute; bottom: 0; cursor: pointer; left: "+widthBetween+"%'>"+languages[i]+"</div>");
	}

	aNav.append("<a onClick=smoothScroll('#sectionFooter')>&#8595;<a>");  //Nav bar pohjaan vielä nuoli alaspäon

  //animoi pylväät projektien määrän mukaan
	for( var i=0; i<languages.length; i++){

		var height = projects[i]*30
		var c = $("#child"+i);
		c.animate({ 'opacity': '1' , height: (height)}, 3000);
	}

};

//Generoi diagrammin alle sektorit projekteista
//              määärä/kieli, i, kielen nimi
function generateGrid(a, i, language, p){

	$("#gridParent").append("<section id='section"+i+"'></section>");
  if(p[i].length>1){
  $('#section'+i).append("<div id=sectionChild>"+p[i][0][2]+"</div>");
}else{
    $('#section'+i).append("<div id=sectionChild>"+p[i][0][2]+"</div>"); //jos vain 1 projekti
}
	$('#section'+i).find("#sectionChild").append("<div id=grid></div>");
	for(var j=0; j<a; j++){
console.log("Type: "+p[i][j][4]);
	//yhden projektin css
	var gridItemStyle =  'background-image: linear-gradient(white, green);color: black; border: 1px solid rgba(0, 70, 0, 0.8);padding: 20px;font-size: 30px;text-align: center; opacity: 0.6; transition: 1s;';

	//lisää jokainen projekti  alempi koodi laittaa hoverin, ota hide kommentti alempaa pois
	$('#section'+i).find("#grid").append("<div id='project"+codes[i]+j+"' onmouseover=showProject("+i+","+j+")"
	+" onmouseleave=hideProject("+i+","+j+") style='"+gridItemStyle+"'>"+p[i][j][0]+"</div>");

	//projektin oma paneeli
	var style = "';'"
	$("#project"+codes[i]+j).append("<div id='infoPanel"+codes[i]+j+"' style='"+style+"'></div>");

	addContentToPanel(p[i][j][0],"#infoPanel"+codes[i]+j, p[i][j][1], p[i][j][3],codes[i]+j, p[i][j][4]);


	$("#project"+codes[i]+j).hover(function (){
	//	console.log("#project"+codes[i]+j);
	});//hover function
	}
}

//ota projektin title
function getTitle(json, n){
      var titles = [];
      for(var i=0; i<n; i++){
        titles.push(json[i][0]);
      }
      return titles;
}

//testi
$('#joku').click(function() {
window.location = "#section4";
	});

}); //document ready loppuu

//Hyppää sectioniin
function linkTo(n){
window.location = "#section"+n;
}

//hoveraa projektin  (kieli, luku)
function showProject(i, j){
	//	$("#infoPanel"+codes[i]+j).show();
	$("#infoPanel"+codes[i]+j).css("opacity", "1");
}

//piilota projektin ikkuna
function hideProject(i,j){
	//$("#infoPanel"+codes[i]+j).hide();
	$("#infoPanel"+codes[i]+j).css("opacity", "0.6");
}

//laita paneeliin tarvittavat asiat
function addContentToPanel(name, panel, description, link, id, type){

	var buttonStyle =  "height: 6em; width: 10em;background-color: green;color: white; border:  1em solid rgba(0, 0, 0, 0.8);";

	$(panel).append("<button id='reviewButton"+id+"' style='"+buttonStyle+"' onmouseover=maxScale('"+id+"') onmouseleave=minScale('"+id+"') data-toggle='modal' data-target='#modal"+id+"'>See project</button>");

addModal(name,description, link, id, type);
}

//suurenna ja piennennä nappi
function maxScale(id){

$("#reviewButton"+id).animate({width: "10.5em",height: "6.5em"}, "fast");

}

function minScale(id){

	$("#reviewButton"+id).animate({width: "10em",height: "6em"}, "fast");

}

//modalin luonti
function addModal(name, description, link, id, type){

	var modalStyle = " <div class='modal' tabindex='-1' role='dialog' id='modal"+id+"'> "
	                  +"<div class='modal-dialog' role='document'> "
	                  +"  <div class='modal-content'> "
	                    +"  <div class='odal-header'> "
	                    +"    <h5 class='modal-title'>"+name+"</h5> "

	                    +"   <button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
	                     +"     <span aria-hidden='true'>&times;</span> "
	                    +"    </button> "
	                   +"   </div> "
	                 +"     <div class='modal-body' id='modalBody"+id+"'> "
								 +"<div>"+description+"</div>"
	                +"      </div> "
	               +"     </div>"
	              +"    </div>"
	             +"   </div>";

		$("#modalDiv").append(modalStyle);

		if(type=="Video"){
				$("#modalBody"+id).append("<div id='video'> <video id='video"+id+"' width='320' height='240'  controls> "  //anna videolle ide
		+"<source src='"+link+"' type='video/mp4'> "
	+" </video></div>"  );
}
if(type=="Audio"){

		if(name=='Puheäänen nauhoitus ja käsittely'){ //koska toinen audio projekti ei sisällä kuin pdf
	$("#modalBody"+id).append("<div><br>  <b>Alkuperäinen</b> <br>"
+"<audio controls id='audio0"+id+"'>"
+" <source src='"+link[0]+"' type='audio/mpeg'>"
+"</audio><br>"
+"<b>Muokattu</b> <br>"
+"<audio controls id='audio1"+id+"'>"
+" <source src='"+link[1]+"' type='audio/mpeg'>"
+"</audio><br>"
+"</div>");
}else if(name=="Mikrofonitesti"){
	$("#modalBody"+id).append("<div>"
	+" <object data='audio/mikrofonitesti.pdf' type='application/pdf' width='100%' height='800px'>"
+"	<p>"
+"		 Selaimesi ei tue pdf formaattia, <a href='audio/mikrofonitesti.pdf'>lataa pdf täältä</a>"
+"	 </p>"
	+" </object> "
	+"</div>");
}

}
if(type=="Illustrator"){$("#modalBody"+id).append("<div> "
+" <img src='"+link+"' width='450' ></img>"
+"</div>");
}

$('#modal'+id).on('hidden.bs.modal', function (e) {  //Piilota video

		if(type=="Video"){
   $('#video'+id).get(0).pause();  //video pysäytys
 }
if(name=='Puheäänen nauhoitus ja käsittely'){							//audio pysäytys
		for(var i=0; i<2; i++){
	 $("#audio"+i+id).get(0).pause();
 	}
 }
});

}


//montako projektia yhdessä kielessä
function getAmountOfProjects(data, n, languages){

    var projects = [];

    for(var i=0; i<n; i++){
        projects.push([languages[i],0]); //kieli ja projektien määrä
        if(data[i][2]==languages[i]){
          var num = projects[i][1]
          num += 1;  //lisätään kielelle aina projekti
          projects[i][1] = num;
        }
    }
  return projects;
}


//Jos halutaan CVS tiedostossa yksi rivi lisää, laita tässä
function getProjectDetailbyLanguage(data, n, language){
    var projects = [];
    for(var i=0; i<n; i++){
        if(data[i][2]==language){
          projects.push([data[i][0],data[i][1],data[i][2],data[i][3],data[i][4]]);
        }
    }
  return projects;
}


//kaikkien projektien tiedot
function getProjectDetails(json, n){
    var projects = [];
    for(var i=0; i<n; i++){
        projects.push([json[i][0],json[i][1],json[i][2],json[i][3]]);
    }
    return projects;
}


//koodauskielien määrä
function getLanguages(data, n){
  var languages = [];
    for(var i=0; i<n; i++){
            languages.push(data[i][2]);
    }
     //poistetaan samat kielet arraysta jotka ovat useampaan kertaan
    var languages2 = [...new Set(languages)]
  return languages2;
}

function smoothScroll(destination){
      $('html, body').animate({
        scrollTop: $(destination).offset().top
      }, 800, function(){
        window.location.hash = destination;
      });
}
