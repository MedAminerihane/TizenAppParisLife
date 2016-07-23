function getBestGPSLocation(){  
    //GPS
    navigator.geolocation.getCurrentPosition(success, error, {maximumAge:60000, timeout:5000});
    //Wifi

    //Mobile Network
}   
function error(error) {
// just some error codes they work either
switch(error.code) {
    case error.PERMISSION_DENIED:
        console.log("permission denied");
        break;
    case error.POSITION_UNAVAILABLE:
        console.log("your position is unavailable");
        break;
    case error.TIMEOUT:
        console.log("a timeout occured");
        break;
    case error.UNKNOWN_ERROR:
        console.log("an unknow error occured");
        break;
    }
}

function success(position) {

   localStorage.setItem("myposition",position);
   localStorage.setItem("mypositionlat",position.coords.latitude);
   localStorage.setItem("mypositionlon",position.coords.longitude);
}

function calltheguide(id)
{
	
	 telnumber = id;
	 function errCb(error)
	 {
	     //alert("error:  pfff" + error.message);
	 }

	 function successCb()
	 {
	     // alert("Success telephone call");
	 }
	    try
	    {
	        var appControl = new tizen.ApplicationControl(
	                "http://tizen.org/appcontrol/operation/call",
	                "tel:"+ telnumber);
	        tizen.application.launchAppControl(appControl, null, successCb, errCb,
	                null);
	    }
	    catch (e)
	    {
	        alert("tizen.ApplicationControl not defined - " + e.message);
	    }

	}



window.addEventListener('load', function(){
	var wow = new WOW();
	
	loadimgdata2();
 	var guidedesc = JSON.parse(localStorage.getItem("guideitem"));
	var guidetype=localStorage.getItem("guidesearch");

	var output = $.ajax({
	    url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+guidedesc.place_id+'&key=AIzaSyBF0ZDR7QPOhG0GD2vuQOdmt9akEk7lhMM',
	    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	    data: {}, // Additional parameters here
	    dataType: 'json',
	    success: function(data) {
	    	
	    	var name=data.result.name;
	    	var adresse=data.result.formatted_address;
	    	var phone=data.result.international_phone_number;
	    	var latitude=data.result.geometry.location.lat;
	    	var longitude=data.result.geometry.location.lng;
	    	if(data.result.weekday_text!=null){
	    		var calouverture=data.weekday_text;
	    	}
	    	else{
	    		var calouverture="";
	    	}
	    	if(data.result.photos!=null){
	    		var img='https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&photoreference='+data.result.photos["0"].photo_reference+'&sensor=false&key=AIzaSyBF0ZDR7QPOhG0GD2vuQOdmt9akEk7lhMM';
	    	}
	    	else
	    		{
	    		var img="../ImageParis/ic_launcherico.png";
	    		
	    		}
	    	
	    	
	    	
	    	/*var cardaffiche='<div class="nd2-card card-media-right card-media-small">'+

	    	'<div class="card-media">'+
	    		'<img src="'+img+'">'+
	    	'</div>'+

	    	'<div class="card-title has-supporting-text">'+
	    		'<h3 class="card-primary-title">'+name+'</h3>'+
	    		'<h5 class="card-subtitle">'+adresse+'</h5>'+
	    		'<h5 class="card-subtitle">'+phone+'</h5>'+
	    	'</div>'+


	    	'<div class="card-supporting-text has-action has-title">'+calouverture+'</div>'+

	    	'<div class="card-action">'+
	    		'<div class="row between-xs">'+
	    			'<div class="col-xs-12">'+
	    				'<div class="box">'+
	    					'<a href="" class="ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button">Action 1</a>'+
	    					'<a href="" class="ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button">Action 2</a>'+
	    				'</div>'+
	    			'</div>'+
	    		'</div>'+
	    	'</div>'+

	    '</div>'; */
	     	
	    	var cardaffiche='<div class="nd2-card">'+
	        '<div class="card-title has-supporting-text">'+
			'<h3 class="card-primary-title">'+name+'</h3>'+
			'<h5 class="card-subtitle">'+adresse+' </h5>'+
			'<h5 class="card-subtitle">'+phone+' </h5>'+
		     '</div>'+

		'<div class="card-media">'+
			'<img src="'+img+'">'+
		'</div>'+

		'<div class="card-supporting-text has-action">'+calouverture+'</div>'+
		'<div id="xx"></div>'+
					/*'<div class="card-action">'+
						'<div class="row between-xs">'+
										'<div class="col-xs-4 align-left">'+
											'<div class="box">'+
												'<a href="" class="ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-favorite"></i>Ajouter aux favoris</a>'+
											'</div>'+
										'</div>'+
						'</div>'+
					'</div>'+*/
	'</div>';
	    	
	    	
	    	var calladd='<a href="" id="'+phone+'" data-rel="popup" data-position-to="window" data-role="button" data-inline="true" data-transition="pop" class="ui-btn ui-btn-inline ui-btn-fab ui-btn-raised clr-primary waves-effect waves-button waves-effect waves-button" onclick="calltheguide(this.id)"><i class="zmdi zmdi-phone-in-talk zmd-2x"></i></a>'

	    	document.getElementById("detailsshow").innerHTML+=cardaffiche;
	    	document.getElementById("callguide").innerHTML+=calladd;

	    	
	    	getBestGPSLocation();
	     	if(localStorage.getItem("myposition")==null)
	     		{
	     		
	     		localStorage.setItem("mypositionlat",48.853);
	     	   localStorage.setItem("mypositionlon",2.35);
	     		
	     		}
	    	map = new google.maps.Map(document.getElementById("xx"), {
 		        zoom: 13,
 		        center: new google.maps.LatLng(latitude,longitude),
 		        mapTypeId: google.maps.MapTypeId.ROADMAP
 		      }); 
	    	var marker = new google.maps.Marker({
	    	    position: new google.maps.LatLng(latitude,longitude),
	    	    map: map,
	    	    title: name
	    	  });
	    	
	    	var marker = new google.maps.Marker({
	    	    position: new google.maps.LatLng(localStorage.getItem("mypositionlat"),localStorage.getItem("mypositionlon")),
	    	    map: map,
	    	    icon: {
	    	        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
	    	        strokeColor: "blue",
	    	        scale: 3
	    	    },
	    	    title: name
	    	  });
	    	
	    	 wow.sync();
	    },
	    error: function(err) { alert(JSON.stringify(err)) }
	    
	});
	
	
 	
 	
 
 		  
 		
 		  
},false);
