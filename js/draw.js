class Draw
{
  constructor(simulation) {
    this.simulation = simulation;
    this.canvas = simulation.canvas;
    this.ctx = simulation.canvas.getContext('2d');
  }

  draw = () => {
    const { canvas: c, ctx } = this;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

    ctx.fillStyle = "black";

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(0, 0, c.width, c.height);

    this.drawBalls();
    requestAnimationFrame(this.draw);
  }

  drawBalls() {
    for (const ball of this.simulation.balls) {
      this.drawBall(ball);
    }
  }

  drawBall(ball) {
    const { ctx, simulation } = this;

    //ctx.globalAlpha = simulation.calculateBallVelocity(ball) / 3;
    //ctx.globalAlpha = Math.max(ctx.globalAlpha, .001);
    //let hue = Math.floor((ball.x / this.canvas.offsetWidth) * 360);
    let hue = simulation.calculateBallVelocity(ball) / 6 * 360;
    hue = 360 - Math.min(hue, 360);
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(hue, ctx.fillStyle);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default Draw;