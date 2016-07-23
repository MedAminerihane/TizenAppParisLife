
function strip(html)
{
var tmp = document.createElement("DIV");
tmp.innerHTML = html;
return tmp.textContent || tmp.innerText;
}


window.addEventListener('load', function(){
	
	
 	var foo = localStorage.getItem("final");

 	var ch=JSON.parse(localStorage.getItem("final"));
 	
 	
    
    var chtest=strip(ch.small_description);
 	
 var img=ch.files["0"].file;
 if(img.substring(0,4)!="http"){
	 img="https://filer.paris.fr/"+ch.files[0].file;
 }
 	
 	var chadd2='<div class="nd2-card">'+
        '<div class="card-title has-supporting-text">'+
		'<h3 class="card-primary-title">'+ch.nom+'</h3>'+
		'<h5 class="card-subtitle">'+ch.city+' , France</h5>'+
	     '</div>'+

	'<div class="card-media">'+
		'<img src="'+img+'">'+
	'</div>'+

	'<div class="card-supporting-text has-action">'+chtest+'</div>'+
	'<div id="xx"></div>'+
                '<a href="" class="ui-btn ui-btn-icon-left waves-effect waves-button waves-effect waves-button" onclick="savefav()"><i class="zmdi zmdi-favorite zmdi-hc-5x"></i>Ajoutez aux favoris</a>'+
                '<a href="" class="ui-btn ui-btn-icon-left waves-effect waves-button waves-effect waves-button" onclick="Participer()"><i class="zmdi zmdi-accounts-add"></i>Participer</a>'+

'</div>';
              
 	
 	
 	document.getElementById("testh").innerHTML+=chadd2;
 	var lat =  parseFloat(ch.lat);
 	
 	var lon =  parseFloat(ch.lon);
 	if((lat===0)||(lat===null)){
 		lat=48.853;
 	}
 	
 	if((lon===0)||(lon===null)){
 		lon=2.35;
 	}
 	
 	
 	
 	map = new google.maps.Map(document.getElementById("xx"), {
 		        zoom: 13,
 		        center: new google.maps.LatLng(lat,lon),
 		        mapTypeId: google.maps.MapTypeId.ROADMAP
 		      }); 
 		  
 	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat,lon),
	    map: map,
	    title: name
	  });
 	
 	loadimgdata();
 	getamisparticipants();

 		  
},false);


function savefav(){
	
	var fav = localStorage.getItem("final");
	var fav2=JSON.parse(fav);
 	
	
    var currentsize=Number(localStorage.getItem("lengthfavoris"));
    if (currentsize === undefined || currentsize === null || currentsize === 0)
    {
      s=0;
      localStorage.setItem("favorite"+s,fav);
	    localStorage.setItem("lengthfavoris",s+1);
    }
    else{
    	s=currentsize;
    	for (var int = 0; int < currentsize; int++) {
    		
    		
    		var val = localStorage.getItem("favorite"+int);

    	 	var ch=JSON.parse(val);
    	 	
    	 	if(ch.idactivites==fav2.idactivites){
    	    	
    	    	alert("Evénement existe dejà ");
    	    }else{
    	    	
    	    	 localStorage.setItem("favorite"+s,fav);
    	    	    localStorage.setItem("lengthfavoris",s+1)
    	    }
    
    }
    
	
	}
    
    
   
}

function Participer(){
	var vvv=JSON.parse(localStorage.getItem("final"));
	Parse.initialize("9LzkioWCbDvtriqUB1QDDhJ3s4zoG9vvOekxN4AM", "Q3fJN385YsCsRxkkltc7aTN1AJdJcWiNBfPVGGs4");

	var part = Parse.Object.extend("Participants");
	var P = new part();

	P.set("userID",localStorage.getItem("iduser"));
	P.set("eventid",vvv.idactivites);
	P.set("Nom",localStorage.getItem("user"));
	P.set("img",localStorage.getItem("profile"));


	var partfind = Parse.Object.extend("Participants");
	var query = new Parse.Query(partfind);
	query.equalTo("userID",P.get('userID'));
	query.equalTo("eventid",P.get('eventid'));
	query.find({
	  success: function(results) {
	   var x=results.length;
	   if(x<=0){
		   P.save(null, {
			   success: function(P) {
			     
			   },
			   error: function(P, error) {
			     
			   }
			 });
		   
	   }
	   else{
		   
		   alert("Vous êtes déjà participé");
	   }
	  },
	  error: function(error) {
	   
	  }
	});


	
}


function getamisparticipants(){
	//alert(sessionStorage.getItem("fbfriendsdata"));
    Parse.initialize("9LzkioWCbDvtriqUB1QDDhJ3s4zoG9vvOekxN4AM", "Q3fJN385YsCsRxkkltc7aTN1AJdJcWiNBfPVGGs4");
	var vvv=JSON.parse(localStorage.getItem("final"));
     var idevent=vvv.idactivites;
     var ch=JSON.parse(sessionStorage.getItem("fbfriendsdata"));
     
    //var sn=0;
            
 	$.each(ch.data, function(key, value) {

            	var partfind = Parse.Object.extend("Participants");
            	var query = new Parse.Query(partfind);
            	//alert(value.id);
            	//alert(idevent);
            	
            	query.equalTo("userID",value.id);
            	query.equalTo("eventid",idevent);
            	query.find({
            	  success: function(results) {
            		//var friendlist="";
            		 // alert(results.length);
            		  for (var i = 0; i < results.length; i++) {
               		   var object = results[i];
               		   var friendlist='<li class="ui-li-has-thumb" id="'+object.get('userID')+'">'+
   	    		        '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
   	    				'<img src="'+ object.get('img') +'"  class="ui-thumbnail ui-thumbnail-circular" />' +
   	    				'<h2>'+object.get('Nom')+'</h2>'+
   	    				'</a>';
   	    		        '</li>';
   	    		        
	    		        document.getElementById("listfriend").innerHTML+=friendlist;

               		   }
            		  
            		  //alert(object.tostring()+"hiiiiiiiiii"+sn);
            		  //sn++;
            		  /*var friendlist;
            		  
           		      friendlist+='<li class="ui-li-has-thumb" id="'+object.get("userID")+'">'+
	    		        '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
	    				'<img src="'+ object.get('img') +'"  class="ui-thumbnail ui-thumbnail-circular" />' +
	    				'<h2>'+object.get('Nom')+'</h2>'+
	    				'</a>';
	    		        '</li>';
	    		        document.getElementById("listfriend").innerHTML+=localStorage.getItem("amisparti");
            	  */}
            	,
          	  error: function(error) {
          	   
          	  }
            	  });
            });
}



