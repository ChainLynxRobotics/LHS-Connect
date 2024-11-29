import { array, string } from "yup";

/**
 * Regex for validating string mongodb ObjectIDs
 */
export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

/**
 * Validation schema for mongodb ObjectIDs
 */
export const idValidator = string().required().matches(OBJECT_ID_REGEX, 'Invalid ID').label('ID');

export const idArrayValidator = array().of(idValidator).label('ID Array');
