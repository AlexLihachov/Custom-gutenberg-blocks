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
import createStyles from './style';

const save = (props) => {
    const {className, attributes} = props;
    const {numbers, settings}     = attributes;
    const bg                      = settings.bg;
    const bgtrue                  = bg ? "rri-number-counter__container_white" : "";
    const itemsClasses            = classnames([
        'rri-number-counter__container',
        `${bgtrue}`,
    ]);

    return (
        <BlockContainer.Save
            className = {className}
            blockProps = {props}
            render = {() => (
                <Fragment>
                    <div className = {itemsClasses}>

                        {numbers.map((number, index) => {
                            const itemClasses    =
                                      classnames([
                                          'rri-number-counter__item',
                                          `rri-number-counter__item_${number.size}`
                                      ]);
                            const elementClasses =
                                      classnames([
                                          'rri-number-counter__element',
                                      ]);
                            const count          = number.count;
                            const use            = number.use;
                            const icon           = number.icon;
                            const text           = number.text;
                            const circle_size    = number.circle_size;
                            const circle_radius  = number.circle_radius;
                            const circle_indent  = number.circle_indent;
                            const percent        = number.percent;
                            const initialOffset  = number.circle_offset;
                            const iconColor      = `${number.iconColor}`;

                            return (
                                <div className = {itemClasses} key = {index}>
                                    <div className = {elementClasses}
                                         data-initialoffset = {JSON.stringify(initialOffset)}
                                         data-count = {JSON.stringify(count)}>
                                        {use === "image" && (
                                            <span className = {icon} style = {{color : iconColor}}></span>)}
                                        <h3 className = "rri-number-counter__count">
                                            <span className = "rri-number-counter__count-text">1</span>
                                            {percent && (
                                                <span> %</span>
                                            )}
                                        </h3>
                                        {use === "circle" && (
                                            <div className = "rri-number-counter__circle-container">
                                                <svg className = "rri-number-counter__circle"
                                                     width = {circle_size} height = {circle_size}
                                                     xmlns = "http://www.w3.org/2000/svg">
                                                    <circle r = {circle_radius}
                                                            cy = {circle_indent}
                                                            cx = {circle_indent}
                                                            stroke-width = "4"
                                                            stroke = "#979797"
                                                            fill = "none" />
                                                </svg>
                                                <svg className = "rri-number-counter__circle"
                                                     width = {circle_size} height = {circle_size}
                                                     xmlns = "http://www.w3.org/2000/svg">
                                                    <circle className = "rri-number-counter__count-circle"
                                                            r = {circle_radius}
                                                            cy = {circle_indent}
                                                            cx = {circle_indent}
                                                            stroke-width = "4"
                                                            stroke = "#14AECF"
                                                            fill = "none"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    { text && (
                                        <RichText.Content
                                            tagName = "p"
                                            className = "rri-number-counter__count-title"
                                            value = {text}
                                        />
                                    )}
                                </div>
                            );
                        })
                        }
                    </div>
                </Fragment>
            )}
        />
    );
};

export default compose(
    withUniqueClass,
    withBlockStyles(createStyles),
)(save);


