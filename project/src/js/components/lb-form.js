 module.directive('lbForm',function() {
    return {
      restrict: 'E',
      transclude: true,
      template:
         '<ng-form class="lb_form" ng-transclude></ng-form>',
      replace: true
    };
  });

 module.directive('lbFormItem', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      compile:  function (element, attrs, transclude) {

        var form = findForm(element);  
        var formName =  form.attr('name'); 
        var path = formName + '.' + attrs.name;

        var label =   '<div class="lb_form_item_label">'+
                        '<label>'+ attrs.label;
             
        var error = '';                  
        if(attrs.required || attrs.ngRequired){
           error += '<span class="lb_req">*</span>';
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$dirty && '+ path + '.$error.required">'+(attrs.ngRequiredError ? attrs.ngRequiredError : 'Campo Obrigat&#243;rio')+'.</span>';
        }
        if(attrs.type === "email"){
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.email">Email inv&#225;lido.</span>';
        } 

        if(attrs.type === "password"){
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.password">Confirmação inv&#225;lida.</span>';
        } 

        if(attrs.ngMaxlength){
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.maxlength">'+(attrs.ngMaxlengthError ? attrs.ngMaxlengthError : 'M&#225;ximo de '+ attrs.ngMaxlength +' caracteres') +'.</span>';
        }   
        if(attrs.ngMinlength){                  
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.minlength">'+(attrs.ngMinlengthError ? attrs.ngMinlengthError : 'M&#237;nimo de '+ attrs.ngMinlength +' caracteres') +'.</span>';
        }
        if(attrs.ngPattern){                  
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.pattern">'+attrs.ngPatternError+'</span>'; 
        }

        if(attrs.ngCustomError){
          error += '<span class="lb_err_msg" ng-show="'+attrs.ngCustomError+'">{{'+attrs.ngCustomError+'}}</span>';
        }

        label += error + '</label></div>';

        var value =  '<div class="lb_form_item_value"><input '; 

        for(var attr in attrs){
          if(attr.indexOf('$') == -1){
            value += ' ' + attr.replace(/([A-Z])/g, '-$1') + '="' + attrs[attr] + '"'; 
            element.removeAttr(attr.replace(/([A-Z])/g, '-$1'));
          }
        }

        value += '/></div>';
        
        var html = label + value  ;
       // var html = '<div class="lb_form_item">' + label + value + "</div>" ;

        element.addClass('lb_form_item');

        element.html(html);

      }          
    };
  });

 module.directive('lbFormItemText', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      compile:  function (element, attrs, transclude) {

        var form = findForm(element);  
        var formName =  form.attr('name'); 
        var path = formName + '.' + attrs.name;

        var label =   '<div class="lb_form_item_label">'+
                        '<label>'+ attrs.label;
             
        var error = '';                  
        if(attrs.required){
           error += '<span class="lb_req">*</span>';
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$dirty && '+ path + '.$error.required">'+(attrs.ngRequiredError ? attrs.ngRequiredError : 'Campo Obrigat&#243;rio')+'.</span>';
        }
        if(attrs.ngMaxlength){
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.maxlength">'+(attrs.ngMaxlengthError ? attrs.ngMaxlengthError : 'M&#225;ximo de '+ attrs.ngMaxlength +' caracteres') +'.</span>';
        }   
        if(attrs.ngMinlength){                  
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$error.minlength">'+(attrs.ngMinlengthError ? attrs.ngMinlengthError : 'M&#237;nimo de '+ attrs.ngMinlength +' caracteres') +'.</span>';
        }
       
        if(attrs.ngCustomError){
          error += '<span class="lb_err_msg" ng-show="'+attrs.ngCustomError+'">{{'+attrs.ngCustomError+'}}</span>';
        }

        label += error + '</label></div>';

        var value =  '<div class="lb_form_item_value"><textarea '; 

        for(var attr in attrs){
          if(attr.indexOf('$') == -1){
            value += ' ' + attr.replace(/([A-Z])/g, '-$1') + '="' + attrs[attr] + '"'; 
            element.removeAttr(attr.replace(/([A-Z])/g, '-$1'));
          }
        }

        value += '/></div>';
        
        var html = label + value  ;

        element.addClass('lb_form_item');

        element.html(html);

      }          
    };
  });

 module.directive('lbFormItemSelect', ['$compile',function($compile) {
    return {
      restrict: 'E',
      priority: 1000,
      terminal: true,
      scope: false,
      compile:  function (element, attrs, transclude) {

        var form = findForm(element);  
        var formName =  form.attr('name'); 
        var path = formName + '.' + attrs.name;

        var label =   '<div class="lb_form_item_label">'+
                        '<label>'+ attrs.label ;
             
        var error = '';                  
        if(attrs.required){
           error += '<span class="lb_req">*</span>';
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$dirty && '+ path + '.$error.required">'+(attrs.ngRequiredError ? attrs.ngRequiredError : 'Campo Obrigat&#243;rio')+'.</span>';
        }
       
        label += error + '</label></div>';

        var value =  '<div class="lb_form_item_value"><select '; 

        for(var attr in attrs){
          if(attr.indexOf('$') == -1){
            value += ' ' + attr.replace(/([A-Z])/g, '-$1') + '="' + attrs[attr] + '"'; 
            element.removeAttr(attr.replace(/([A-Z])/g, '-$1'));
          }
        }

        value += '/></div>';
        
        var html = '<div class="lb_form_item">' + label + value + "</div>" ;

        var newElement = angular.element(html);

        return  function(scope, element, attrs) {
                var compiledEl = $compile(newElement)(scope);
                element.replaceWith(compiledEl);
            };
      }          
    };
  }]);

