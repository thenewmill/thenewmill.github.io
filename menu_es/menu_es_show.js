// location of our images and thumbnails
let folder = "menu_es";

// max is the total number of images in the folder (or less)
let max = 3;


function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

let imageThumbs = document.getElementById("image-thumbs");
let currentImage = document.getElementById("current-image");

// Start with the first image
let i = 1;

// pick a random image to startwith from 1 to max			
// let startwith =  ( 1 + Math.floor(Math.random() * max) );
let startwith = 1

// first time up, show our random startwith image
let tempImg = new Image();
tempImg.onload = function(){
	currentImage.src = folder + "/images/image" + pad (startwith,4) + ".jpg";
	currentImage.alt = "Image " + pad (startwith,4);
	appendImage();
}

let tryLoadImage = function(){
	tempImg.src = folder + "/thumbnails/image" + pad(i, 4) + ".jpg";
}

let appendImage = function(){
	let thumb = document.createElement("img");
	thumb.src = tempImg.src;
	thumb.alt = "Image" + pad(i, 4);
	thumb.number = i; // note which thumbnail is which
	thumb.classList.add("thumb");
	imageThumbs.appendChild(thumb);
	
	thumb.addEventListener("click", function() {
		// need to set startwith to the image we clicked on
		// so that we can prev/next 
		startwith = this.number;
		
		document.getElementsByClassName("loading-spinner")[0].style.visibility = "visible";
		currentImage.src = this.src.replace("thumbnails/", "images/");
		
		function checkLoaded(){
			let finishedLoading = document.getElementById("current-image").complete;					
			if (finishedLoading) { 
				document.getElementsByClassName("loading-spinner")[0].style.visibility = "hidden"; 
			}						
			setTimeout(checkLoaded, 1000);
		}
		
		checkLoaded();
		
		clearTimeout(checkLoaded);
		window.scrollTo({ top: 0, behavior: 'smooth' });					
	} );
	
	tryLoadImage(i++)
}

tryLoadImage(i);

// Next/previous controls
function plusSlides(y) {
	startwith += y;
	
	if (startwith > max) startwith = 1;
	if (startwith < 1) startwith = max;
	
	currentImage.src = folder + "/images/image" + pad(startwith,4) + ".jpg";
	currentImage.alt = "Image" + pad(startwith,4);
}