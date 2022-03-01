let WIDTH, HEIGHT;
let mouse_point, points;
let density, step, t;

function setup() {
    WIDTH = 1512;
    HEIGHT = 831;
    createCanvas(WIDTH, HEIGHT);
    step = 1;
    density = 100;
    mouse_point = createVector(WIDTH / 2, HEIGHT / 2);
    points = [mouse_point];
}

function draw() {
    background(0);
    noFill();
    stroke(255);
    strokeWeight(8);

    mouse_point.x = mouseX;
    mouse_point.y = mouseY;

    points.forEach((p) => point(p.x, p.y));

    strokeWeight(4);

    bezierRecursive(points);
}

function linearInterpolation(points, t) {
    if (points.length < 2) {
        return;
    }

    const [p0, p1] = points;
    const x = lerp(p0.x, p1.x, t);
    const y = lerp(p0.y, p1.y, t);

    return createVector(x, y);
}

function interpolate(points, t) {
    if (points.length < 3) {
        return linearInterpolation(points, t);
    }
    return interpolate(
        [interpolate(points.slice(0, -1), t), interpolate(points.slice(1), t)],
        t
    );
}

function bezierRecursive(points) {
    for (let i = 0; i <= density; i += step) {
        t = i / density;

        const f = interpolate(points, t);

        point(f);
    }
}

function mouseClicked() {
    const newPoint = createPoint(mouseX, mouseY);
    addPoint(newPoint, -1);
}

function createPoint(x = WIDTH / 2, y = HEIGHT / 2) {
    return createVector(x, y);
}

function addPoint(point, idx = months.length) {
    points.splice(idx, 0, point);
}

function removePoint(idx) {
    points.splice(idx, 1);
}

function interpolant(point, past_point, t) {
    let x = lerp(past_point.x, point.x, t);
    let y = lerp(past_point.y, point.y, t);
    return createVector(x, y);
}
