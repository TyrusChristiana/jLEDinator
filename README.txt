/*
 *
 *  jLEDinator 0.01
 *  https://github.com/TyrusChristiana/jLEDinator
 *  http://tyrus.net/jLEDinator/
 *  Written by Tyrus Christiana (http://www.tyrus.net/)
 *  Date: Sun Mar 10 2013
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Credits:
 *
 *  Sample image google searched from royaltee free images:
 *  http://www.gettyimages.com/CMS/Pages/PhotoDiscFrontdoor/StaticContent/fd_image_test.jpg
 *
 *  Paul Irish
 *  http://paulirish.com/2009/random-hex-color-code-snippets
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *  Copyright 2013, Tyrus Christiana
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *  
 *
 */

========================================================================================
I had this idea a while back that it would be cool to translate images or color arrays into 
divs within a container. This is the outcome of that idea.

Working example available at http://tyrus.net/jLEDinator/

KNOWN ISSUES:

This version needs to be run on localhost or an actual site. Opening it from the filesystem causes
Unable to get image data from canvas because the canvas has been tainted by cross-origin data. main.js:118
Uncaught Error: SecurityError: DOM Exception 18 

The current iteration of the image color reading is horribly memory intensive. I can't get the frequency 
past about 32 before it borks. Probably need to batch process it and refactor that whole loop.

Certain frequencies warp the LED. 30 for example. Thinking about that one,

