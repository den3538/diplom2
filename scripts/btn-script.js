/**
 * Created by Really on 18.09.2018.
 */

var btnObject = {
    height: null,
    width: null,
    title: null,
    background: null,
    color: null,
    text: null
};

$(document).on('click','.pointer-btn',function () {
    $('#btnModal').modal('show');
});


$('#btnModal').on('hide.bs.modal', function(){
    $('.active').removeClass('active');
    $('#options').hide();
});

$('#btnModal').on('show.bs.modal', function () {
    $('#options').hide();
    var activeEl = $('.active');
    if (activeEl.length) {
        setBtnOpt(
            activeEl.width(),
            activeEl.height(),
            $('#btnTitle').attr('title'),
            activeEl.css('backgroundColor'),
            activeEl.css('color'),
            activeEl.text()
        );

        setModalObjZindex(activeEl.css('z-index'));
        $('#btnModalWidth').val(btnObject.width);
        $('#btnModalHeight').val(btnObject.height);
        $('#btnTitle').val(btnObject.title);
        $('#btnBackColor').val(rgb2hex(btnObject.background));
        $('#btnColor').val(rgb2hex(btnObject.color));
        $('#btnText').val(btnObject.text);
    }
    else{
        setBtnOpt(
            $('#btnModalWidth').val().length ? $('#btnModalWidth').val() : templateObj.width,
            $('#btnModalHeight').val().length ? $('#btnModalHeight').val() : templateObj.height,
            $('#btnTitle').val().length ? $('#btnTitle').val() : 'Это кнопка',
            templateObj.background,
            templateObj.color,
            $('#btnText').val().length>1 ? $('#btnText').val(): 'Кнопка'
        );

        setModalObjZindex(
            $('#zIndexbtn').val().length ?  $('#zIndexbtn').val(): '1'
        )
    }
});


$('.btnModalSave').on('click',function () {
    var activeEl = $('.active');
    if (activeEl.length) {
        activeEl.width($('#btnModalWidth').val());
        activeEl.height($('#btnModalHeight').val());
        activeEl.attr('title', $('#btnTitle').val());
        activeEl.css({
            'z-index': $('#zIndexbtn').val(),
            'background': $('#btnBackColor').val(),
            'color':  $('#btnColor').val(),
            'border-radius': templateObj['border-radius'],
            'border-width': 0
        });
        activeEl.text($('#btnText').val());
        console.log('btnEl',activeEl);

    }
    else{
        setBtnOpt(
            $('#btnModalWidth').val().length ? $('#btnModalWidth').val() : templateObj.width,
            $('#btnModalHeight').val().length ? $('#btnModalHeight').val() : templateObj.height,
            $('#btnTitle').val().length ? $('#btnTitle').val() : 'Это кнопка',
            templateObj.background,
            templateObj.color,
            $('#btnText').val().length>1 ? $('#btnText').val(): 'Кнопка'
        );

        setModalObjZindex(
            $('#zIndexbtn').val().length ?  $('#zIndexbtn').val(): '1'
        )
        ;
        console.log(btnObject);
        $(".wrapper").append("<div class='btnParent'><button class = 'divClass div-count-"+divcount+" btnElem' data-type='btn' ></button></div>");
        $(".div-count-"+divcount+"").css({
            width: btnObject.width,
            height: btnObject.height,
            'z-index': modalObj.zIndex,
            background: btnObject.background,
            color: btnObject.color,
            'border-radius': templateObj['border-radius'],
            'border-width': 0
        });

        $(".div-count-"+divcount+"").attr('title',btnObject.title);

        var divCount =  $(".div-count-"+divcount+"");

        divCount.text(btnObject.text);
        divCount.attr('data-type', 'btn');
        divCount.parent('.btnParent').css({
            left: 0,
            top: 110,
            position: 'absolute',
        });
        divCount.parent('.btnParent').draggable({
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



function setBtnOpt(width,height,title,background,color,text) {
    btnObject.width=width;
    btnObject.height=height;
    btnObject.title = title;
    btnObject.background = background;
    btnObject.color = color;
    btnObject.text = text;
}

$('#btnBackColor').change(function () {
    templateObj.background = $(this).val();
});
$('#btnColor').change(function () {
    templateObj.color = $(this).val();
});