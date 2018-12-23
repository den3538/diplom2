/**
 * Created by Really on 30.10.2018.
 */
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];
var quillAraay = [];


var ToolbarEvents = function () {
    function getCollection(){
        return document.querySelectorAll('.ql-toolbar');
    }

    function checkElement(element) {
        return element.style.display == 'none';
    }

    this.toggleDisplay = function () {
        var allCollection = getCollection();

        allCollection.forEach(function (value) {
            value.style.display = checkElement(value) ? 'block' :  'none';
        })
    };

    this.addNewQuill = function (counter) {
        var classCounter = '.text-count-'+counter+'';
        console.log(classCounter);
        quillAraay.push(new Quill(classCounter, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow',
            placeholder: 'Enter your text'
        }));
    };

};

$(function () {
    var textPointerObject = new ToolbarEvents();

    $(document).on('click','.pointer-text',function () {
        $(".wrapper").append(
            '<div class="test-text-wrapper divClass">' +
                '<div class="test-text-container text-count-'+quillAraay.length+'" data-number="'+quillAraay.length+'">'+'</div>' +
            '<button class="btn btn-primary save-text">Сохранить</button>'+
            '</div>');
        textPointerObject.addNewQuill(quillAraay.length);
        var currentElement =  $(quillAraay[quillAraay.length-1].container).parent('.test-text-wrapper');
        currentElement.draggable({
            scroll: false,
            /*containment: 'html',*/
            start: function(){
                $(this).addClass('dragging');
            },
            stop: function(){
                $(this).removeClass('dragging');
            }
        });
        currentElement.resizable();
    });
    
    $(document).on('click','.test-text-wrapper',function () {
        var self = this;
        $(this).draggable('disable');
        $(this).find('.ql-editor').blur(function (e) {
            e.preventDefault();
            console.log('я родился');
            $(self).draggable('enable');
            e.stopPropagation();
            e.stopImmediatePropagation();
        });
    });


    $(document).on('click','.save-text',function (e) {
       var elmToRemove = $(this).siblings('.test-text-container').data('number');
       quillAraay[elmToRemove].disable();
       $(this).parents('.test-text-wrapper').draggable('enable').css({
           'background':'transparent',
           'overflow':'hidden',
           'height': 'auto',
           left: 0,
           top: 110,
           position: 'absolute',
           'width': 'auto',
           'cursor': 'pointer'
       }).resizable('disable').removeClass('ui-state-disabled');
       $(this).siblings('.ql-toolbar').remove();
       $(this).remove();
       e.preventDefault();
       e.stopPropagation();
       e.stopImmediatePropagation();
    });
});

