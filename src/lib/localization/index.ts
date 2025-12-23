import { libTranslationResources, mergeLocalizationResources } from '@adofai-gg/ui';

import ko from './sources/ko.ftl?raw';
import en from './sources/en.ftl?raw';
import ja from './sources/ja.ftl?raw';

export const availableLanguages = ['ko', 'en', 'ja'];

export const translationResources = mergeLocalizationResources(libTranslationResources, {
	ko: [ko],
	en: [en],
	ja: [ja]
});
