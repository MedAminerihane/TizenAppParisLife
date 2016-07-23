
	document.addEventListener('tizenhwkey', function(e) {
		
		if(e.keyName == "back") {
			try {
window.history.back();	
localStorage.setItem("cpt","non");
localStorage.setItem("backfrom","listguide");

} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
