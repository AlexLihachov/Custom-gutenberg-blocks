/**
 * External dependencies
 */
import {AlignButtonsControl, ResponsiveControl} from '../../components';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';
import classnames from 'classnames';

const ContentAlignControl = props => {
    return (
        <ResponsiveControl
            attrNameTemplate="%sContentAlign"
            setAttributes={props.setAttributes}
            blockAttributes={props.blockAttributes}
        >
            <AlignButtonsControl
                label={__('Align', i18n)}
                className={classnames([props.className, 'rri--help-tip-alignment-all'])}
            />
        </ResponsiveControl>
    )
};

ContentAlignControl.defaultProps = {
    className: '',
    setAttributes: () => {
    },
    blockAttributes: {},
};

export default ContentAlignControl
