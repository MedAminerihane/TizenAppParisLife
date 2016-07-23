function getidevent(id){
	localStorage.setItem("final",localStorage.getItem("event"+id));
	localStorage.removeItem("event"+id);
	localStorage.setItem("cpt","non");
	//alert(localStorage.getItem("final"));
	window.location.assign("./NewFile.html");
}

function afficheguide(idguide){
	
	switch(idguide) {
    case "restaurant":
    	localStorage.setItem("guidesearch",idguide);
    	localStorage.setItem("cpt","non");
    	window.location.assign("./Guide/Restaurant.html");
        break;
    case "bar":
    	localStorage.setItem("guidesearch",idguide);
    	localStorage.setItem("cpt","non");
    	window.location.assign("./Guide/Bar.html");
        break;
    case "night_club":
    	localStorage.setItem("guidesearch",idguide);
    	localStorage.setItem("cpt","non");
    	window.location.assign("./Guide/Club.html");
    	break;
    case "museum":
    	localStorage.setItem("guidesearch",idguide);
    	localStorage.setItem("cpt","non");
    	window.location.assign("./Guide/Musees.html");
    	break;
    case "lodging":
    	localStorage.setItem("guidesearch",idguide);
    	localStorage.setItem("cpt","non");
    	window.location.assign("./Guide/Hotels.html");
    	break;
        
}
	
}

function hi2() { 
	var wow = new WOW();
	//alert(verif);
	
		localStorage.setItem("cpt","non");
		if(localStorage.getItem("backfrom")=="event"){
			
			
			$('#tb1').removeAttr( "data-tab-active" );
			$('#tb2').attr( 'data-tab-active','true');
			localStorage.removeItem("backfrom");
		}
		
		if(localStorage.getItem("backfrom")=="listguide"){
			$('#tb1').removeAttr( "data-tab-active" );
			$('#tb3').attr( 'data-tab-active','true');
			localStorage.removeItem("backfrom");
			
		}
		
	 var output = $.ajax({
	    url: 'https://api.paris.fr/api/data/1.4/QueFaire/get_activities/?token=46f0825ba104099b7df908b9838bf946e19ceb6c0681ad6a05cfd1d8194a9ece&cid=4&tag=4&created=0&start=0&end=0&offset=0&limit=10', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
	    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	    data: {}, // Additional parameters here
	    dataType: 'json',
	    success: function(data) {
	    	
	    	
	    	//
	        //Change data.source to data.something , where something is whichever part of the object you want returned.
	        //To see the whole object you can output it to your browser console using:
	        //console.log(data.status);
	       	/*document.getElementById("output1").innerHTML = data.data["0"].name; 
	       	document.getElementById("output2").innerHTML = data.data["1"].name; 
	       	document.getElementById("output3").innerHTML = data.data["2"].name; 
	       	document.getElementById("output4").innerHTML = data.data["3"].name; 
	       	document.getElementById("output5").innerHTML = data.data["4"].name; 
	    	*/
	    	var i=0;
	    	
	    	$.each(data.data, function(key, value) {
	    		
	    		//alert(value+" test 111111111")
				localStorage.setItem("event"+i, JSON.stringify(value));
	    		//alert(JSON.stringify(value) +" test 2222222")
				
	    		//alert(i)
				
				var img=value.files["0"].file;
				 if(img.substring(0,4)!="http"){
					 img="https://filer.paris.fr/"+value.files[0].file;
				 }
				 if(img.substring(img.length-3,img.length)!="jpg"){
					 img="./ImageParis/ic_launcherico.png";
				 }
	    		var weather_s ='<li class="ui-li-has-thumb" id="'+i+'"  onclick="getidevent(this.id); return false;">'+
	    		        '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
	    				'<img src="'+ img +'"  class="ui-thumbnail ui-thumbnail-circular" />' +
	    				'<h2>'+value.nom+'</h2>'+
	    				'<p>'+ value.rubriques["0"].rubrique +'</p>'+
	    				'</a>';
	    		'</li>';
	    		
	    		i++;
	    		$("#listaffiche").append(weather_s);
	    		
	    		 
	    		 
	    	  });
				
				
			

			
	    	
	    },
	    error: function(err) { alert(JSON.stringify(err)) }
	    
	});
	 
	 $.get('http://www.francetvinfo.fr/france.rss', function (edata) {
		    $(edata).find("item").each(function () { // or "item" or whatever suits your feed
		        var el = $(this);

		        var titre=el.find("title").text();
		        var description=el.find("description").text();
		        var pubDate=el.find("pubDate").text();
		        var imggg=el.find("enclosure").attr('url');
		        var link=el.find("link").text();
		        var L = link.indexOf('#xtor=RSS-3-[france]') ;
		        link=link.substring(0,L);
		         
		        
		        var rss='<div class="nd2-card">'+

				'<div class="card-title has-supporting-text">'+
					'<h3 class="card-primary-title">'+titre+'</h3>'+
					'<h5 class="card-subtitle">'+pubDate+'</h5>'+
				'</div>'+

				'<div class="card-media">'+
					'<img src="'+imggg+'">'+
				'</div>'+

				'<div class="card-supporting-text has-action">'+description+'</div>'+
				/*'<div class="card-action">'+
				'<div class="row between-xs">'+
								'<div class="col-xs-4 align-left">'+
									'<div class="box">'+
										'<a href="" class="ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button" onclick="shareonfb(\''+link+'\')"><i class="zmdi zmdi-share"></i>          Partager Sur Facebook</a>'+
									'</div>'+
								'</div>'+
				'</div>'+
			'</div>'+*/
			'</div>';
			
		       
	    		$("#rssfeed").append(rss);
		        
		    });
		});
		
		
	 
	 
	 /*$(document).ready(function(){
			$.ajax({
				type: "GET",
				url: "sites.xml",
				dataType: "xml",
				success: function(xml) {
					$(xml).find('site').each(function(){
						var id = $(this).attr('id');
						var title = $(this).find('title').text();
						var url = $(this).find('url').text();
						
		
						
					});
				}
			});
		});*/
	 
	 
	 wow.sync();
}











