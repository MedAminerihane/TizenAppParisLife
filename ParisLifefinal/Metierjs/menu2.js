function logoutfb()
{
    $.ajax({
        type : "GET",
        url :'https://www.facebook.com/logout.php?next=https://www.facebook.com/connect/login_success.html&access_token='+localStorage['accesstoken'],
        success : function(data) {
        	verif=localStorage.setItem("deconnecter", "yes");
             window.location.assign("../index.html#splash");

        },
    	error: function(){console.log("error");}
    });
}




function redirect() {
	localStorage.setItem("cpt","non");
	window.location.assign("../favoris.html");
}
function redirect1() {
	localStorage.setItem("cpt","non");
	window.location.assign("../apropos.html");
}