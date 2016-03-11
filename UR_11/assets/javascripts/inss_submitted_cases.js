$('input[type="search"]').on('focus', function(e){
    $(this).parents('form').addClass('focus');
});

$('input[type="search"]').on('blur', function(e){
    if($(this).val() == '')
        $(this).parents('form').removeClass('focus');
});


$('#search').on('change keyup copy paste cut', function(e,p){
	
	var _url,
        status = '';
	
	if( p!=undefined && p=='filter'){
		var f = $('#cas-status-keys a.active').attr('data-filter');
        
        if(f != 'all-cases')
            status = "&status="+f;		
	}
		
    _url = URI+"users/dashboard/cases?search="+$(this).val()+status;
        
    $.ajax({
        
      url: _url
        
    }).done(function(d) { 
        
        var oItems = {
            'total':'.opt-all-cases',
            'inprogressCount':'.opt-in-progress',
            'awaitingReviewCount':'.opt-for-review',
            'notStartedCount':'.opt-not-started'
            }
        
        
        var itemsToDisplay = 0;
        
        $.each(oItems, function(i,v){            
            var oItem = $('#cas-status-keys').find(v).removeClass('disabled');
            oItem.find('.cnt').text(d[i]);
            
            if(d[i] == 0)
                oItem.addClass('disabled');
            
            itemsToDisplay += d[i];
        });
        
        $('#cas-cases-container').empty();
        
        if (itemsToDisplay == 0 ){
            $('#cas-status-keys').hide();
            $('#cas-cases-container').html( d.globalMessage );
        } else {
            $('#cas-status-keys').show();   
        }

        
        
        
        var oBtnLoadMore = $('.cas-load-more-wrapper'),
            resultCount  = d.caseDefinitions.length;

        if(resultCount > 2 )
            oBtnLoadMore.show();
        else
            oBtnLoadMore.hide();
        
        if( resultCount > 0 ){
            $.each(d.caseDefinitions, function(i,v){
            	var m = oCaseSummaryMarkup.clone();
            	m.find('.case-company-name').text(v.caseName);
            	m.find('.case-registration').text(v.companyRegNumber);
            	m.find('.case-ip').text(v.ipName);
            	m.find('.case-date').text(v.dueMessage);
            	m.find('.case-status').text(v.statusText);
                m.find('#dueDate h3').addClass(v.caseSignal.toLowerCase()+'-bg');
            	
            	if(i > maxCasesToShow-1)
            		m.hide().addClass('collapsed');
            	
                m.appendTo($('#cas-cases-container'));
            });
        }
    });
});


$('#cas-status-keys a').on('click', function(e){

	e.preventDefault();
    
    if ( $(this).parent().hasClass('disabled') )
        return false;
	


     if (!$(this).hasClass('active')){
         $('#cas-status-keys a.active').removeClass('active');
         $(this).addClass('active');
     }

     $('#search').trigger('keyup', 'filter');

 });


$('.cas-load-more-wrapper .btn-load-more').on('click', function(e){
    e.preventDefault();
    
    $('.cas-case-wrapper.collapsed').each(function(i){
       if(i > maxCasesToShow-1)
           return false;
           
       $(this).fadeIn().removeClass('collapsed');
    });
    
    showHideMoreCasesOption();
});


function showHideMoreCasesOption(){
    if($('.cas-case-wrapper.collapsed').length == 0)
       $('.cas-load-more-wrapper').hide();
}

function showHideCases(){
    var totalCases = $('.cas-case-wrapper').length
    if ( totalCases > maxCasesToShow ){
        for(i=maxCasesToShow; i<totalCases; i++)
            $('.cas-case-wrapper:eq('+i+')').hide().addClass('collapsed');
    }
    
    showHideMoreCasesOption();
}


var oCaseSummaryMarkup,
    maxCasesToShow = 10;

$(document).ready(function(e){
   $.ajax({
	   url: URI+'users/dashboard/template'
   }).done(function(markup){
	   oCaseSummaryMarkup = $(markup);
   });
   
   showHideCases();
});