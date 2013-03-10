$(document).ready(function() {
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
	if( !newledWidth ) {
		newledWidth = defaultWidth;
	}
	if( !newledHeight ) {
		newledHeight = defaultHeight;
	}
	if( !newledFrequency ) {
		newledFrequency = defaultFrequency;
	}
	$(".ledContainer").css("width", newledWidth);
	$(".ledContainer").css("height", newledHeight);
	//alert(newledWidth/newledFrequency);
	var childLedContainer = {
		'clWidth' : newledWidth/newledFrequency - 1,
		'clHeight' : newledHeight/newledFrequency,
		'clCornerRadius' : newledWidth/newledFrequency/2
	};

	for (var i = newledFrequency - 1; i >= 0; i--) {
		$(".ledContainer").append('<div class="childLedContainer" style="display:block; background-color:' + generateRandomColor() + ';width:' + childLedContainer["clWidth"] + 'px; height:' + childLedContainer["clHeight"] + 'px;"></div>');
	};

	$(".childLedContainer").css("-moz-border-radius", childLedContainer["clCornerRadius"]);
	$(".childLedContainer").css("-webkit-border-radius", childLedContainer["clCornerRadius"]);

}

function generateRandomColor(){
	//Paul Irish
	//http://paulirish.com/2009/random-hex-color-code-snippets/
	var newcolor = '#'+Math.floor(Math.random()*16777215).toString(16);
	return newcolor;
}