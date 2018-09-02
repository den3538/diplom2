$(document).ready(function() {
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
                    imgalt: 'image'
				  };
			;
/******************* /Variables ***************/

/******************* Click to add ***************/
	$(".pointer").click(function() {
		$('#propModal').modal('show');
	});
	$('.pointer-img').click(function () {
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
	$("#delete").click(function(event) {
		$(".divClass.active").remove();
		optionsElement.hide();
	});
	/****************** /Click to delete element ***************/


	// Click hide option window
	$(document).on('mouseup',function(event) {
		div = $('#options');
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
		activeEl.css('border-color')
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
            modalColorElm.val().length ? modalColorElm.val() : '#000',
	  		modalBackElm.val().length ? modalBackElm.val() : '#fff',
	  		modalWidthElm.val().length ? modalWidthElm.val() : 300,
	  		modalHeightElm.val().length ? modalHeightElm.val() : 300,
			$('#modalTextAlign option:selected').val(),
	  		modalTextElm.val().length ? modalTextElm.val() :'',
            modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
            modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
            modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
            modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
			modalBorderWidth.val().length ? modalBorderWidth.val() : '0',
			modalBorderColor.val().length ? modalBorderColor.val() : '#000'
		);
  }
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
            modalColorElm.val().length ? modalColorElm.val() : '#000',
            modalBackElm.val().length ? modalBackElm.val() : '#fff',
            $('#imgModalWidth').val().length ? $('#imgModalWidth').val() : 300,
            $('#imgModalHeight').val().length ?  $('#imgModalHeight').val() : 300,
            $('#modalTextAlign option:selected').val(),
            modalTextElm.val().length ? modalTextElm.val() :'',
            modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
            modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
            modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
            modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
            modalBorderWidth.val().length ? modalBorderWidth.val() : '0',
            modalBorderColor.val().length ? modalBorderColor.val() : '#000',
            $('#imgUrl').val().length ? $('#imgUrl').val() : '',
            $('#imgTitle').val().length ? $('#imgTitle').val() : '',
            $('#imgAlt').val().length ? $('#imgAlt').val() : ''
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
		setModalObj(
            modalColorElm.val().length ? modalColorElm.val() : '#000',
            modalBackElm.val().length ? modalBackElm.val() : '#fff',
            modalWidthElm.val().length ? modalWidthElm.val() : 300,
            modalHeightElm.val().length ? modalHeightElm.val() : 300,
            $('#modalTextAlign option:selected').val(),
            modalTextElm.val().length ? modalTextElm.val() :'',
            modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
            modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
            modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
            modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
            modalBorderWidth.val().length ? modalBorderWidth.val() : '0',
            modalBorderColor.val().length ? modalBorderColor.val() : '#000'
		)
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
			zIndex : divcount
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
                modalColorElm.val().length ? modalColorElm.val() : '#000',
                modalBackElm.val().length ? modalBackElm.val() : '#fff',
                $('#imgModalWidth').val().length ? $('#imgModalWidth').val() : 300,
                $('#imgModalHeight').val().length ?  $('#imgModalHeight').val() : 300,
                $('#modalTextAlign option:selected').val(),
                modalTextElm.val().length ? modalTextElm.val() :'',
                modalPaddingTop.val().length ? modalPaddingTop.val() :'0',
                modalPaddingRight.val().length ? modalPaddingRight.val() :'0',
                modalPaddingBottom.val().length ? modalPaddingBottom.val() :'0',
                modalPaddingLeft.val().length ? modalPaddingLeft.val() :'0',
                modalBorderWidth.val().length ? modalBorderWidth.val() : '0',
                modalBorderColor.val().length ? modalBorderColor.val() : '#000',
                $('#imgUrl').val().length ? $('#imgUrl').val() : '',
                $('#imgTitle').val().length ? $('#imgTitle').val() : 'Подсказка',
                $('#imgAlt').val().length ? $('#imgAlt').val() : 'Картинка'
            )
            ;

            $(".wrapper").append("<div class='imgParent'><img class = 'divClass div-count-"+divcount+" imgElm' data-type='img' /></div>");
            $(".div-count-"+divcount+"").css({
                width: modalObj.width,
                height: modalObj.height
            });
            $(".div-count-"+divcount+"").attr({
                alt: modalObj.imgalt,
                title: modalObj.imgtitle
            });
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

    $('#properties').click(function () {
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

function setModalObj(color,bg,width,height,textalign,text,paddingTop,paddingRight,paddingBottom,paddingLeft,borderWidth,borderColor, url='', title = 'image', alt = 'image'){
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

});