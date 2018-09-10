$(document).ready(function() {
    var body = $('body'),
		templateObj = {};
    /******************* Variables ***************/
    $("#img").resizable();
    var zIndex = 1,
        currentEvent = false,
        divcount=0,
        blockClickEvent = true,
        optionsElement = $('#options'),
        optionsElementBtnDel = $('#options #delete button'),
        modalColorElm = $('#modalColor'),
        modalTextElm = $('#modalText'),
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
        modalObj = {
            color: null,
            background: null,
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
            borderWidth: null,
            borderColor: null,
            width: null,
            height: null,
            'text-align': null,
            text: null,
            url: '',
            imgtitle: 'image',
            imgalt: 'image',
            'border-radius': '0px'
        };
    ;
    /******************* /Variables ***************/
var templateId= null;
	$(document).on('click','.template-btn',function () {
		$('.wrapper').html(clone2);
        templateId = $(this).attr('id');
        console.log(templateId);
        if(templateId === 'minimal-template'){
            body.css('background','linear-gradient(to top, #1e5799 0%,#207cca 39%,#2989d8 58%,#2989d8 58%,#7db9e8 100%)');
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
				'border-radius': '3px'
            };
            ;
		}
		else if(templateId === 'gotik-template'){
            body.css('background','#e9e9e9');
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
                'border-radius': '0px'
            };
		}
		else{
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
                'border-radius': '0px'
            };
		}
        optionsElement = $('#options');
    });



/******************* Click to add ***************/
	$(document).on('click',".pointer",function() {
		$('#propModal').modal('show');
	});
    $(document).on('click','.pointer-img',function () {
		$('#imgModal').modal('show');
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
		$(".divClass.active").remove();
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
                $('#imgModal').has(event.target).length === 0
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

	  }
  else{
	  	setModalObj(
            templateObj.color,
	  		templateObj.background,
	  		modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width,
	  		modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height,
			$('#modalTextAlign option:selected').val(),
	  		modalTextElm.val().length ? modalTextElm.val() :templateObj.text,
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
        $('#imgUrl').val(modalObj.url);
        $('#imgModalWidth').val(modalObj.width);
        $('#imgModalHeight').val(modalObj.height);
        $('#imgAlt').val(modalObj.imgalt);
        $('#imgTitle').val(modalObj.imgtitle);
    }
    else{
        setModalObj(
            templateObj.color,
            templateObj.background,
            modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width,
            modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height,
            $('#modalTextAlign option:selected').val(),
            modalTextElm.val().length ? modalTextElm.val() :templateObj.text,
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
    }
});
    $('#imgModal').on('hide.bs.modal', function(){
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
					padding: modalPaddingTop.val()+'px '+modalPaddingRight.val()+'px '+modalPaddingBottom.val()+'px '+modalPaddingLeft.val()+'px',
					border: modalBorderWidth.val()+'px solid '+ modalBorderColor.val()
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
        console.log('after modalSaveFunc templateObj',templateObj);
        console.log('after modalSaveFunc modalObj',modalObj);
		;


		$(".wrapper").append("<div class = 'divClass div-count-"+divcount+"'><p class = 'my-p'>"+modalObj.text+"</p></div>");
		$(".div-count-"+divcount+"").css({
            background:  modalObj.background,
            color: modalObj.color,
            width: modalObj.width,
            height: modalObj.height,
            'text-align': modalObj['text-align'],
			padding: ''+modalObj.paddingTop+'px '+modalObj.paddingRight+'px '+modalObj.paddingBottom+'px '+modalObj.paddingLeft+'px',
            border: ''+modalObj.borderWidth+'px solid '+modalObj.borderColor,
			zIndex : divcount,
			'border-radius': modalObj['border-radius']
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
                src: $('#imgUrl').val(),
                alt: $('#imgAlt').val(),
                title: $('#imgTitle').val()
            })
        }
        else{
            setModalObj(
                templateObj.color,
                templateObj.background,
                modalWidthElm.val().length ? modalWidthElm.val() : templateObj.width,
                modalHeightElm.val().length ? modalHeightElm.val() : templateObj.height,
                $('#modalTextAlign option:selected').val(),
                modalTextElm.val().length ? modalTextElm.val() :templateObj.text,
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
            )
            ;

            $(".wrapper").append("<div class='imgParent'><img class = 'divClass div-count-"+divcount+" imgElm' data-type='img' /></div>");
            $(".div-count-"+divcount+"").css({
                width: modalObj.width,
                height: modalObj.height
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
        }
    });
    /*********************** /imgModalSave ***********************/

    function setCurrentPropModal() {
        var dataType = $('.active').data('type');
        switch (dataType){
            case 'block':
                $('#propModal').modal('show');
                break;
            case 'img':
                $('#imgModal').modal('show');
                break;
        }
    };

    $(document).on('click','#properties',function () {
        setCurrentPropModal();
    });
function esScrollToEl(name,time = 0.5){
	 $([document.documentElement, document.body]).animate({
        scrollTop: $(name).offset().top
    }, time*1000);
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function setModalObj(color,bg,width,height,textalign,text,paddingTop,paddingRight,paddingBottom,paddingLeft,borderWidth,borderColor, url='', title = 'image', alt = 'image',borderRadius='0px' ){
		modalObj.color= color;
	  	modalObj.background= bg;
	  	modalObj.width= width;
	  	modalObj.height= height;
	  	modalObj['text-align']= textalign;
	  	modalObj.text= text;
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

function addDraggable(divcount, dataType) {
	var divCount =  $(".div-count-"+divcount+"");
        divCount.attr('data-type', dataType);
        divCount.draggable({
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
		var hrefUrl = window.location.pathname;
        hrefUrl = hrefUrl.substr(0,hrefUrl.lastIndexOf('/'));
        hrefUrl += "/images/"+imgFile.name;
        $('#imgUrl').val(hrefUrl);
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

});