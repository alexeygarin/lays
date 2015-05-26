    
    var gerade=0;

    function check_code() {
        var code = $("#start_val").val();

        $.get( "/check_code.php", { code: code }, function( data ) {
            
            if (data.length == 6 && !isNaN(parseInt(data))) {
                var combination = data.substring(0,2)+","+data.substring(2,4)+","+data.substring(4,6);
                C3Counter("counter", "no",  "", combination);
            }
            else {
                combination = (Math.floor((Math.random() * 29)) + 0.5)+","+(Math.floor((Math.random() * 29)) + 0.5)+","+(Math.floor((Math.random() * 29)) + 0.5);
                C3Counter("counter", "no",  "", combination);
            }
        });
    }


    function C3Counter(id, regenerate, startval, endval) {
        
            this.options = {
                startval: startval,
                endval: endval,
		  digitsNumber: 3,
                digitImages: 1,
                digitWidth: 70,
                digitHeight: 70,
                digitSlide : true,
                digitSlideTime : 200,
                digitImageHeight : 2100,
                digitAnimationHeight : 2100,               
		  image: "slot-prizes-2.png",
            };

         

	     var pictures = this.options.startval.split(','); 
	     var digitsNumber = this.options.digitsNumber;
	     var endPictures = this.options.endval.split(',');
            var digits = new Array();

            if(regenerate=='yes')
            {
                var s;
                
                for (var dc=0; dc<digitsNumber; dc++) {
                    digits[dc] = { digit: pictures[dc] };
                    $("#"+id).append("<div id='digit"+dc+"'  style='position:relative;float:left;width:"+this.options.digitWidth+"px;height:"+(3*this.options.digitHeight-2)+"px;overflow:hidden;'><div class='digit' id='digit-bg"+dc+"' style='position:absolute; top:-"+(digits[dc].digit+1)*this.options.digitAnimationHeight+"px; width:"+this.options.digitWidth+"px; height:"+(50*this.options.digitImageHeight)+"px; '></div></div><div class='digit-spacer' style='position:relative;float:left;'>&nbsp;</div>");                                                
                }
                
                $("#"+id).append("<div style='clear:both'></div>");
            }

            this.animateDigits = function() {
                
                for (var dc=0; dc<digitsNumber; dc++) {

                    digits[dc] = { digit: dc};
                    digits[dc].digitNext = Number(endPictures[dc]);

                    digits[dc].digitNext = (digits[dc].digitNext) % 30   ;

                    

                    

                    var no = dc;

                    if (digits[no].digit == 0) {
				$("#digit-bg"+no).css("top", -this.options.digitImageHeight+this.options.digitHeight + "px");
			}
                    if (digits[no].digit != digits[no].digitNext) {
                        $("#digit-bg"+no).animate( { "top" : -(digits[no].digitNext-1)*options.digitHeight-((gerade % 4)*options.digitHeight*30)+"px"}, options.digitSlideTime*(dc+1));
                        digits[no].digit = (digits[no].digitNext);
                        //alert(-(digits[no].digitNext-1)*options.digitHeight-((gerade % 4)*options.digitHeight)+"px");
                        //alert("gerade="+gerade);
                    }                    
                }  

                gerade=gerade+1;
                
            }
            


            this.animateDigits();
          
            
        }