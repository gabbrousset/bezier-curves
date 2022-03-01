let WIDTH, HEIGHT;
let p_init, p_last, freeze, density, step, t, scaleN;
let points = [];

function setup() {
    WIDTH = 1512;
    HEIGHT = 831;
    createCanvas(WIDTH, HEIGHT);
    p_init = createVector(WIDTH / 2, 50);
    p_last = createVector(WIDTH / 2, HEIGHT - 50);
    p_0 = createVector(200, 200);
    points = [p_init, p_last];
    freeze = 1;
    step = 1;
    scaleN = 1;
    density = 100 / scaleN;
}

function draw() {
    background(0);
    noFill();
    scale(scaleN);
    stroke(255);
    strokeWeight(8);

    if (points.length > 2) {
        removePoint(-2);
        const p_m = createVector(WIDTH / 2, HEIGHT / 2);
        p_m.x = mouseX / scaleN;
        p_m.y = mouseY / scaleN;
        addPoint(p_m);
    }

    points.forEach((p) => point(p.x, p.y));

    strokeWeight(4);

    bezierRecursive(points);
}

function linearInterpolation(points, t) {
    const [p0, p1] = points;
    const x = lerp(p0.x, p1.x, t);
    const y = lerp(p0.y, p1.y, t);

    return createVector(x, y);
}

function interpolate(points, t) {
    if (points.length < 3) {
        console.log(points);
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
    const newPoint = createPoint(1000, 200);
    addPoint(newPoint);
}

function createPoint(x = WIDTH / 2, y = HEIGHT / 2) {
    return createVector(x, y);
}

function addPoint(point) {
    points.splice(-1, 0, point);
}

function removePoint(idx) {
    points.splice(idx, 1);
}

function interpolant(point, past_point, t) {
    let x = lerp(past_point.x, point.x, t);
    let y = lerp(past_point.y, point.y, t);
    return createVector(x, y);
}
