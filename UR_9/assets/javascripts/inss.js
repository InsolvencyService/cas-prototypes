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