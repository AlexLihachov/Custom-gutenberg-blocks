/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer, UrlInputPopover} from '../../components';
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
    const {buttons}               = attributes;

    return (
        <BlockContainer.Save
            className = {className}
            blockProps = {props}
            render = {() => (
                <Fragment>
                    <div className="rri-buttons__container">
                        {buttons.map((button, index) => {
                            const itemClasses
                                      = classnames([
                                `rri-buttons__item`,
                                `rri-buttons__item_${button.design}`,
                                `rri-buttons__item_${button.size}`
                            ]);

                            const url_text = button.text;
                            const url_link = button.url;
                            const newTab   = button.newTab;
                            const noFollow = button.noFollow;
                            const rel      = [];

                            if(newTab){
                                rel.push('noopener');
                                rel.push('noreferrer')
                            }
                            if(noFollow){
                                rel.push('nofollow')
                            }

                            return (
                                <div className="rri-buttons__item-container">
                                <a className = {itemClasses}
                                   key = {index}
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
                            );
                        })}
                    </div>
                </Fragment>
            )} />
    );
};

export default compose(
    withUniqueClass,
    withBlockStyles(createStyles)
)(save);
