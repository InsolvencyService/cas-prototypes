var URI = '../';

// JS for CAS
$('form.validate').on('submit', function(e){
    e.preventDefault();
    $('.validate').each(function(){
        
        validations = $(this).attr('data-validation');
        validations = validations.split(" ");
        
        for(i=0; i<validations.length; i++){
            switch(validations[i]){
                case 'required':
                    console.log('im required');
                    break;
                    
                case 'email':
                    console.log('email is invalid');
                    break;
            }
        }
    });
});

//
$('input.validate').on('keypress', function(e){
    
    var validationType = $(this).attr('data-validation'),
        valid = false;

    switch(validationType){
        case 'letters':
                if(e.which >= 65 && e.which <= 96 
                   || e.which >= 97 && e.which <= 122 ){
                    valid = true;
                }
            break;
            
        case 'number':
                if(e.which >= 48 && e.which <= 57){
                    valid = true;
                }
            break;
    }
    
    if(!valid){
        e.preventDefault();
        return false;
    }
    
});

$('input[type="checkbox"]').on('click', function(e){
    
   var g = $(this).parents('.form-group')
   
   if($(this).attr('data-disowned')){
       if($(this).is(':checked')){
           g.find('input[type="checkbox"]').prop('checked', false).parent().removeClass('selected');
           $(this).prop('checked', true).parent().addClass('selected');
       }
       
       return;
   }
    
   g.find('input[data-disowned="true"]').prop('checked', false).parent().removeClass('selected');
   
    
   if($(this).attr('data-parent')){
       var checked = $(this).is(':checked');
       
       g.find('input[type="checkbox"]').each(function(){

           if(checked && !$(this).attr('data-disowned') )
               $(this).prop('checked', true).parent().addClass('selected');
           else
               $(this).prop('checked', false).parent().removeClass('selected');
       });
           
   } else {
       
       g.find('input[data-parent="true"]').prop('checked', false).parent().removeClass('selected');
       
   }
});


// user management widget

oInviteCollaboratorsForm = $('#frmInviteCollaborators div');
oInviteCollaboratorsForm.toggle();
$('#btnInviteCollaborators').on('click', function(e){
    e.preventDefault();
     oInviteCollaboratorsForm.toggle();
});


$('#reportBugWrapper .content').toggle();
$('#reportBugWrapper a').on('click', function(e){
    e.preventDefault(); 
    $(this).parent().find('.content').toggle();
});

$('#reportBugWrapper').on('submit', function(e){
    e.preventDefault();
    
    var error = false,
        oError = $(this).find('.error');
    
    oError.addClass('hidden');
    
    $(this).find('input[type="text"]').each(function(e){
        if ($.trim($(this).val()) == '')
            error = true;
    });
    
    if(error)
        oError.removeClass('hidden');
});