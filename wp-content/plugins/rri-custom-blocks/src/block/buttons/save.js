/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {compose} from '@wordpress/compose';
import {Fragment} from '@wordpress/element';
import createStyles from "./style";

const save = (props) => {
    const {className, attributes} = props;
    const {buttons, settings}     = attributes;
    const itemClasses             = classnames([
        'rri-buttons__container'
    ]);
    const url_text                = buttons.link.text;
    const url_link                = buttons.link.url;
    const newTab                  = buttons.link.newTab;
    const noFollow                = buttons.link.noFollow;
    const rel                     = [];

    if(newTab){
        rel.push('noopener');
        rel.push('noreferrer')
    }
    if(noFollow){
        rel.push('nofollow')
    }

    return (
        <BlockContainer.Save
            className = {className}
            blockProps = {props}
            render = {() => (
                <Fragment>
                    <div className = {itemClasses}>
                        <div className = "rri-buttons__container" id = {buttons}>
                                <a className = "rri-buttons__link"
                                   href = {url_link}
                                   target = {newTab ? '_blank' : undefined}
                                   rel = {rel.join(' ') || undefined}
                                >
                                    <RichText.Content
                                        tagName = "span"
                                        value = {url_text}
                                    />
                                </a>
                        </div>
                    </div>
                </Fragment>
            )}
        />
    );
};

export default compose(
    withUniqueClass,
    withBlockStyles(createStyles)
)(save);
