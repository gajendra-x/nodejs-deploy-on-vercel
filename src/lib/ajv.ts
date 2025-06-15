import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

// here you cant define new custom validators by adding new key word in ajv

export { ajv };
