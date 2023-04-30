import shell from 'shelljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupMinikube } from './setupMinikube.js';
import {IMAGES} from "./consts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yamlsFolderPath = `${__dirname}\\..\\yamls`;

setupMinikube(IMAGES);

shell.exec(`kubectl apply -f ${yamlsFolderPath}/tech-shop-namespace.yaml`);
shell.exec(`kubectl apply -f ${yamlsFolderPath}`);
// shell.exec(`kubectl logs ${SERVICE_NAME}`);
shell.exec(`minikube tunnel --cleanup`);