var oauthurl = "https://www.facebook.com/dialog/oauth?";
var client_id = "965228056881526";
var redirect_uri = "https://www.facebook.com/connect/login_success.html";
var scope = "public_profile,email,user_friends,user_photos,user_hometown,user_location,read_custom_friendlists,user_photos";
var final_uri = oauthurl + 'client_id=' + client_id + '&redirect_uri=' + redirect_uri + "&scope=" + scope;

function FBLogin(){
    console.log("inside login");
    window.authWin = window.open(final_uri, "blank", "", true);
    montiorURL();
    return false;
}

function montiorURL() {
	console.log("montiorURL");
    window.int = self.setInterval(function () {
        window.authCount = window.authCount + 1;

        if (window.authWin && window.authWin.location) { 
            var currentURL = window.authWin.location.href;
            var inCallback = currentURL.indexOf("?code");
            if (inCallback >= 0) {
                var codeData = currentURL.substr(currentURL.indexOf("="));
                var code=codeData.substring(1);
                getAccesstoken(code);
            }
        }
        if (window.authCount > 30) {
            alert('30 seconds time out');
            window.authCount  =0;
            window.clearInterval(int)
            window.authWin.close();
        }
	}, 500);
}

function  getAccesstoken(code){
    $.ajax({
        type : "GET",
        url :'https://graph.facebook.com/oauth/access_token?client_id=965228056881526&redirect_uri=https://www.facebook.com/connect/login_success.html&client_secret=18ea4c6cfbd8f02f72d9c441821dba7c&code='+code,
        success : function(data) {
            try {
            	console.log("getAccesstoken acess success");
                accesstoken=data;
                access_token=parseToken(accesstoken);
                localStorage['accesstoken']=access_token;
                window.clearInterval(int)
                window.authWin.close();
                $.mobile.changePage("#mypage");
                //getHomepage();
                //getProfile();
                //getHomepage();
               getFriends();
            }
            catch (e) {
                console.log(e);
            }
        },
        error : function() {
            $.mobile.changePage("#errpage");
            console.log("acess token error");
        }
    });    
}

function parseToken(accesstoken){
    var c = accesstoken.indexOf('access_token') ; 
    var L = accesstoken.indexOf('&expires') ;
    var y = accesstoken.substring(0, c) + accesstoken.substring(L, accesstoken.length);
    var remaining = accesstoken.replace(y,'');
    return (remaining.substring(13));
}

