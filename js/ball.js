class Ball
{
  constructor(x, y, radius)
  {
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.radius = radius;
    this.setColor();
  }

  update()
  {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  checkOutOfBounds(width, height)
  {
    if (!this.isOutOfBounds(width, height)) return;

    if (this.x < 0) {
      this.x = this.x * -1;
      this.xVel *= -1;
    } else if (this.x > width) {
      this.x = width - (this.x - width);
      this.xVel *= -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.yVel *= -1;
    } else if (this.y > height) {
      this.y = height - (this.y - height);
      this.yVel *= -1;
    }

    this.checkOutOfBounds();
  }

  isOutOfBounds(width, height)
  {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }

  applyAcceleration(xAcc, yAcc)
  {
    this.xVel += xAcc;
    this.yVel += yAcc;
  }

  setColor()
  {
    const number = Math.floor(Math.random()*2);
    switch (number) {
      case 0: this.color = '#00FF00'; break;
      case 1: this.color = '#0000FF'; break;
    }
  }
}

export default Ball;