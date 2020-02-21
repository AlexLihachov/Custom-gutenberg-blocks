(function( $ ) {

   function rriVideoPopUp(){
      var target = $('.rri-header .rri-header-overlay');
      var launcher = $('.rri-header .rri-video-launcher');
      launcher.on('click', function(e) {
         e.preventDefault();
         var video = '';
         if( $(this).parent().siblings('iframe').length !== 0){
            video = 'iframe';
            $(this).parent().siblings(video)[0].src +="?autoplay=1";
         } else {
            video = 'video';
            $(this).parent().siblings(video)[0].play();
         }
         $(this).parent().siblings(video).fadeIn();
         $(this).parent().siblings('.rri-header-overlay').fadeIn();
      });
      target.on('click', function(){
         var src = '';
         var video = '';
         if( $(this).siblings('iframe').length !== 0){
            video = 'iframe';
            src = $(this).siblings('iframe')[0].src.replace("?autoplay=1", '');
            $(this).siblings('iframe')[0].src = src
         } else {
            video = 'video';
            $(this).siblings('video')[0].pause();
         }

         $(this).siblings(video).fadeOut();


         $(this).fadeOut();
      });

   }
   rriVideoPopUp();


})(jQuery);