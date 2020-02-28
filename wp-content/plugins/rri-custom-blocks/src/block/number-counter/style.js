/**
 * External dependencies
 */
import {
    appendImportant,
    __getValue, createTypographyStyles, createBackgroundStyleSet,
} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
    const getValue = __getValue(props.attributes);
    const styles = [];

    //Block Min-height
    styles.push({
        '.rri-number-counter': {
            minHeight: appendImportant(getValue('blockHeight', '%spx'))
        },
        tablet: {
            '.rri-number-counter': {
                minHeight: appendImportant(getValue('tabletBlockHeight', '%spx'))
            }
        },
        mobile: {
            '.rri-number-counter': {
                minHeight: appendImportant(getValue('mobileBlockHeight', '%spx'))
            }
        }
    });

    // Block width
    styles.push({
        '.rri-number-counter': {
            maxWidth: appendImportant(getValue('blockWidth', '%spx'))
        },
        tablet: {
            '.rri-number-counter': {
                maxWidth: appendImportant(getValue('tabletBlockWidth', '%spx'))
            }
        },
        mobile: {
            '.rri-number-counter': {
                maxWidth: appendImportant(getValue('mobileBlockWidth', '%spx'))
            }
        }
    });

    // Vertical alignment
    styles.push({
        '.rri-number-counter': {
            alignItems: appendImportant(getValue('blockVerticalAlign'))
        },
        tablet: {
            '.rri-number-counter': {
                alignItems: appendImportant(getValue('tabletBlockVerticalAlign'))
            },
        },
        mobile: {
            '.rri-number-counter': {
                alignItems: appendImportant(getValue('mobileBlockVerticalAlign'))
            },
        }
    });

    // Horizontal alignment
    styles.push({
        '.rri-number-counter': {
            justifyContent: appendImportant(getValue('blockHorizontalAlign'))
        },
        tablet: {
            '.rri-number-counter': {
                justifyContent: appendImportant(getValue('tabletBlockHorizontalAlign'))
            },
        },
        mobile: {
            '.rri-number-counter': {
                justifyContent: appendImportant(getValue('mobileBlockHorizontalAlign'))
            },
        }
    });

    // Color.
    // styles.push({
    //     '.rri-number-counter__count-title': {
    //         ...createTypographyStyles('title%s', 'desktop', props.attributes, {importantSize : true}),
    //         color : appendImportant(`${getValue('titleColor')}`)
    //     },
    //     tablet         : {
    //         '.rri-two-tone-text__second-line' : {
    //             ...createTypographyStyles('title%s', 'tablet', props.attributes, {importantSize : true}),
    //         }
    //     },
    //     mobile         : {
    //         '.rri-two-tone-text__second-line' : {
    //             ...createTypographyStyles('title%s', 'mobile', props.attributes, {importantSize : true}),
    //         }
    //     },
    // });


    styles.push({
        ...createBackgroundStyleSet('preview%s', 'rri-number-counter', props.attributes),
    });

    const {
              previewBackgroundTintStrength = '',
              previewBackgroundColor = '',
          } = props.attributes;

    if (previewBackgroundTintStrength || previewBackgroundColor) {
        styles.push({
            '.rri-number-counter:hover:before': {
                opacity: previewBackgroundColor && previewBackgroundTintStrength === '' ? 0.2 :
                    previewBackgroundTintStrength >= 5 ? (previewBackgroundTintStrength / 10) - 0.3 :
                        (previewBackgroundTintStrength / 10) + 0.3,

            },
        })
    }

    return deepmerge.all(styles)

};
export default createStyles;
