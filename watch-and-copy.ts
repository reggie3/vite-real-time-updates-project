import * as fs from "fs";
import * as path from "path";
import * as chokidar from "chokidar";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

type Configuration = string[];

function readConfig(): Configuration[] {
  try {
    const configPath = path.resolve(__dirname, "watch-and-copy.config.json");
    const configFile = fs.readFileSync(configPath, "utf-8");
    const config: Configuration[] = JSON.parse(configFile);
    return config;
  } catch (error) {
    console.error(`Error reading configuration file: ${error.message}`);
    process.exit(1);
  }
}

async function copyFileToDestinations(
  sourceFile: string,
  destinations: string[]
) {
  for (const destination of destinations) {
    const fileName = path.basename(sourceFile);
    const sourcePath = path.resolve(__dirname, sourceFile);
    const destinationPath = path.join(destination, fileName);
    console.log(`Copying: ${sourcePath} -> ${destinationPath}`);

    try {
      await copyFile(sourcePath, destinationPath);
      console.log(`Copied: ${sourcePath} -> ${destinationPath}`);
    } catch (error) {
      console.error(
        `Error copying file: ${error.message} ${sourcePath} -> ${destinationPath}`
      );
    }
  }
}

async function copyAllFilesToDestinations(
  source: string,
  destinations: string[]
) {
  try {
    console.log(`Reading source directory: ${source}`);
    await copyFileToDestinations(source, destinations);
  } catch (error) {
    console.error(`Error reading source directory: ${error.message}`);
  }
}

const configs = readConfig();

for (const config of configs) {
  const [source, ...destinations] = config;

  // Initial copy of all files
  copyAllFilesToDestinations(source, destinations);

  // Watch for changes
  const watcher = chokidar.watch(source, { persistent: true });

  watcher
    .on("add", (filePath) => {
      const relativePath = path.relative(source, filePath);
      copyFileToDestinations(source, destinations);
    })
    .on("change", (filePath) => {
      const relativePath = path.relative(source, filePath);
      copyFileToDestinations(source, destinations);
    })
    .on("unlink", (filePath) => {
      // Handle deletion if needed
      console.log(`File deleted: ${path.relative(source, filePath)}`);
    })
    .on("error", (error) => {
      console.error(`Watcher error: ${error}`);
    });

  console.log(`Watching for changes in ${source}...`);
}
