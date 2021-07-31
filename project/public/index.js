import QueueController from './controller/queueController.js';
import QueueView from './view/queueView.js';
import QueueModel from './model/queueModel.js';
import ResolutionController from './controller/resolutionController.js';
import ResolutionView from './view/resolutionView.js';
import ResolutionModel from './model/resolutionModel.js';
import OptionsController from './controller/optionsController.js';
import OptionsView from './view/optionsView.js';
import OptionsModel from './model/optionsModel.js';

const resolution = new ResolutionController(new ResolutionView(), new ResolutionModel());
const queue = new QueueController(new QueueView(), new QueueModel());
const options = new OptionsController(new OptionsView(), new OptionsModel());
