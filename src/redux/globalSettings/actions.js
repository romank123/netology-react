/* eslint-disable import/prefer-default-export */
import {
  CHANGE_GLOBAL_SETTINGS,
} from './types';

export function changeGlobalSetting(settings = {}) {
  return { type: CHANGE_GLOBAL_SETTINGS, payload: settings };
}
