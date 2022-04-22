window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    //deal with keyboard input
    pad.addEventListener('keydown', function(e) {
        if(keyCode === 9) {
            let start = this.selectionStart;
            let end = this.selectionEnd;
            let target = e.target;
            let value = target.value;

            //set textarea value to text before caret + tab + text after caret
            target.value = value.substring(0,start) + "\t" + value.substring(end);

            //put caret at right pos again (add one for tab)
            this.selectionStart = this.selectionEnd = start + 1;

            //prevent loss of focus
            e.preventDefault();

        }
    });

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function() {
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function() {
        if(previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    };
    setInterval(function() {
        if(didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    //ignore if on home page
    if (document.location.pathname.length > 1) {
        //implement sharejs
        var documentName = document.location.pathname.substring(1);
        sharejs.open(document.location.pathname, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });
    }
    //convert to markdown on page load
    convertTextAreaToMarkdown();
};