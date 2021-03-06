// import client side soundworks and player experience
import * as soundworks from 'soundworks/client';
import ControllerExperience from './ControllerExperience';
import serviceViews from '../shared/serviceViews';

function bootstrap() {
  document.body.classList.remove('loading');

  const config = Object.assign({ appContainer: '#container' }, window.soundworksConfig);
  soundworks.client.init(config.clientType, config);

  soundworks.client.setServiceInstanciationHook((id, instance) => {
    if (serviceViews.has(id))
      instance.view = serviceViews.get(id, config);
  });

  const controller = new ControllerExperience(config.assetsDomain);
  const sharedParams = controller.sharedParamsComponent;
  sharedParams.setGuiOptions('numPlayers', { readonly: true });
  sharedParams.setGuiOptions('state', { type: 'buttons' });
  sharedParams.setGuiOptions('loopAttenuation', { type: 'slider', size: 'large' });   
  sharedParams.setGuiOptions('minGain', { type: 'slider', size: 'large' });

  soundworks.client.start();
}

window.addEventListener('load', bootstrap);
