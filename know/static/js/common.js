
export const distance = window.screen.width;


$(function(){
  let [numCount,opcity,before]=[8,0,$('.carousel-news').scrollTop()];
  $('.carousel-news').scroll(function() {
    let after = $('.carousel-news').scrollTop();
    if (before<after) {
      if (after<=208) {
        opcity+=0.01;
        if (opcity>1) {
          opcity=1;
        }
        $(".head").css('background',`rgba(2,143,214,${opcity})`);
      }
      before = after;
    }
    if(before>after && after<208){
      if (after>=1) {
        opcity-=0.01;
        if (opcity<0) {
          opcity=0;
        }
        $(".head").css('background',`rgba(2,143,214,${opcity})`);
      }
      before = after;
    }
    if(after>230){
      $(".head").css('background','rgba(2,143,214,1)');
      opcity=1;
    };
    if(after<0.1){
      $(".head").css('background','rgba(2,143,214,0)');
      opcity=0;
    }

  });
})
