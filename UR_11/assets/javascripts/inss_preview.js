$(function() {
   var clonedTitle;

   $(".section").each(function() {
       clonedTitle = $(this).find('h2');
       clonedTitle
         .before(clonedTitle.clone())
         .css("width", clonedTitle.width())
         .addClass("sticky-title invisible");
         
   });
    
    $(window).on('scroll', function(e){    
       $('.section').each(function(){

           var scrollTop = $(window).scrollTop(),
               offset = $(this).offset(),
               stickyTitle = $(this).find('.sticky-title');
           

            if ((scrollTop > offset.top) && (scrollTop < offset.top + ($(this).height()-stickyTitle.height()))){
               stickyTitle.removeClass('invisible').prev('h2').addClass('blend-with-bg');
            } else {
               stickyTitle.addClass('invisible').prev('h2').removeClass('blend-with-bg');
            }

       });
    });
});