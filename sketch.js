const charges = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);

	document.getElementsByTagName('canvas')[0].addEventListener('click', handleMousePressed);
}

function handleMousePressed() {
	if (!outsideScreen(mouseX, mouseY)) {
		const val = prompt('Enter the value of the charge with polarity (+/-)');
		if (val !== '' && val != null) {
			const q = parseFloat(val);
			if (q === 0) return;

			const charge = new Charge(mouseX, mouseY, q);
			charges.push(charge);
			charge.display();

			background(255);
			drawAllFlux();
			for (let charge of charges) charge.display();
		}

	}
}
