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
    const {twoTone, settings, titleleftTag, titlerightTag}     = attributes;
    const itemClasses             = classnames([
        'rri-two-tone-text__container',
        'js-parallax'
    ]);
    const titleleft               = twoTone.titleleft;
    const titleright              = twoTone.titleright;
    const url_text                = twoTone.link.text;
    const url_link                = twoTone.link.url;
    const newTab                  = twoTone.link.newTab;
    const noFollow                = twoTone.link.noFollow;
    const imageUrl                = twoTone.image.url;
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
            data-speed = {JSON.stringify(settings.speed)}
            render = {() => (
                <Fragment>
                    <div className = {itemClasses}>
                        <div className = "rri-two-tone-text__grid" id = {twoTone}>
                            <div className = "rri-two-tone-text__third"></div>
                            <div className = "rri-two-tone-text__third">
                                <a href = {url_link}
                                   target = {newTab ? '_blank' : undefined}
                                   rel = {rel.join(' ') || undefined}
                                >
                                    <div className = "rri-two-tone-text__img-wrap">
                                        <div className = "rri-two-tone-text__img-mask js-parallax">
                                            <div className = "rri-two-tone-text__scroll-fade-in-block js-parallax">
                                                <div className = "rri-two-tone-text__parallax-img">
                                                    <div
                                                        className = "rri-two-tone-text__parallax-src js-parallax"
                                                        style = {{
                                                            backgroundImage : `url(${imageUrl})`
                                                        }} />
                                                </div>
                                            </div>
                                            <RichText.Content
                                                tagName = {titleleftTag}
                                                className = "rri-two-tone-text__title first-line js-parallax rri-two-tone-text__mask"
                                                value = {titleleft}
                                            />
                                            <RichText.Content
                                                tagName = {titlerightTag}
                                                className = "rri-two-tone-text__title second-line js-parallax rri-two-tone-text__mask"
                                                value = {titleright}
                                            />
                                        </div>
                                        <RichText.Content
                                            tagName = {titleleftTag}
                                            className = "rri-two-tone-text__title first-line js-parallax rri-two-tone-text__mask"
                                            value = {titleleft}
                                        />
                                        <RichText.Content
                                            tagName = {titlerightTag}
                                            className = "rri-two-tone-text__title second-line js-parallax rri-two-tone-text__mask"
                                            value = {titleright}
                                        />
                                    </div>
                                </a>
                            </div>
                            <div className = "rri-two-tone-text__btn-wrap rri-two-tone-text__third">
                                <a className = "rri-two-tone-text__btn rri-two-tone-text__mask"
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
