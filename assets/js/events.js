// events.js - event-specific interactions (register form demo)
(function(){
  const regForm = document.getElementById('eventRegister');
  if(regForm){
    regForm.addEventListener('submit', function(e){ e.preventDefault(); alert('Registered (demo)'); this.reset(); });
  }
})();
