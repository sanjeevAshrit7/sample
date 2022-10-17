export default {
    name: 'chef',
    titile: 'chef',
    type: 'document',
    fields: [
        {
            name: 'chef',
            title: `Chef's name`,
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options : {
                    hotspot: true
                },
        },
        {
            name: 'bio',
            title: 'Bio',
            type:  "array",
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [{title: "Normal", value: 'normal'}],
                    lists: []
                },
            ]
        },
    ]
}