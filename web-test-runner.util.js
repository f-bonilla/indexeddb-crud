import { execSync } from 'child_process';

if (process.argv.length < 3) {
  console.error('Error: Hay que proporcionar una ruta válida para el test.');
  process.exit(1);
}

const componentPath = process.argv[2];
const command = `web-test-runner --coverage --node-resolve ${componentPath}`;

execSync(command, { stdio: 'inherit' });
