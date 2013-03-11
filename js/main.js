/*
 *
 *  jLEDinator 0.01
 *  https://github.com/TyrusChristiana/jLEDinator
 *
 *  Written by Tyrus Christiana (http://www.tyrus.net/)
 *  Date: Sun Mar 10 2013
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *  Sample image google searched from royaltee free images:
 *  http://www.gettyimages.com/CMS/Pages/PhotoDiscFrontdoor/StaticContent/fd_image_test.jpg
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *  Copyright 2013, Tyrus Christiana
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *  
 *
 */
$(document).ready(function () {
    // Handler for .ready() called.
    //alert("READY");

    //Defaults
    defaultWidth = 100;
    defaultHeight = 100;
    defaultXFrequency = 1;
    //Set the image to scan colors. For some reason this has to happen at the top of the scope or you get all #000000s
    context = ledCanvas.getContext('2d');
    img = new Image();
    img.onload = function(){
      context.drawImage(img,0,0);
    };
    img.src = "img/image1.jpg";
    //Variables at top of scope
    ledContainerWidth = 0;
    ledContainerHeight = 0;
    ledCanvas = $("canvas")[0];
    ledImgColorArray = [];
    //Init
    initApplication();
});

function initApplication() {
    //alert("INIT");
    //Button
    $("#setButton").click(function() {
        //setup vars
        ledWidth = $("#controlWidth").val();
        ledHeight = $("#controlHeight").val();
        ledXFrequency = $("#controlFrequency").val();
        ledYFrequency = $("#controlFrequency").val();
        setLedContainer(ledWidth, ledHeight, ledXFrequency);
    });
    //Clear Button
    $("#clearButton").click(function(){
        $(".ledContainer").html("");
    });
    //IMG Scan Button
    $("#imgButton").click(function(){
        //NEEDS imagePath, containerWidth, containerHeight, widthFrequency, heightFrequency
        if(!ledContainerWidth == 0){
            ledImgColorArray = getColorsFromPic(ledContainerWidth, ledContainerHeight, ledXFrequency, ledYFrequency);
        }
    });
}

function setLedContainer(newLedWidth, newLedHeight, newLedXFrequency) {
    if(!newLedWidth) {
        newLedWidth = defaultWidth;
    }
    if(!newLedHeight) {
        newLedHeight = defaultHeight;
    }
    if(!newLedXFrequency) {
        newLedXFrequency = defaultXFrequency;
    }
    $(".ledContainer").css("width", newLedWidth);
    $(".ledContainer").css("height", newLedHeight);
    ledContainerWidth = newLedWidth;
    ledContainerHeight = newLedHeight
    var childLedContainer = {
        'clWidth' : newLedWidth/newLedXFrequency - 1,
        'clHeight' : newLedHeight/newLedXFrequency - 1,
        'clCornerRadius' : newLedWidth/newLedXFrequency/2
    };

    //Generate the HTML to display as an array
    var ledContent = [];
    for (var i = (newLedXFrequency * newLedXFrequency) - 1; i >= 0; i--) {
        bgColor = ledImgColorArray[i];
        console.log(ledImgColorArray[i]);
        ledContent.push('<div class="childLedContainer" style="display:block; -moz-border-radius:' + childLedContainer["clCornerRadius"] + 'px; -webkit-border-radius: ' + childLedContainer["clCornerRadius"]  + 'px; background-color:' + bgColor + ';width:' + childLedContainer["clWidth"] + 'px; height:' + childLedContainer["clHeight"] + 'px;"></div>');
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
function getColorsFromPic(containerWidth, containerHeight, widthFrequency, heightFrequency){
    var currentXPosition = 0;
    var currentYPosition = 0;
    var colorBucket = [];
    
    
    for (var i = (parseInt(widthFrequency) * parseInt(heightFrequency)) - 1; i >= 0; i--) {
        var imgData = context.getImageData(currentXPosition, currentYPosition, img.width, img.height).data;
        var hex = "#" + ("000000" + rgbToHex(imgData[0], imgData[1], imgData[2])).slice(-6);
        colorBucket.push(hex);
        //Move the position of the color smeller to the next spot
        //console.log("X:" + currentXPosition);
        if(parseInt(currentXPosition) <= parseInt(containerWidth)){
            currentXPosition = parseInt(currentXPosition) + parseInt((ledContainerWidth/widthFrequency));
        } else {
            //This is probably costly and bad.
            if(parseInt(currentYPosition) <= parseInt(containerHeight)){
                currentXPosition = 0;
                currentYPosition = parseInt(currentYPosition) + parseInt((ledContainerHeight/heightFrequency));
                //console.log("Y:" + currentYPosition);
            }
        }
    };
    //Debug Info
    //console.log(colorBucket.join(""));
    //console.log(colorBucket.length);
    return colorBucket;
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}