/*

module.directive('lbFormItemSelect', ['$compile',function($compile) {
    return {
      priority : 1,
      restrict: 'E',
      replace: true,
      scope: false,
      compile:  function (element, attrs, transclude) {

        var form = findForm(element);  
        var formName =  form.attr('name'); 
        var path = formName + '.' + attrs.name;

        var label =   '<div class="lb_form_item_label">'+
                        '<label>'+ attrs.label ;
             
        var error = '';                  
        if(attrs.required){
           error += '<span class="lb_req">*</span>';
           error += '<span class="lb_err_msg" ng-show=" '+ path + '.$dirty && '+ path + '.$error.required">'+(attrs.ngRequiredError ? attrs.ngRequiredError : 'Campo Obrigat&#243;rio')+'.</span>';
        }
       
        label += error + '</label></div>';

        var value =  '<div class="lb_form_item_value"><select '; 

        for(var attr in attrs){
          if(attr.indexOf('$') == -1){
            value += ' ' + attr.replace(/([A-Z])/g, '-$1') + '="' + attrs[attr] + '"'; 
            element.removeAttr(attr.replace(/([A-Z])/g, '-$1'));
          }
        }

        value += '/></div>';
        
        //var html = '<div class="lb_form_item">' + label + value + "</div>" ;

        var html = label + value;

        element.addClass("lb_form_item");

        element.html(html); 

        //var newElement = angular.element(html);

        //return  function(scope, element, attrs) {
        //        var compiledEl = $compile(newElement)(scope);
        //        element.replaceWith(compiledEl);
        //    };
      }          
    };
  }]);
  
*/

 module.directive('lbFormItemCheck', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      compile:  function (element, attrs, transclude) {

        var form = findForm(element);  
        var formName =  form.attr('name'); 
        var path = formName + '.' + attrs.name;

        var label =   '<div class="lb_form_item_label lb_inline_form_item">'+
                        '<label>'+ attrs.label + '</label></div>';
             
        var value =  '<div class="lb_form_item_value lb_inline_form_item"><input type="checkbox" '; 

        for(var attr in attrs){
          if(attr.indexOf('$') == -1){
            value += ' ' + attr.replace(/([A-Z])/g, '-$1') + '="' + attrs[attr] + '"'; 
            element.removeAttr(attr.replace(/([A-Z])/g, '-$1'));
          }
        }

        value += '/></div>';
        
        var html = value + label;
      
        element.addClass('lb_form_item');

        element.html(html);
      }          
    };
  });

 module.directive('lbFormItemRadio', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      compile:  function (element, attrs, transclude) {

        var form = findForm(element);  
        var formName =  form.attr('name'); 
        var path = formName + '.' + attrs.name;

        var label =   '<div class="lb_form_item_label lb_inline_form_item">'+
                        '<label>'+ attrs.label + '</label></div>';
             
        var value =  '<div class="lb_form_item_value lb_inline_form_item"><input type="radio" '; 

        for(var attr in attrs){
          if(attr.indexOf('$') == -1){
            value += ' ' + attr.replace(/([A-Z])/g, '-$1') + '="' + attrs[attr] + '"'; 
            element.removeAttr(attr.replace(/([A-Z])/g, '-$1'));
          }
        }

        value += '/></div>';
        
        var html = value + label;
      
        element.addClass('lb_form_item');

        element.html(html);
      }          
    };
  });


 function findForm(element){
   var parent =  element.parent();
   
   while(parent && parent[0].nodeName !== "NG-FORM" && parent[0].nodeName !== "LB-FORM" && parent[0].nodeName !== "FORM"){
      parent = parent.parent();
   }

    return parent;
 }