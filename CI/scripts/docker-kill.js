import shell from 'shelljs';
import { IMAGES } from './consts.js';

IMAGES.forEach((imageName) => {
  var activeContainers = shell
    .exec(`docker ps -a -q --filter ancestor=${imageName} --format='{{.ID}}'`, {
      silent: true,
    })
    .stdout.replaceAll("'", '')
    .split('\n')
    .filter((_) => !!_.trim());

  console.log(activeContainers.length, 'active containers:', activeContainers);

  if (activeContainers.length) {
    activeContainers.forEach((containerId) => {
      shell.exec(`docker stop ${containerId}`);
      // shell.exec(`docker rm ${containerId}`);
    });
  }

  // shell.exec(`docker rmi ${imageName}`);
});
