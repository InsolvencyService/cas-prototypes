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
