function getFieldAndStrongestChargeAt(x, y) {
	let greatestField = -1;
	let strongestCharge = null;

	const resultantField = createVector();

	for (let charge of charges) {
		const { field, magnitude } = charge.getFieldAt(x, y);
		if (magnitude > greatestField) {
			greatestField = magnitude;
			strongestCharge = charge;
		}

		resultantField.add(field);
	}

	return { resultantField, strongestCharge };
}

function drawFluxFrom(x, y, len) {
	let current = createVector(x, y);
	
	let done = false;
	while (!done) {
		const { resultantField, strongestCharge } = getFieldAndStrongestChargeAt(current.x, current.y);
		const angle = resultantField.heading();

		stroke(strongestCharge.color);
		push();
		translate(current.x, current.y);
		rotate(angle);
		line(0, 0, len, 0);
		pop();

		resultantField.setMag(len);
		current.add(resultantField);

		done = outsideScreen(current.x, current.y) || insideACharge(current.x, current.y);
	}
}


function drawAllFlux() {
	for (let x = 0; x < width; x += 15) {
		for (let y = 0; y < height; y += 15) {
			drawFluxFrom(x, y, 10);
		}
	}
}


function insideACharge(x, y) {
	for (let charge of charges) {
		if (charge.hasPointInside(x, y)) return true;
	}
	return false;
}

function outsideScreen(x, y) {
	return x <= 0 || x >= width || y <= 0 || y >= height;
}
