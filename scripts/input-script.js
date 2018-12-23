/**
 * Created by Really on 18.09.2018.
 */

/**
 * Created by Really on 18.09.2018.
 */

var inputObject = {
    height: null,
    width: null,
    placeholder: null,
    title: null,
    pl: null,
    color: null
};

$(document).on('click','.pointer-input',function () {
    $('#inputModal').modal('show');
});


$('#inputModal').on('hide.bs.modal', function(){
    $('.active').removeClass('active');
    $('#options').hide();
});

$('#inputModal').on('show.bs.modal', function () {
    $('#options').hide();
    var activeEl = $('.active');
    if (activeEl.length) {
        setInpOpt(
            activeEl.width(),
            activeEl.height(),
            $('#inputPlaceholder').attr('placeholder'),
            $('#inputTitle').attr('title'),
            activeEl.css('padding-left'),
            activeEl.css('color')
        );

        setModalObjZindex(activeEl.css('z-index'));
        $('#inputModalWidth').val(inputObject.width);
        $('#inputModalHeight').val(inputObject.height);
        $('#inputPlaceholder').val(inputObject.placeholder);
        $('#inputTitle').val(inputObject.title);
        $('#inputPDleft').val((inputObject.pl));
        $('#inputColor').val(inputObject.color);
    }
    else{
        setInpOpt(
            $('#inputModalWidth').val().length ? $('#inputModalWidth').val() : templateObj.width,
            $('#inputModalHeight').val().length ? $('#inputModalHeight').val() : templateObj.height,
            $('#inputPlaceholder').val().length ? $('#inputPlaceholder').val() : 'Поле ввода',
            $('#inputTitle').val().length ? $('#inputTitle').val() : 'Поле ввода',
            $('#inputPDleft').val().length ? $('#inputPDleft').val() : '10',
            $('#inputColor').val(inputObject.color)
        );

        setModalObjZindex(
            $('#zIndexinput').val().length ?  $('#zIndexinput').val(): '1'
        )
    }
});


$('.inputModalSave').on('click',function () {
    var activeEl = $('.active');
    if (activeEl.length) {
        activeEl.width($('#inputModalWidth').val());
        activeEl.height($('#inputModalHeight').val());
        activeEl.attr('title', $('#inputTitle').val());
        activeEl.attr('placeholder', $('#inputPlaceholder').val());
        activeEl.css({
            'z-index': $('#zIndexinput').val(),
            'color':  $('#inputColor').val(),
            'border-radius': templateObj['border-radius'],
            'border-width': templateObj.borderWidth,
            'padding-left': ($('#inputPDleft').val().length<1) ? 5+'px' : $('#inputPDleft').val()+'px'
        });
        console.log('inputEl',activeEl,$('#inputPDleft').val());

    }
    else{
        setInpOpt(
            $('#inputModalWidth').val().length ? $('#inputModalWidth').val() : templateObj.width,
            $('#inputModalHeight').val().length ? $('#inputModalHeight').val() : templateObj.height,
            $('#inputPlaceholder').val().length ? $('#inputPlaceholder').val() : 'Поле ввода',
            $('#inputTitle').val().length ? $('#inputTitle').val() : 'Поле ввода',
            $('#inputPDleft').val().length ? $('#inputPDleft').val() : '10',
            templateObj.color
        );

        setModalObjZindex(
            $('#zIndexinput').val().length ?  $('#zIndexinput').val(): '1'
        )
        ;
        $(".wrapper").append("<div class='inputParent'><input class = 'divClass div-count-"+divcount+" inputElem' type='text' data-type='input' ></div>");
        $(".div-count-"+divcount+"").css({
            width: inputObject.width,
            height: inputObject.height,
            'z-index': modalObj.zIndex,
            color: $('#inputColor').val(),
            'padding-left': inputObject.pl+'px',
            'border-radius': templateObj['border-radius'],
            'border-width': templateObj.borderWidth
        });

        $(".div-count-"+divcount+"").attr('title',inputObject.title);
        $(".div-count-"+divcount+"").attr('placeholder',inputObject.placeholder);

        var divCount =  $(".div-count-"+divcount+"");

        divCount.text(btnObject.text);
        divCount.attr('data-type', 'input');
        divCount.parent('.inputParent').css({
            left: 0,
            top: 110,
            position: 'absolute'
        })
        divCount.parent('.inputParent').draggable({
            scroll: true,
            /*containment: 'html',*/
            start: function(){
                $(this).addClass('dragging');
            },
            stop: function(){
                $(this).removeClass('dragging');
            }
        });
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
        divcount++;
    }
});



function setInpOpt(width,height,placeholder,title,pl,color) {
    inputObject.width=width;
    inputObject.height=height;
    inputObject.placeholder = placeholder;
    inputObject.title = title;
    inputObject.pl = pl;
    inputObject.color = color;
}


$('#inputColor').change(function () {
    templateObj.color = $(this).val();
});
