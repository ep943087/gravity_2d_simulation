import Draw from './draw.js';
import Simulation from './simulation.js';

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const simulation = new Simulation(canvas);
  const drawHandler = new Draw(simulation);
  
  drawHandler.draw();

  setInterval(() => {
    simulation.update();
  }, 10);

}