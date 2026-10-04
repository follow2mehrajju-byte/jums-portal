
/*$(document).on('contextmenu', function() {
  return false;
});
*/
$(window).load(function(){
  setTimeout("backButtonOverrideBody()", 1);
});
/*$(document).on({    
    "mousedown": function(e) { 
        console.log("normal mouse down:", e.which); 
         e.preventDefault();
    },
    "mouseup": function(e) { 
        console.log("normal mouse up:", e.which);
        e.preventDefault(); 
    }
});
*/


function backButtonOverrideBody()
{

  try {
    history.forward();
  } catch (e) {

  }
    setTimeout("backButtonOverrideBody()", 500);
    
}
