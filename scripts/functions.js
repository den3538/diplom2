/**
 * Created by Really on 18.09.2018.
 */

var  divcount=0;

templateObj = {};
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
    textSize: null,
    url: '',
    imgtitle: 'image',
    imgalt: 'image',
    'border-radius': '0px'
};


function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function setModalObjZindex(zIndex) {
    modalObj.zindex = zIndex;
}

function setCurrentPropModal() {
    var dataType = $('.active').data('type');
    switch (dataType){
        case 'block':
            $('#propModal').modal('show');
            break;
        case 'img':
            $('#imgModal').modal('show');
            break;
        case 'video':
            $('#videoModal').modal('show');
            break;
        case 'btn':
            $('#btnModal').modal('show');
            break;
        case 'input':
            $('#inputModal').modal('show');
    }
};

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