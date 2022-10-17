import {
    createClient,
    createPreviewSubscriptionHook,
    // createPortableTextComponent
} from 'next-sanity';

import imageUrlBuilder from '@sanity/image-url';

const config ={
    projectId: 'ubhj5lzk',
    dataset: 'production',
    apiVersion: '2022-10-13',
    useCdn: false
}

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => imageUrlBuilder(config).image(source)
// const builder = imageUrlBuilder(config).image

// export function urlFor(source) {
//   return builder.image(source)
// }
// export const portableText = createPortableTextComponent({
//     ...config,
//     serializers: {}
// })

