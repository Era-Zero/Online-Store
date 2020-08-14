$(document).ready(function() {

    //Function to fade testimonials
    //Also changes the text of the button
    $('#hide-test-btn').click(function (){
        $('#hide-test').fadeToggle(1500 , () => {
            $(this).text('Show Testimonial')
        })

        $(this).text('Hide Testimonial')
    });

    //Animated background 
    $(".anime-bg").css("transition","all 3s");
    var arr = ["#8bc1f7d2","#d9bff0c2"];
    function changeColor(){
       $(".anime-bg").css({
            backgroundColor : arr[parseInt(Math.random() * 3)]
          });
    }
    changeColor();
    setInterval(changeColor,3000);


    // Accordion menu
    var allPanels = $('.box').hide();

    // On click function with slide animations
    $('.accordion').hover(function () {
        allPanels.slideUp(200);
        $(this).next().slideDown(200);

        // If you click on body it retracts accordion
        $('body').hover(function () {
            allPanels.slideUp(100);
        })
        return false;
    })

});