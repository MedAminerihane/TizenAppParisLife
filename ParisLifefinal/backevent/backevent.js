
	document.addEventListener('tizenhwkey', function(e) {
		
		if(e.keyName == "back") {
			try {
				
window.history.back();	
localStorage.setItem("cpt","non");


} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
