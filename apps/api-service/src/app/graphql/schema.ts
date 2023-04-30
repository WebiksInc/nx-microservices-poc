import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { join } from 'path';

const schemaPath = join(__dirname, 'schema.graphql');
const loadedSchemas = loadFilesSync(schemaPath);
export const typeDefs = mergeTypeDefs(loadedSchemas);
