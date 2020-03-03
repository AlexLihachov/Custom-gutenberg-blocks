export const schema = {
    numbers : {
        type    : 'array',
        default : [
            {
                count         : 1,
                text          : "",
                size          : "large",
                use           : "circle",
                percent       : false,
                circle_size   : "214",
                circle_indent : "107",
                circle_radius : "104",
                circle_offset : 653,
                iconColor     : "#38484f"
            }
        ]
    },

    settings : {
        type    : 'object',
        default : {
            bg : false,
        }
    },


};

export default schema;
