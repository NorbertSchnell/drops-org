import 'source-map-support/register'; // enable sourcemaps in node
import * as soundworks from 'soundworks/server';
import ControllerExperience from './ControllerExperience';
import PlayerExperience from './PlayerExperience';
import defaultConfig from './config/default';

let config = null;

switch(process.env.ENV) {
  default:
    config = defaultConfig;
    break;
}

process.env.NODE_ENV = config.env;

soundworks.server.init(config);

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

// define parameters shared by different clients
const sharedParams = soundworks.server.require('shared-params');
sharedParams.addText('numPlayers', 'num players', 0, ['controller']);
sharedParams.addEnum('state', 'state', ['reset', 'running', 'end'], 'reset');
sharedParams.addNumber('maxDrops', 'max drops', 0, 24, 1, 6);
sharedParams.addNumber('loopDiv', 'loop div', 1, 24, 1, 3);
sharedParams.addNumber('loopPeriod', 'loop period', 1, 24, 0.1, 7.5);
sharedParams.addNumber('loopAttenuation', 'loop atten', 0, 1, 0.01, 0.707);
sharedParams.addNumber('minGain', 'min gain', 0, 1, 0.01, 0.1);
sharedParams.addNumber('quantize', 'quantize', 0, 1, 0.001, 0);
sharedParams.addEnum('autoPlay', 'auto play', ['off', 'on'], 'off');
sharedParams.addTrigger('clear', 'clear');

const controllerExperience = new ControllerExperience('controller');
const playerExperience = new PlayerExperience();

soundworks.server.start();
