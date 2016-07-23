
function strip(html)
{
var tmp = document.createElement("DIV");
tmp.innerHTML = html;
return tmp.textContent || tmp.innerText;
}


window.addEventListener('load', function(){
	var wow = new WOW();
	
	var j=localStorage.getItem("lengthfavoris");
	for (var int = 0; int < j; int++) {
		
		
		var val = localStorage.getItem("favorite"+int);

	 	var ch=JSON.parse(val);
	 		 	
	    var kkk ='<li class="ui-li-has-thumb" id="'+int+'">'+
	    '<a href="" class="ui-btn waves-effect waves-button waves-effect waves-button">'+
		'<img width="50" height="50" src="https://filer.paris.fr/'+ ch.files["0"].file +'"  class="ui-thumbnail ui-thumbnail-circular" />' +
		'<h2>'+ch.nom+'</h2>'+
		'</a>';
	'</li>';

	
	$("#mybest").append(kkk); 
	 	
	}
 	
 	
    
    
 		  
 	
 	
 	loadimgdata();
 		 wow.sync();
 		  
},false);
