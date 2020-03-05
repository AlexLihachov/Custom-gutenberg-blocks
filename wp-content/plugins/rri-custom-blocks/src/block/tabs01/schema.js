/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
	tabs_data: {
		type: 'array',
		default: [
			{
				name: __('What You’ll Get', i18n),
			},
			{
				name: __('Why Buy from us', i18n),
			},
			{
				name: __('Shipping', i18n),
			},
			{
				name: __('Reviews', i18n),
			}
		],
	}


};

export default schema;