function getHomepage(){
	$.ajax({
	        type : "GET",
	        url  :'https://graph.facebook.com/me/home?permissions=read_stream&access_token=' +localStorage['accesstoken'],
	        success : function(data1) {
	        	console.log("getHomepage() data = " + data1);
	        	
	            var from_id={};
	            var from_name={};
	            var messages={};
	            var type={};
	            var picture={};
	            var link={};
	            var image={};
	            var story={};
	            var Vname={};
	            var Vdescription={};
	            var home_length=data1.data.length;
	            console.log("length is "+home_length);
	            for(i=0;i < home_length;i++){
	                from_id[i]=data1.data[i].from.id;
	                from_name[i]=data1.data[i].from.name;
	                type[i]=data1.data[i].type;
	                story[i]=data1.data[i].story;
	                messages[i]=data1.data[i].message;
	                image[i]="https://graph.facebook.com/"+from_id[i]+"/picture";
	                if((type[i]=="link")||(type[i]=="video")||(type[i]=="swf")){
	                    link[i]=data1.data[i].link;
	                    Vname[i]=data1.data[i].name;
	                    Vdescription[i]=data1.data[i].description;
	                    }
	                else if(type[i]=="photo"){
	                    picture[i]=data1.data[i].picture;
	                }
	                else{}
	            }		            
	        },
	        error : function() {
	            $.mobile.changePage("#errpage");
	            console.log("acess token error");
	        }
	    });
	}

function getProfile() {
	$.ajax({
        type : "GET",
        dataType : 'json',
        url : 'https://graph.facebook.com/me?fields=first_name,last_name,email,education,location,languages,hometown,picture&permissions=read_stream&access_token=' +localStorage['accesstoken'] ,
        success : function(data1) {
	        console.log("getProfile() data = " + data1);
			
            /*var educationlength=data1.education.length;
            var school_image={};
            for(i=0;i< educationlength;i++){
                school[i]=data1.education[i].school.name;
                id[i]=data1.education[i].school.id;
                school_image[i]="http://graph.facebook.com/"+id[i]+"/picture";
            }
              */         
            var firstname=data1.first_name;
            var lastname=data1.last_name;     
            var mail=data1.email;
            //var hometown=data1.hometown.name;
            //var hometown_id=data1.hometown.id;
            //console.log("firstname = " + firstname + " lastname = " + lastname + " hometown = " + hometown);
            //var hometown_url="http://graph.facebook.com/"+hometown_id+"/picture";
 
            //var location1=data1.location.name;
            //var location_id=data1.location.id;
            //var location_url="http://graph.facebook.com/"+location_id+"/picture";
      
            var pic_url=data1.picture.data.url;

            var pic_url=data1.picture.data.url;
            localStorage.setItem("user",firstname+" "+lastname);
            localStorage.setItem("profile",pic_url);	
            localStorage.setItem("mail", mail);
            localStorage.setItem("iduser",data1.id);

        
        },
        error : function() {
        	$.mobile.changePage("#errpage");
            console.log("Unable to get your friends on Facebook");
        }
    });
}

function getFriends(){
    $.ajax({
        type : "GET",
        dataType : 'json',
        url : 'https://graph.facebook.com/me/friends?&access_token=' +localStorage['accesstoken'],
        success : function(data1) {
	        
        	console.log("getFriends() data = " + data1);
        	
            
            var jsonlength=data1.data.length;
            console.log("jsonlength = " + jsonlength);

            sessionStorage.setItem("fbfriendsdata",JSON.stringify(data1))
            
            /*for(i=0;i < jsonlength;i++)
            {
                names=data1.data[i].name;
                id=data1.data[i].id;
                img_url="http://graph.facebook.com/"+id+"/picture";
                console.log("i = " + i + " names = " + names + " id = " + id);

                $('#getFriends ul').append('<img src = ' + img_url + '>'
    					+ " names = " + names + " id = " + id);				
            }

            $('#getFriends ul').append('</li>');
			*/	
         },
         error : function() {
         	console.log("Unable to get your friends on Facebook");
         }
    });
}



$('#mypage').on('pageshow', function (event, ui) {
	  
	getProfile();
	
	
	
	
Parse.initialize("9LzkioWCbDvtriqUB1QDDhJ3s4zoG9vvOekxN4AM", "Q3fJN385YsCsRxkkltc7aTN1AJdJcWiNBfPVGGs4");

var User = Parse.Object.extend("Userfacebook");
var user1 = new User();

user1.set("user",localStorage.getItem("user"));
user1.set("picture",localStorage.getItem("profile"));
user1.set("mail",localStorage.getItem("mail"));


var userfind = Parse.Object.extend("Userfacebook");
var query = new Parse.Query(userfind);
query.equalTo("mail",user1.get('mail'));
query.find({
  success: function(results) {
   var x=results.length;
   if(x<=0){
	   user1.save(null, {
		   success: function(user1) {
		     
		   },
		   error: function(user1, error) {
		     
		   }
		 });
	   
   }
  },
  error: function(error) {
   
  }
});





});


