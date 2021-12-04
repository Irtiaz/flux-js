class Charge {
	constructor(x, y, q) {
		this.position = createVector(x, y);
		this.q = q;
		
		this.color = color(random(255), random(255), random(255), 150);
		this.radius = 6;
	}

	getFieldAt(x, y) {
		const distanceSquared = sq(x - this.position.x) + sq(y - this.position.y);
		const magnitude = abs(this.q / distanceSquared);

		let pointCharge = createVector(x, y);
		const field = p5.Vector.sub(pointCharge, this.position);
		field.setMag(magnitude);
		if (this.q < 0) field.mult(-1);
		
		return { field, magnitude };
	}

	display() {
		fill(0);
		text(this.q, this.position.x + this.radius, this.position.y + this.radius);

		fill(this.color);
		stroke(0);
		ellipse(this.position.x, this.position.y, 2 * this.radius, 2 * this.radius);
	}

	hasPointInside(x, y) {
		return sq(x - this.position.x) + sq(y - this.position.y) < sq(this.radius);
	}
}
