$(document).ready(function () {
    // Handler for .ready() called.
    //alert("READY");
    //Defaults
    defaultWidth = 100;
    defaultHeight = 100;
    defaultFrequency = 1;
    //Init
    initApplication();
});

function initApplication() {
    //alert("INIT");
    //Button
    $("#setButton").click(function() {
        //setup vars
        var ledWidth = $("#controlWidth").val();
        var ledHeight = $("#controlHeight").val();
        var ledFrequency = $("#controlFrequency").val();
        setLedContainer(ledWidth, ledHeight, ledFrequency);
    });
    //Clear Button
    $("#clearButton").click(function(){
        $(".ledContainer").html("");
    });
}

function setLedContainer(newledWidth, newledHeight, newledFrequency) {
    if(!newledWidth) {
        newledWidth = defaultWidth;
    }
    if(!newledHeight) {
        newledHeight = defaultHeight;
    }
    if(!newledFrequency) {
        newledFrequency = defaultFrequency;
    }
    $(".ledContainer").css("width", newledWidth);
    $(".ledContainer").css("height", newledHeight);

    var childLedContainer = {
        'clWidth' : newledWidth/newledFrequency - 1,
        'clHeight' : newledWidth/newledFrequency - 1,
        'clCornerRadius' : newledWidth/newledFrequency/2
    };

    //Generate the HTML to display as an array
    var ledContent = [];
    for (var i = newledFrequency - 1; i >= 0; i--) {
        ledContent.push('<div class="childLedContainer" style="display:block; -moz-border-radius:' + childLedContainer["clCornerRadius"] + 'px; -webkit-border-radius: ' + childLedContainer["clCornerRadius"]  + 'px; background-color:' + generateRandomColor() + ';width:' + childLedContainer["clWidth"] + 'px; height:' + childLedContainer["clHeight"] + 'px;"></div>');
    }
    $(".ledContainer").append(ledContent.join("")); //jam in the container


    //$(".childLedContainer").css("-moz-border-radius", childLedContainer["clCornerRadius"]);
    //$(".childLedContainer").css("-webkit-border-radius", childLedContainer["clCornerRadius"]);

}

function generateRandomColor(){
    //Paul Irish
    //http://paulirish.com/2009/random-hex-color-code-snippets/
    var newcolor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return newcolor;
}

//Work in progress
function getColorsFromPic(imagePath, containerWidth, containerHeight, widthFrequency, heightFrequency){
    var img = new Image();
    var currentXPosition = 1;
    var currentYPosition = 1;
    var colorBucket = [];
    img.src = "'" + imagePath + "'";
    var context = document.getElementById('canvas').getContext('2d');
    context.drawImage(img, 0, 0);
    for (var i = (widthFrequency * heightFrequency) - 1; i >= 0; i--) {
        colorBucket.push(context.getImageData(currentXPosition, currentYPosition, 1, 1).data);
        //Move the position of the color smeller to the next spot
        if(!currentXPosition > containerWidth){
            currentXPosition = currentXPosition + widthFrequency;
        } else {
            currentXPosition = 1;
            currentYPosition = currentYPosition + heightFrequency;
        }
    };
    
}