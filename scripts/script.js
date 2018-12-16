var temp1 = document.getElementById("changeMode"),
    temp2 = document.querySelector("#content-save"),
    temp3 = document.querySelector("#changeTemplate");
var clone1 = temp1.content.cloneNode(true);
var clone2 = temp2.content.cloneNode(true);
var clone3 = temp3.content.cloneNode(true);

$('.wrapper').append(clone1);
/*$('.wrapper').append(clone2);*/
$(document).ready(function() {
    var body = $('body');
    /******************* Variables ***************/
    $("#img").resizable();
    var zIndex = 1,
        currentEvent = false,
        blockClickEvent = true,
        optionsElement = $('#options'),
        optionsElementBtnDel = $('#options #delete button'),
        modalColorElm = $('#modalColor'),
        modalTextElm = $('#modalText'),
        modalTextSize = $('#modalTextSize'),
        modalBackElm = $('#modalBackColor'),
        modalWidthElm =  $('#modalWidth'),
        modalHeightElm =  $('#modalHeight'),
        modalPaddingLeft = $('#modalPaddingLeft'),
        modalPaddingRight = $('#modalPaddingRight'),
        modalPaddingTop = $('#modalPaddingTop'),
        modalPaddingBottom = $('#modalPaddingBottom'),
        modalBorderWidth = $('#modalBorderWidth'),
        modalBorderColor = $('#modalBorderColor'),
        elmborderWidth = null,
        elmPaddingLeft = null,
        elmPaddingRight = null,
        elmPaddingTop = null,
        elmPaddingBot = null,
        elmWidth = null,
        elmHeight = null,
        videoObj = {
            url: '',
            videotitle: 'video',
            videoalt: 'video',
            width: null,
            height: null
        }
    ;
    /******************* /Variables ***************/
var templateId= null,
        templatePage = null;
	$(document).on('click','.template-btn',function () {
		$('.wrapper').html(clone3);
        templateId = $(this).attr('id');
    });

	function setAllbg(color){
	    $('.header-block').css('background',color);
        body.css('background',color);
	    $('.footer-block').css('background',color);
	    $('.es-left-sidebar').css('background',color);
	    $('.es-right-sidebar').css('background',color);
    }


	$(document).on('click','.template-page-btn',function () {
        $('.wrapper').html(clone2);
        templatePage = $(this).attr('id');
        setSidebars(templatePage);
        console.log(templateId, templatePage);
        if(templateId === 'minimal-template'){
            body.css('font-family','Lora, serif');
            setAllbg('#2888d7');
            templateObj = {
                color: "#fff",
                background: "#55f15e",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                borderWidth: "1px",
                borderColor: "#5bd361",
                width: 150,
                height: 150,
                'text-align': "center",
                text: '',
                url: '',
                imgtitle: 'minimal image',
                imgalt: 'minimal image',
                'border-radius': '3px',
                videourl:'',
                videotitle:"minimal video",
                videoalt:"minimal video"
            };
        }
        else if(templateId === 'gotik-template'){
            body.css('font-family','Oswald, sans-serif');
            setAllbg('#e9e9e9');
            templateObj = {
                color: "#ff2e1f",
                background: "#000",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                borderWidth: "1px",
                borderColor: "#5bd361",
                width: 150,
                height: 150,
                'text-align': "center",
                text: '',
                url: '',
                imgtitle: 'gotik image',
                imgalt: 'gotik image',
                'border-radius': '0px',
                videourl:'',
                videotitle:"gotik video",
                videoalt:"gotik video"
            };
        }
        else{
            body.css('font-family','Mukta, sans-serif;');
            setAllbg('#fff');
            templateObj = {
                color: "#000",
                background: "#fff",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                borderWidth: "0px",
                borderColor: "#000",
                width: 150,
                height: 150,
                'text-align': "left",
                text: '',
                url: '',
                imgtitle: 'standart image',
                imgalt: 'standart image',
                'border-radius': '0px',
                videourl:'',
                videotitle:"standart video",
                videoalt:"standart video"
            };
        }
        optionsElement = $('#options');
    });


	function setSidebars(templatePage){
        	    if (templatePage==='sidebar-left') {
                    $('.es-left-sidebar').show();
                }
                else if(templatePage==='right-sidebar'){
                    $('.es-right-sidebar').show();
                }
                else{

                }
    }

/******************* Click to add ***************/
	$(document).on('click',".pointer",function() {
		$('#propModal').modal('show');
	});
    $(document).on('click','.pointer-img',function () {
		$('#imgModal').modal('show');
    });
    $(document).on('click','.pointer-video',function () {
        $('#videoModal').modal('show');
    });
/****************** /Click to open adding window ***************/


	/****************** Click to show option block ***************/
	$(document).on("contextmenu",".divClass",function(e){
		var self = $(this);
		e.preventDefault();
		$('.divClass').not(this).removeClass('active');
		$(this).addClass('active');
		currentEvent = true;
		var currentPosition = $(self).offset(),
		elemHeight = $(self).height(),
		elemBorderWidth = $(self).css('border-width').substr(0,$(self).css('border-width').indexOf('p')),
		elemWidth = $(self).width();
		setCurrentOptions(self);
		optionsElement.css({
				top: Number(currentPosition.top)+Number(elmHeight),
				left:Number(currentPosition.left)+Number(elemWidth)-100+Number(elemBorderWidth*2)+Number(elmPaddingLeft)+Number(elmPaddingRight)
			});
		optionsElement.show();
		esScrollToEl($(this));
	});
	/****************** Click to show option block ***************/

	/****************** Click to delete element ***************/
	$(document).on('click',"#delete",function(event) {
     if($('.divClass.active').parent('.videoParent').length){
         $(".divClass.active").parent('.videoParent').remove();
     }
     else{
         $(".divClass.active").remove();
     }
     optionsElement.hide();
     });
	/****************** /Click to delete element ***************/


	// Click hide option window
	$(document).on('mouseup',function(event) {
		var div = $('#options');
			if(
				!div.is(event.target) &&
				div.has(event.target).length === 0 &&
				!$('#propModal').is(event.target) &&
				$('#propModal').has(event.target).length === 0 &&
                !$('#imgModal').is(event.target) &&
                $('#imgModal').has(event.target).length === 0 &&
                !$('#videoModal').is(event.target) &&
                $('#videoModal').has(event.target).length === 0 &&
                !$('#btnModal').is(event.target) &&
                $('#btnModal').has(event.target).length === 0 &&
                !$('#inputModal').is(event.target) &&
                $('#inputModal').has(event.target).length === 0
				){
				$('.active').removeClass('active');
				div.hide();
			}

});


// propertyModal
$('#propModal').on('show.bs.modal', function (e) {
	$('#options').hide();
  var activeEl = $('.active');
  if (activeEl.length) {
  	setModalObj(
  		activeEl.css('color'),
  		activeEl.css('backgroundColor'),
  		activeEl.width(),
  		activeEl.height(),
  		activeEl.css('text-align'),
  		activeEl.find('.my-p').text(),
		activeEl.css('font-size'),
		activeEl.css('padding-top'),
		activeEl.css('padding-right'),
		activeEl.css('padding-bottom'),
		activeEl.css('padding-left'),
		activeEl.css('border-width'),
		activeEl.css('border-color'),
        '',
		'',
		'',
        activeEl.css('border-radius')
  		);
  	setModalObjZindex(
  	    activeEl.css('z-index')
    );


          setCurrentOptions(activeEl);

      modalColorElm.val(rgb2hex(modalObj.color));
      modalTextElm.val(modalObj.text);
      modalBackElm.val(rgb2hex(modalObj.background));
	  $('#modalTextAlign option[value="'+modalObj['text-align']+'"]').prop('selected',true);
	  modalWidthElm.val(elmWidth);
      modalHeightElm.val(elmHeight);
      modalPaddingLeft.val(elmPaddingLeft);
	  modalPaddingRight.val(elmPaddingRight);
	  modalPaddingTop.val(elmPaddingTop);
	  modalPaddingBottom.val(elmPaddingBot);
	  modalBorderWidth.val(elmborderWidth);
	  modalBorderColor.val(rgb2hex(modalObj.borderColor));
	  $('#zIndexBlock').val(modalObj.zindex);

	  }
  else{
	  	setModalObj(
            templateObj.color,
	  		templateObj.background,
	  		modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width,
	  		modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height,
			$('#modalTextAlign option:selected').val(),
	  		modalTextElm.val().length ? modalTextElm.val() :templateObj.text,
	  		modalTextSize.val().length ? modalTextSize.val() : '16',
            modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
            modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
            modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
            modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
			modalBorderWidth.val().length ? modalBorderWidth.val() : templateObj.borderWidth,
			templateObj.borderColor,
			templateObj.url,
            templateObj.imgtitle,
      		templateObj.imgalt,
            templateObj['border-radius']
		);
      setModalObjZindex(
          $('#zIndexBlock').val().length ? $('#zIndexBlock').val() : '1'
      );
  }
  console.log(modalObj);
});

$('#propModal').on('hide.bs.modal', function(){
	$('.active').removeClass('active');
	$('#options').hide();
});

// img modal
$('#imgModal').on('show.bs.modal', function (e) {
    $('#options').hide();
    var activeEl = $('.active');
    if (activeEl.length) {
        setModalObj(
            activeEl.css('color'),
            activeEl.css('backgroundColor'),
            activeEl.width(),
            activeEl.height(),
            activeEl.css('text-align'),
            activeEl.find('.my-p').text(),
            activeEl.css('font-size'),
            activeEl.css('padding-top'),
            activeEl.css('padding-right'),
            activeEl.css('padding-bottom'),
            activeEl.css('padding-left'),
            activeEl.css('border-width'),
            activeEl.css('border-color'),
            activeEl.attr('src'),
            activeEl.attr('title'),
            activeEl.attr('alt')
        );
        setModalObjZindex(activeEl.css('z-index'));
        $('#imgUrl').val(modalObj.url);
        $('#imgModalWidth').val(modalObj.width);
        $('#imgModalHeight').val(modalObj.height);
        $('#imgAlt').val(modalObj.imgalt);
        $('#imgTitle').val(modalObj.imgtitle);
        $('#zIndexImg').val(modalObj.zIndex);
    }
    else{
        setModalObj(
            templateObj.color,
            templateObj.background,
            modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width,
            modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height,
            $('#modalTextAlign option:selected').val(),
            modalTextElm.val().length ? modalTextElm.val() :templateObj.text,
            modalTextSize.val().length ? modalTextSize.val() : 16,
            modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
            modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
            modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
            modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
            modalBorderWidth.val().length ? modalBorderWidth.val() : templateObj.borderWidth,
            templateObj.borderColor,
            templateObj.url,
            templateObj.imgtitle,
            templateObj.imgalt,
            templateObj['border-radius']
        );
        setModalObjZindex(
            $('#zIndexImg').val().length ?  $('#zindeximg').val(): '1'
        )
    }
});
    $('#imgModal').on('hide.bs.modal', function(){
        $('#options').hide();
        $('.active').removeClass('active');
    });

    // videoModal
    $('#videoModal').on('show.bs.modal', function (e) {
        $('#options').hide();
        var activeEl = $('.active');
        if (activeEl.length) {
            setVideoOpt(
                activeEl.width(),
                activeEl.height(),
                $('#videoUrl').attr('video-src'),
                activeEl.attr('alt'),
                activeEl.attr('title')
            );

            console.log(activeEl.attr('src'));
            setModalObjZindex(activeEl.css('z-index'));
            $('#videoUrl').val('');
            $('#videoModalWidth').val(videoObj.width);
            $('#videoModalHeight').val(videoObj.height);
            $('#videoAlt').val(videoObj.videoalt);
            $('#videoTitle').val(videoObj.videotitle);
            $('#zIndexVideo').val(videoObj.zIndex);
        }
        else{
            setVideoOpt(
            $('#videoModalWidth').val().length ? $('#videoModalWidth').val() : templateObj.width,
            $('#videoModalHeight').val().length ? $('#videoModalHeight').val() : templateObj.height,
                $('#videoUrl').val().length ? $('#videoUrl').val() : templateObj.videourl,
            $('#videoAlt').val().length ? $('#videoAlt').val() : templateObj.videoalt,
            $('#videoTitle').val().length  ? $('#videoTitle').val() : templateObj.videotitle
            );

            setModalObjZindex(
                $('#zIndexVideo').val().length ?  $('#zIndexVideo').val(): '1'
            )
        }
    });
    $('#videoModal').on('hide.bs.modal', function(){
        $('#options').hide();
        $('.active').removeClass('active');
    });


/*********************** modalSave ***************************/

$('.modalSave').click(function() {
	if ($('.active').length) {
		$('.active').css({
					background:  modalBackElm.val(),
					color: modalColorElm.val(),
					width: modalWidthElm.val(),
					height: modalHeightElm.val(),
					'text-align': $('#modalTextAlign option:selected').val(),
                    'font-size': $('#modalTextSize').val()+'px',
					padding: modalPaddingTop.val()+'px '+modalPaddingRight.val()+'px '+modalPaddingBottom.val()+'px '+modalPaddingLeft.val()+'px',
					border: modalBorderWidth.val()+'px solid '+ modalBorderColor.val(),
                    'z-index': $('#zIndexBlock').val()
				});
		$('.active .my-p').text(modalTextElm.val());
	}
	else{
        console.log('before modalSaveFunc templateObj',templateObj);
        console.log('before modalSaveFunc modalObj',modalObj);
        setModalObj(
            templateObj.color,
            templateObj.background,
            modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width,
            modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height,
            $('#modalTextAlign option:selected').val(),
            modalTextElm.val().length ? modalTextElm.val() :templateObj.text,
            modalTextSize.val().length ? modalTextSize.val() : '16',
            modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
            modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
            modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
            modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
            modalBorderWidth.val().length ? modalBorderWidth.val() : templateObj.borderWidth,
            templateObj.borderColor,
            templateObj.url,
            templateObj.imgtitle,
            templateObj.imgalt,
            templateObj['border-radius']
        );
        setModalObjZindex(
            $('#zIndexBlock').val().length ? $('#zIndexBlock').val() : '1'
        );
        console.log('after modalSaveFunc templateObj',templateObj);
        console.log('after modalSaveFunc modalObj',modalObj);
		;


		$(".wrapper").append("<div class = 'divClass div-count-"+divcount+"'><p class = 'my-p'>"+modalObj.text+"</p></div>");
		$(".div-count-"+divcount+"").css({
            background:  modalObj.background,
            color: modalObj.color,
            width: modalObj.width,
            height: modalObj.height,
            'font-size': modalObj.textSize+'px',
            'text-align': modalObj['text-align'],
			padding: ''+modalObj.paddingTop+'px '+modalObj.paddingRight+'px '+modalObj.paddingBottom+'px '+modalObj.paddingLeft+'px',
            border: ''+modalObj.borderWidth+'px solid '+modalObj.borderColor,
			zIndex : modalObj.zIndex,
			'border-radius': modalObj['border-radius'],
		});

        addDraggable(divcount, 'block');

		divcount++;
	}
});

    /*********************** /modalSave ***************************/

    /*********************** imgModalSave ************************/

    $('.imgModalSave').on('click',function () {
        var activeEl = $('.active');
        if (activeEl.length) {
            console.log(activeEl);
            activeEl.width($('#imgModalWidth').val());
            activeEl.height($('#imgModalHeight').val());
            activeEl.parent().width($('#imgModalWidth').val());
            activeEl.parent().height($('#imgModalHeight').val());
            activeEl.attr({
                src: $('#imgUrl').val().length>1 ?  $('#imgUrl').val() :  $('#imgUrl').attr('img-src'),
                alt: $('#imgAlt').val(),
                title: $('#imgTitle').val()
            })
            activeEl.css({
                'z-index': $('#zIndexImg').val()
            });
            activeEl.parent().css({
                'z-index': $('#zIndexImg').val()
            })
        }
        else{
            console.log('img element prev',modalObj, templateObj);
            setModalObj(
                templateObj.color, //color
                templateObj.background, //bg
                modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width, //width
                modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height, //height
                $('#modalTextAlign option:selected').val(), //textalign
                modalTextElm.val().length ? modalTextElm.val() :templateObj.text, //text
                '',
                modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
                modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
                modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
                modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
                modalBorderWidth.val().length ? modalBorderWidth.val() : templateObj.borderWidth,
                templateObj.borderColor,
                $('#imgUrl').attr('img-src'),
                templateObj.imgtitle,
                templateObj.imgalt,
                templateObj['border-radius']
            );
            console.log('img element',modalObj,templateObj);
            setModalObjZindex(
                $('#zIndexImg').val().length ? $('#zIndexImg').val() : '1'
            )
            ;
            console.log(modalObj);
            $(".wrapper").append("<div class='imgParent'><img class = 'divClass div-count-"+divcount+" imgElm' data-type='img' /></div>");
            $(".div-count-"+divcount+"").css({
                width: modalObj.width,
                height: modalObj.height,
                'z-index': modalObj.zIndex
            });
            if (modalObj.url.length>2){
                $(".div-count-"+divcount+"").attr({
                    alt: modalObj.imgalt,
                    title: modalObj.imgtitle,
                    src: modalObj.url
                });
			}
			else{
                $(".div-count-"+divcount+"").attr({
                    alt: modalObj.imgalt,
                    title: modalObj.imgtitle,
                    src: 'image'
                });
			}

            var divCount =  $(".div-count-"+divcount+"");
            divCount.parent('.imgParent').draggable({
                scroll: true,
                /*containment: 'html',*/
                start: function(){
                    $(this).addClass('dragging');
                },
                stop: function(){
                    $(this).removeClass('dragging');
                }
            });
            divCount.resizable();

            divcount++;
            $('#imgUrl').attr('img-src','');
        }
    });
    /*********************** /imgModalSave ***********************/



    /*********************** videoModalSave ************************/

    $('.videoModalSave').on('click',function () {
        var activeEl = $('.active');
        if (activeEl.length) {
            console.log(activeEl);
            activeEl.width($('#videoModalWidth').val());
            activeEl.height($('#videoModalHeight').val());
            activeEl.parent().width($('#videoModalWidth').val());
            activeEl.parent().height($('#videoModalHeight').val());
            activeEl.attr({
                src: $('#videoUrl').val().length>1 ?  $('#videoUrl').val() :  $('#videoUrl').attr('video-src'),
                alt: $('#videoAlt').val(),
                title: $('#videoTitle').val()
            })
            activeEl.css({
                'z-index': $('#zIndexVideo').val()
            });
            activeEl.parent().css({
                'z-index': $('#zIndexVideo').val()
            })
        }
        else{
            setVideoOpt(
                $('#videoModalWidth').val().length ? $('#videoModalWidth').val() : templateObj.width,
                $('#videoModalHeight').val().length ? $('#videoModalHeight').val() : templateObj.height,
                $('#videoUrl').val().length ? $('#videoUrl').val() :  $('#videoUrl').attr('video-src'),
                $('#videoAlt').val().length ? $('#videoAlt').val() : templateObj.videoalt,
                $('#videoTitle').val().length  ? $('#videoTitle').val() : templateObj.videotitle
            );

            setModalObjZindex(
                $('#zIndexVideo').val().length ?  $('#zIndexVideo').val(): '1'
            )
            ;
            console.log(videoObj);
            $(".wrapper").append("<div class='videoParent'>" +
                "<video class = 'divClass div-count-"+divcount+" videoElm' data-type='video' >" +
                "<source type='video/mp4'>"+
                "</video></div>");
            $(".div-count-"+divcount+"").css({
                width: videoObj.width,
                height: videoObj.height,
                'z-index': modalObj.zIndex
            });
            if (videoObj.videourl && videoObj.videourl.length>2){
                $(".div-count-"+divcount+"").attr({
                    alt: videoObj.imgalt,
                    title: videoObj.imgtitle
                });
                $(".div-count-"+divcount+" source").attr({
                    src: videoObj.videourl
                });
            }
            else{
                $(".div-count-"+divcount+"").attr({
                    alt: modalObj.imgalt,
                    title: modalObj.imgtitle
                });
                $(".div-count-"+divcount+" source").attr({
                    src: 'video'
                });
            }

            var divCount =  $(".div-count-"+divcount+"");
            divCount.parent('.videoParent').draggable({
                scroll: true,
                /*containment: 'html',*/
                start: function(){
                    $(this).addClass('dragging');
                },
                stop: function(){
                    $(this).removeClass('dragging');
                }
            });
            divCount.parent('.videoParent').resizable();

            divcount++;
        }
    });

    /*********************** /videoModalSave ***********************/


    $(document).on('click','#properties',function () {
        setCurrentPropModal();
    });
function esScrollToEl(name,time = 0.5){
	 $([document.documentElement, document.body]).animate({
        scrollTop: $(name).offset().top
    }, time*1000);
}

function setModalObj(color,bg,width,height,textalign,text,textSize,paddingTop,paddingRight,paddingBottom,paddingLeft,borderWidth,borderColor, url='', title = 'image', alt = 'image',borderRadius='0px' ){
	console.log('modalObj prev',modalObj);
    modalObj.color= color;
	  	modalObj.background= bg;
	  	modalObj.width= width;
	  	modalObj.height= height;
	  	modalObj['text-align']= textalign;
	  	modalObj.text= text;
	  	modalObj.textSize = textSize;
    	modalObj.paddingTop = paddingTop;
    	modalObj.paddingRight = paddingRight;
    	modalObj.paddingBottom = paddingBottom;
    	modalObj.paddingLeft = paddingLeft;
    	modalObj.borderWidth = borderWidth;
    	modalObj.borderColor = borderColor;
    	modalObj.url = url;
    	modalObj.imgtitle = title;
    	modalObj.imgalt = alt;
    	modalObj['border-radius']=borderRadius;
    console.log('modalObj after',modalObj);
}

function setVideoOpt(width,height,url,alt,title) {
    videoObj.width=width;
    videoObj.height=height;
    videoObj.videourl = url;
    videoObj.videotitle = title;
    videoObj.videoalt = alt;
}


function setCurrentOptions(activeEl){
    	elmborderWidth = activeEl.css('border-width').substring(0, activeEl.css('border-width').lastIndexOf('p'));
        elmPaddingLeft = activeEl.css('padding-left').substring(0, activeEl.css('padding-left').lastIndexOf('p'));
        elmPaddingRight = activeEl.css('padding-right').substring(0, activeEl.css('padding-right').lastIndexOf('p'));
        elmPaddingTop = activeEl.css('padding-right').substring(0, activeEl.css('padding-right').lastIndexOf('p'));
        elmPaddingBot = activeEl.css('padding-right').substring(0, activeEl.css('padding-right').lastIndexOf('p'));
    	elmWidth = Number(activeEl.width())+Number(elmPaddingLeft)+Number(elmPaddingRight)+(Number(elmborderWidth*2));
        elmHeight = Number(activeEl.height())+Number(elmPaddingTop)+Number(elmPaddingBot)+(Number(elmborderWidth*2));
}



$('#getImgBtn').change(function (e) {
    var type_reg = /^image\/(jpg|png|jpeg|bmp|gif|ico)$/,
	imgFile = this.files[0];
	if (!type_reg.test(imgFile.type)){
        alert('Вы можете выбрать только картинку из папки images в корне проекта');
        this.value='';
        return false;
	}
	else{
        var reader  = new FileReader(),
            result = '';
        reader.onloadend = function () {
            $('#imgUrl').attr('img-src',reader.result);
        }
        reader.readAsDataURL(imgFile);
	/*	var hrefUrl = window.location.pathname;
        hrefUrl = hrefUrl.substr(0,hrefUrl.lastIndexOf('/'));
        hrefUrl += "/images/"+imgFile.name;
        $('#imgUrl').val(hrefUrl);*/
	}
});

    $('#getVideoBtn').change(function (e) {
        var type_reg = /^video\/(mp4)$/,
            videoFile = this.files[0];
        if (!type_reg.test(videoFile.type)){
            console.log(videoFile.type)
            alert('Вы можете выбрать только Видео');
            this.value='';
            return false;
        }
        else{
            var reader  = new FileReader(),
                result = '';
            reader.onloadend = function () {
                $('#videoUrl').attr('video-src',reader.result);
            }
            reader.readAsDataURL(videoFile);
        }
    });



    modalColorElm.change(function () {
        templateObj.color = modalColorElm.val();
    });
    modalBackElm.change(function () {
        templateObj.background = modalBackElm.val();
    });
    modalBorderColor.change(function () {
        templateObj.borderColor = modalBackElm.val();
    });

    $(document).on('keyup','input[type="number"]', function (e) {
        let $this = $(this),
            currentValue = $this.val(),
            maxValue = $this.attr('max');
            if (e.keyCode!==8)
                if(currentValue.length<=0 || parseFloat(currentValue) > parseFloat(maxValue))
                    $this.val(currentValue.substr(0,currentValue.length-1));
    })

     window.onscroll = function () {
        if($(".div-count-"+(divcount-1)+"").length<=0){
            return false;
        }
         console.log('scroll',$(".div-count-"+(divcount-1)+"").offset().top+$(".div-count-"+(divcount-1)+"").height(), $('body').height());
         $('body').height($(document).height());
     };
});
