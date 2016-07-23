function getidclub(id){
	
	localStorage.setItem("guideitem",localStorage.getItem("club"+id));
	localStorage.setItem("cpt","non");
	//alert(localStorage.getItem("final"));
	window.location.assign("./affichedetails.html");
}

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
// this works i get all the data
   //alert(position);
   //alert(position.coords.latitude);
   //alert(position.coords.longitude);
   localStorage.setItem("myposition",position);
   localStorage.setItem("mypositionlat",position.coords.latitude);
   localStorage.setItem("mypositionlon",position.coords.longitude);
}



window.addEventListener('load', function(){
	var wow = new WOW();
	loadimgdata2();

 	var guidetype = localStorage.getItem("guidesearch");
    //alert(guidetype);
 	getBestGPSLocation();
 	if(localStorage.getItem("myposition")==null)
 		{
 		//alert("default values");
 		localStorage.setItem("mypositionlat",48.853);
 	   localStorage.setItem("mypositionlon",2.35);
 		
 		}
 	
 	var service="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+localStorage.getItem("mypositionlat")+","+localStorage.getItem("mypositionlon")+"&rankby=distance&types=night_club&key=AIzaSyBF0ZDR7QPOhG0GD2vuQOdmt9akEk7lhMM"
 	var output = $.ajax({
	    url: service, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
	    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	    data: {}, // Additional parameters here
	    dataType: 'json',
	    success: function(data) {
	    	
	    	
	    	
	    	var i=0;
	    	
	    	$.each(data.results, function(key, value) {
	    		
				localStorage.setItem("club"+i, JSON.stringify(value));
				/*if(typeof value.photos["0"].photo_reference != 'undefined'){
				    //object exists, do stuff
				
	    		var x='https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&photoreference='+value.photos["0"].photo_reference+'&sensor=false&key=AIzaSyBF0ZDR7QPOhG0GD2vuQOdmt9akEk7lhMM';
	    		if((value.photos["0"].photo_reference)==null){
	    			x="../ImageParis/ic_launcherico.png";
	    		}
				*/
				//alert(value.photos);
				if(value.photos!=null){
					
					var club ='<li class="ui-li-has-thumb" id="'+i+'"  onclick="getidclub(this.id); return false;">'+
    		        '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
    				'<img width="50" height="50" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&photoreference='+value.photos["0"].photo_reference+'&sensor=false&key=AIzaSyBF0ZDR7QPOhG0GD2vuQOdmt9akEk7lhMM"  class="ui-thumbnail ui-thumbnail-circular" />' +
    				'<h2>'+value.name+'</h2>'+
    				'<p>'+value.vicinity+'</p>'+
    				'</a>'+
    		'</li>';
    		
    		i++;
    		$("#listclub").append(club);			
    		}
				else{
					var club ='<li class="ui-li-has-thumb" id="'+i+'"  onclick="getidclub(this.id); return false;">'+
    		        '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
    				'<img width="50" height="50" src="../ImageParis/ic_launcherico.png"  class="ui-thumbnail ui-thumbnail-circular" />' +
    				'<h2>'+value.name+'</h2>'+
    				'<p>'+value.vicinity+'</p>'+
    				'</a>'+
    		'</li>';
    		
    		i++;
    		$("#listclub").append(club);	
				}
				
	    		
	    		
			
	    		 
	    	  });
				
				
			

			
	    	
	    },
	    error: function(err) { alert(JSON.stringify(err)) }
	    
	});
	
	 wow.sync();
 		  
},false);