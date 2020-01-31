/**
 * WordPress dependencies
 */
import {applyFilters} from '@wordpress/hooks';

/**
 * External dependencies
 */
import classnames from 'classnames';

const BlockContainer = {};

BlockContainer.Edit = props => {
    const {
        blockProps,
        render,
        mainClass,
        blockTag: blockTagProp,
        ...containerProps
    } = props;
    const {blockName} = blockProps;
    const {
        anchor = '',
        design,
        blockTag = 'div',
    } = blockProps.attributes;

    const mainClasses = classnames([
        props.className,
    ], applyFilters(`rri.${blockName}.main-block.classes`, {
        'rri-main-block': mainClass,
    }, blockProps));

    const BlockTag = blockTag || blockTagProp || 'div'; // Allow the advanced block settings to override the HTML Tag.
    // TODO Remove `design` from the filters below.
    return (
        <BlockTag {...containerProps} id={anchor} className={mainClasses}>
            {blockProps.styles}
            {applyFilters(`rri.${blockName}.edit.output.outer`, null, design, blockProps)}
            {render &&
            <div className="rri-inner-block">
                {applyFilters(`rri.${blockName}.edit.output.before`, null, design, blockProps)}
                <div className="rri-block-content">
                    {render(blockProps)}
                </div>
                {applyFilters(`rri.${blockName}.edit.output.after`, null, design, blockProps)}
            </div>
            }
        </BlockTag>
    )
};

BlockContainer.Save = props => {
    const {
        blockProps,
        render,
        mainClass,
        blockTag: blockTagProp,
        ...containerProps
    } = props;
    const {blockName} = blockProps;
    const {
        anchor = '',
        design,
        blockTag = 'div',
    } = blockProps.attributes;

    const mainClasses = classnames([
        props.className,
    ], applyFilters(`rri.${blockName}.main-block.classes`, {
        'rri-main-block': mainClass,
    }, blockProps));

    // TODO Remove `design` from the filters below.
    const BlockTag = blockTag || blockTagProp || 'div'; // Allow the advanced block settings to override the HTML Tag.
    return (
        <BlockTag {...containerProps} id={anchor} className={mainClasses}>
            {blockProps.styles}
            {applyFilters(`rri.${blockName}.save.output.outer`, null, design, blockProps)}
            {render &&
            <div className="rri-inner-block">
                {applyFilters(`rri.${blockName}.save.output.before`, null, design, blockProps)}
                <div className="rri-block-content">
                    {render(blockProps)}
                </div>
                {applyFilters(`rri.${blockName}.save.output.after`, null, design, blockProps)}
            </div>
            }
        </BlockTag>
    )
};

BlockContainer.Save.defaultProps = {
    styles: null, // provided by `withBlockStyles`
    mainClass: true,
};

export default BlockContainer;
