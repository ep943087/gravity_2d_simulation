import Ball from './ball.js';

class Simulation
{
  constructor(canvas)
  {
    this.gravitationalConstant = .2;
    this.initSize = 3;
    this.randomRadius = false;
    this.radiusMin = 1;
    this.radiusMax = 10;
    this.size = 150;
    this.defaultRadius = 5;
    this.canvas = canvas;
    this.initializeSimulation();
  }

  update = () =>
  {

    for (let i=0;i<this.balls.length;i++) {
      for (let j=i+1;j<this.balls.length;j++) {
        this.accelerateBalls(this.balls[i], this.balls[j]);
      }
    }

    const { offsetWidth: width, offsetHeight: height } = this.canvas;

    let anyBallInBounds = false;

    for (const ball of this.balls) {
      ball.update();
      //ball.checkOutOfBounds(width, height);

      if (!ball.isOutOfBounds(width, height)) {
        anyBallInBounds = true;
      }
    }

    if (!anyBallInBounds) {
      this.initializeSimulation();
    }
  }

  accelerateBalls(ballA, ballB)
  {
    const distance = Math.sqrt(
      Math.pow(ballA.x - ballB.x, 2) + Math.pow(ballA.y - ballB.y, 2)
    );

    if (distance < 10) return;

    const force = this.gravitationalConstant * (ballA.radius * ballB.radius) / Math.pow(distance, 2);
    const dX = ballB.x - ballA.x;
    const dY = ballB.y - ballA.y;

    const angle = Math.atan2(dY, dX);

    const xAcc = force*Math.cos(angle);
    const yAcc = force*Math.sin(angle);

    ballA.applyAcceleration(xAcc, yAcc);
    ballB.applyAcceleration(-xAcc, -yAcc);
  }

  initializeSimulation()
  {
    this.generateBalls();
  }

  generateBalls()
  {
    this.balls = [];
    for (let i=0;i<this.size;i++) {
      const x = Math.random() * this.canvas.offsetWidth;
      const y = Math.random() * this.canvas.offsetHeight;
      const radius = this.randomRadius ? 
        this.generateRandomRadius() : this.defaultRadius;
      this.balls.push(new Ball(x, y, radius));
    }
  }

  generateRandomRadius()
  {
    return this.radiusMin + Math.random() * this.radiusMax;
  }

  calculateBallVelocity(ball)
  {
    return Math.sqrt(Math.pow(ball.xVel, 2) + Math.pow(ball.yVel, 2));
  }
}

export default Simulation;