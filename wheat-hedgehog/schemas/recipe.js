export default {
    name: 'recipe',
    titile: 'recipe',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Recipe name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxlength: 96,

            }
        },
        {
            name: 'chef',
            title: 'chef',
            type: 'reference',
            to: { type: 'chef'}
        },
        {
            name: 'mainImage',
            title: 'Recipe Main Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'ingridient',
            title: 'Ingridient',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'ingrident',
                            title: 'ingridient',
                            type: 'reference',
                            to: [{type: 'ingridient'}]
                        },
                        {
                            name: 'wholeNumber',
                            title: 'Whole number',
                            type: 'number',

                        },
                        {
                            name:  'fraction',
                            title:  'Fraction',
                            type: 'string',
                            options: {
                                list: ['1/2','1/3','1/4', '3/4']
                            }
                        },
                        {
                            name: 'unit',
                            title: 'Unit',
                            type: 'string',
                            options: {
                                list: ['grams', 'cup', 'tbspn', 'tsp']
                            },
                        },
                    ],
                    preview: {
                        select: {
                            title: "ingrident.name",
                            name: "ingrident.name",
                            media: "ingrident.image",
                            wholeNumber: 'wholeNumber',
                            fraction: 'fraction',
                            unit: 'unit'
                        },
                        prepare({
                            title,
                            subtitle,
                            media,
                            wholeNumber="(No Whole Number Set)",
                            fraction= '(No fraction Set)',
                            unit= '(No unit Set)',
                        }) {
                            return {
                                title,
                                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                                media
                            }
                        }
                    }
                }
            ]
        },
        {
            name: 'instructions',
            title: 'instructions',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'likes',
            titile: 'Likes',
            type:  "number"
        }
    ],
    initialValue:  {
        likes: 0, 
    }
}