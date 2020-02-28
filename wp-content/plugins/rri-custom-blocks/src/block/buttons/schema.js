export const schema = {
    buttons : {
        type    : 'array',
        default : [
            {
                url        : '',
                newTab     : false,
                noFollow   : false,
                text       : 'Link',
                design     : 'primary',
                size       : 'small',
                iconToggle : false,
            }
        ]
    },

};

export default schema;
