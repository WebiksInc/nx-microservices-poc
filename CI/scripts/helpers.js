import shell from "shelljs";

export function getEnabledAddons() {
    const addonsListOutput = shell.exec("minikube addons list", {
      silent: true,
    }).stdout;
  
    const regex = /\|\s*([\w-]+)\s*\|\s*\w+\s*\|\s*enabled\s*✅\s*\|/g;
    let match;
    const enabledAddons = [];
  
    while ((match = regex.exec(addonsListOutput)) !== null) {
      enabledAddons.push(match[1]);
    }
  
    return enabledAddons;
  }
  