/*function shareonfb(url) {
	//alert("hi");
	//alert("url");
	    var hrefvv = "https://m.facebook.com/sharer.php?u="+url;
	    //var a = window.open(href, 'facebook', 'width=466, height=356');
	    //alert(hrefvv);
	    window.authWin = window.open(hrefvv, "blank", "", true);
	
   
}
*/
/*function shareonfb(url){
	var appid=tizen.application.getCurrentApplication().appInfo.packageId // returns packageId
	alert(appid);
	
	var url2='http://www.facebook.com/dialog/feed?app_id=965228056881526'+
	    '&link=' +url+
	    '&name=ParisLife'+ 
	    '&redirect_uri='+encodeURIComponent('file://opt/usr/apps/UlIxUTP5QH/res/wgt/index.html') + 
	    '&display=popup'; 
	window.open(url2, 
            'feedDialog', 
            'toolbar=0,status=0,width=626,height=436'
); 
}*/


function filtrer(){
	
	$("#listaffiche").empty();
	
	var fin="";
	if(document.getElementById("checkbox-1ab").checked){
	var x=document.getElementById("checkbox-1ab").value;
	fin=fin+x+",";
	}
	if(document.getElementById("checkbox-2ab").checked){
	var y=document.getElementById("checkbox-2ab").value;
	fin=fin+y+",";

	}
	if(document.getElementById("checkbox-3ab").checked){
	var z=document.getElementById("checkbox-3ab").value;
	fin=fin+z+",";
}
	if(document.getElementById("checkbox-4ab").checked){
	var a=document.getElementById("checkbox-4ab").value;
	fin=fin+a+",";
}
	if(document.getElementById("checkbox-5ab").checked){
	var b=document.getElementById("checkbox-5ab").value;
	fin=fin+b+",";
}
	if(document.getElementById("checkbox-6ab").checked){
	var c=document.getElementById("checkbox-6ab").value;
	fin=fin+c+",";
}
	if(document.getElementById("checkbox-7ab").checked){
	var d=document.getElementById("checkbox-7ab").value;
	fin=fin+d+",";
}
	if(document.getElementById("checkbox-8ab").checked){
	var e=document.getElementById("checkbox-8ab").value;
	fin=fin+e+",";
}
fin=fin.substring(0,fin.length-1);
//alert(fin);
if (fin==""){
	fin="4";
}

var wow = new WOW();
var output = $.ajax({
   url: 'https://api.paris.fr/api/data/1.4/QueFaire/get_activities/?token=46f0825ba104099b7df908b9838bf946e19ceb6c0681ad6a05cfd1d8194a9ece&cid='+fin+'&tag=0&created=0&start=0&end=0&offset=0&limit=20', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
   type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
   data: {}, // Additional parameters here
   dataType: 'json',
   success: function(data) {
   	
   	var i=0;
   	
   	$.each(data.data, function(key, value) {
   		
   		//alert(value+" test 111111111")
			localStorage.setItem("event"+i, JSON.stringify(value));
   		//alert(JSON.stringify(value) +" test 2222222")
			
   		//alert(i)
			
			var img=value.files["0"].file;
			 if(img.substring(0,4)!="http"){
				 img="https://filer.paris.fr/"+value.files[0].file;
			 }
			 if(img.substring(img.length-3,img.length)!="jpg"){
				 img="./ImageParis/ic_launcherico.png";
			 }
			
   		var weather_s ='<li class="ui-li-has-thumb" id="'+i+'"  onclick="getidevent(this.id); return false;">'+
   		        '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
   				'<img src="'+img+'"  class="ui-thumbnail ui-thumbnail-circular" />' +
   				'<h2>'+value.nom+'</h2>'+
   				'<p>'+value.rubriques["0"].rubrique+'</p>'+
   				'</a>';
   		'</li>';
   		
   		i++;
   		$("#listaffiche").append(weather_s);
   		
   		 
   		 
   	  });
			
			
		

		
   	
   },
   error: function(err) { alert(JSON.stringify(err)) }
   
});
wow.sync();
}

