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
quillAraay.push(new Quill('.test-text-container', {
    modules: {
        toolbar: toolbarOptions
    },
    theme: 'snow',
    placeholder: 'Enter your text'
}));

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
    }
};

var toolbarObj =  new ToolbarEvents();