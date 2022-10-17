export default {
    name: 'ingridient',
    titile: 'ingridient',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'ingridient name',
            type: 'string'
        },
        {
            name: 'image',
            title: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'notes',
            title: 'notes',
            type: 'text'
        },
    ]
}