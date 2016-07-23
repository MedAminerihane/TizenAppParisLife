function loadimgdata()
{
	
	
	add=localStorage.getItem("cpt");
	user=localStorage.getItem("user");
	img=localStorage.getItem("profile");
	dec=localStorage.getItem("deconnecter");
	//$("#imgprof").attr("src",img);
	//document.getElementById("imgprof").setAttribute(src,img);
	//document.getElementById("nomp").innerHTML = user;
	if((add=="non")&(dec!="yes"))
		{
	prof='<img class="profile-background" src="./images/paris.png"/>'+
	'<div class="row">'+
		'<div class="col-xs-4 center-xs">'+
			'<div class="box">'+
			'<img class="profile-thumbnail" src="'+img+'" />'+
			'</div>'+
		'</div>'+
		'<div class="col-xs-8">'+
			'<div class="box profile-text">'+
				'<strong>'+user+'</strong>'+
			'</div>'+
		'</div>'+
	'</div>';
	
	document.getElementById("headadd").innerHTML+=prof;
	//$("#headadd").append(prof);
	
	localStorage.setItem("cpt","oui");
	
	
		}
	
	
	}



function loadimgdata2()
{
	
	
	add=localStorage.getItem("cpt");
	user=localStorage.getItem("user");
	img=localStorage.getItem("profile");
	dec=localStorage.getItem("deconnecter");

	//$("#imgprof").attr("src",img);
	//document.getElementById("imgprof").setAttribute(src,img);
	//document.getElementById("nomp").innerHTML = user;
	if((add=="non")&(dec!="yes"))
		{
	prof='<img class="profile-background" src="../images/paris.png"/>'+
	'<div class="row">'+
		'<div class="col-xs-4 center-xs">'+
			'<div class="box">'+
			'<img class="profile-thumbnail" src="'+img+'" />'+
			'</div>'+
		'</div>'+
		'<div class="col-xs-8">'+
			'<div class="box profile-text">'+
				'<strong>'+user+'</strong>'+
			'</div>'+
		'</div>'+
	'</div>';
	
	document.getElementById("headadd").innerHTML+=prof;
	//$("#headadd").append(prof);
	
	localStorage.setItem("cpt","oui");
	
	
		}
	
	
	}
