import { readFileSync, readdirSync } from 'node:fs';
import { join, extname, basename, resolve } from 'node:path';
import yaml from 'js-yaml';
import { dataSchemas, type DataKey, type DataMap } from './schema';

const DATA_DIR = resolve(process.cwd(), 'src/data');

const SCHEMA_KEYS = Object.keys(dataSchemas) as DataKey[];

function loadFile<K extends DataKey>(key: K): DataMap[K] {
  const filePath = join(DATA_DIR, `${key}.yml`);
  const content = readFileSync(filePath, 'utf-8');
  const parsed = yaml.load(content);

  const schema = dataSchemas[key];
  const result = schema.safeParse(parsed);

  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
    throw new Error(`Validation failed for ${key}.yml: ${issues}`);
  }

  return result.data as DataMap[K];
}

export function loadData(): DataMap {
  const files = readdirSync(DATA_DIR);
  const ymlFiles = files.filter((file) => extname(file) === '.yml');

  const loadedKeys: DataKey[] = [];
  for (const file of ymlFiles) {
    const key = basename(file, '.yml') as DataKey;
    if (SCHEMA_KEYS.includes(key)) {
      loadedKeys.push(key);
    }
  }

  for (const key of SCHEMA_KEYS) {
    if (!loadedKeys.includes(key)) {
      throw new Error(`Missing required data file: ${key}.yml`);
    }
  }

  return {
    profile: loadFile('profile'),
    experience: loadFile('experience'),
    projects: loadFile('projects'),
    skills: loadFile('skills'),
  };
}
