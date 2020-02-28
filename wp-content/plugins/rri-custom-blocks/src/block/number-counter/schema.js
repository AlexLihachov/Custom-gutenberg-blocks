export const schema = {
    numbers : {
        type    : 'array',
        default : [
            {
                count         : 0,
                text          : "",
                size          : "large",
                use           : "circle",
                percent       : false,
                circle_size   : "214",
                circle_indent : "107",
                circle_radius : "104",
                circle_offset : "653",
                // titleColor: "#000",
                image         : {
                    url : '',
                    id  : '',
                },
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
