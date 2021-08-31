import QueueController from './controller/queueController.js';
import QueueView from './view/queueView.js';
import QueueModel from './model/queueModel.js';
import ResolutionController from './controller/resolutionController.js';
import ResolutionView from './view/resolutionView.js';
import ResolutionModel from './model/resolutionModel.js';

export default class App {
  constructor() {
    try {
      this.resolution = new ResolutionController(new ResolutionView(), new ResolutionModel());
      this.queue = new QueueController(new QueueView(), new QueueModel());
    } catch (e) {
      console.log(e.message);
    }
  }
}
