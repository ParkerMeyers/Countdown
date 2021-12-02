// Reaload on focus lost to keep countdown correct
var blurred = false;
window.onblur = function() { blurred = true; };
window.onfocus = function() { blurred && (location.reload()); };

var Countdown = {
  
  $el: $('.countdown'),
  
  countdown_interval: null,
  total_seconds     : 0,
  
  init: function() {
		var countDownDate = new Date("Jan 8, 2022 12:0:0").getTime();
		var now = new Date().getTime();

  	var distance = countDownDate - now;

  	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		this.$ = {
			days: this.$el.find('.bloc-time.days .figure'),
    	hours  : this.$el.find('.bloc-time.hours .figure'),
    	minutes: this.$el.find('.bloc-time.min .figure'),
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};

    this.values = {
				days: Math.floor(distance / (1000 * 60 * 60 * 24)),
	      hours  : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
    
    this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;
 
    this.count();    
  },
  
  count: function() {
    
    var that    = this,
				$days_1 = this.$.days.eq(0),
				$days_2 = this.$.days.eq(1),
        $hour_1 = this.$.hours.eq(0),
        $hour_2 = this.$.hours.eq(1),
        $min_1  = this.$.minutes.eq(0),
        $min_2  = this.$.minutes.eq(1),
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);
    
        this.countdown_interval = setInterval(function() {
				if (true) {
					function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(250).then(() => { 
	var box2 = document.getElementsByClassName('countdown')[0];
				
	var box = document.getElementsByClassName('loading')[0];
			
					box.classList.add('box-transition');
					box.classList.add('box-hidden');
	box2.classList.add('visible');
				
					 
});

				}
					
        if(that.total_seconds > 0) {

            --that.values.seconds;              

            if(that.values.minutes >= 0 && that.values.seconds < 0) {

                that.values.seconds = 59;
                --that.values.minutes;
            }

            if(that.values.hours >= 0 && that.values.minutes < 0) {

                that.values.minutes = 59;
                --that.values.hours;
            }

						that.checkHour(that.values.days, $days_1, $days_2);
					
            that.checkHour(that.values.hours, $hour_1, $hour_2);

            that.checkHour(that.values.minutes, $min_1, $min_2);

            that.checkHour(that.values.seconds, $sec_1, $sec_2);

					  var days2 = (Math.floor(that.values.days / 7));

						document.getElementById("meetings").innerHTML = Math.ceil(days2) + " Meetings Left";
						

            --that.total_seconds;
        } else {
            clearInterval(that.countdown_interval);
        }
    }, 1000);    
  },
  
  animateFigure: function($el, value) {
    
     var that         = this,
		     $top         = $el.find('.top'),
         $bottom      = $el.find('.bottom'),
         $back_top    = $el.find('.top-back'),
         $back_bottom = $el.find('.bottom-back');

    $back_top.find('span').html(value);

    $back_bottom.find('span').html(value);

    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, { 
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut, 
        clearProps          : 'all' 
    });    
  },
  
  checkHour: function(value, $el_1, $el_2) {
    
    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }    
  }
};

Countdown.init();