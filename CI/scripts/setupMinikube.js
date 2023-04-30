import shell from "shelljs";
import { getEnabledAddons } from "./helpers.js";

export function setupMinikube(imageNames = [], addons = []) {
  const minikubeIsRunning =
    shell.exec("minikube status").stdout.indexOf("host: Running") !== -1;

  if (!minikubeIsRunning) {
    shell.exec(`minikube start`);
  }

  const enabledAddons = getEnabledAddons();

  addons.forEach((addonName) => {
    if (enabledAddons.indexOf(addonName) === -1) {
      shell.exec(`minikube addons enable ${addonName}`);
    }
  });

  imageNames.forEach((imageName) => {
    shell.exec(`minikube image load ${imageName}`);
  });
}
