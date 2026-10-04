 // use to validate while user entered date manually in dd/mm/yyyy format or not
 $.extend($.fn.validatebox.defaults.rules, {
    dateformat: {
        validator: function(value, param){
           //var letters = /^[0-9\\]/;
          // var letters = /^\d{2}\/\d{2}\/\d{4}$/ ;
           var letters = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; /* year between 1900 and 2099 */                      
            return value.match(letters);          
        //return value.length >= param[0];
        },
        message: 'Enter Date in DD/MM/YYYY format'
    }
});
// use to validate while username contains only text
$.extend($.fn.validatebox.defaults.rules, {  
        justText: {  
             validator: function(value, param){  
         return !value.match(/[0-9]/);
   },  
   message: 'Please enter only text.' 
        }  
    });
    $.extend($.fn.validatebox.defaults.rules, {
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: 'Please enter at least {0} characters.'
    }
});


/////////////////For MaxLength////////////////
$.extend($.fn.validatebox.defaults.rules, {
    maxLength: {
        validator: function(value, param){
            return value.length <= param[0];
        },
        message: 'Maximum length cannot be greater than {0} characters.'
    }
});
