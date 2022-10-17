import {
    sanityClient,
    urlFor,
    usePreviewSubscription
} from '../../lib/sanity';
import { PortableText } from '@portabletext/react'
import { Card, Col, Container, Grid, Image, Row, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/router';


const recipeQuery = `*[_type == "recipe" && slug.current == $slug] [0] {
    _id,
    name,
    slug,
    mainImage,
    chef,
    ingridient [] {
        _key,
        unit,
        wholeNumber,
        fraction,
        ingrident -> {
            name,
            image
        }
    },
    instructions ,
    likes
}`;

export default function OneRecipe({ data }) {
    const { recipe } = data;
    const [likes, setLikes] = useState(data?.recipe?.likes);
    const router = useRouter();

    if(router?.isFallback) {
        return(
            <div>
                Loading ....
            </div>
        )
    }

    const addLikes = async () => {
        const res = await fetch('/api/handle-likes', {
            method: 'POST',
            body: JSON.stringify({_id: recipe?._id})
        }
        ).catch((error) => console.log(error))

        const data = await res.json();

        setLikes(data?.likes);  
    }
    // console.log('recipe', recipe)
    // console.log('data', data)
    return (
        <article>
            <h1>{recipe?.name}</h1>
            <button
                onClick={addLikes}
                className={'like-button'}
            >
                {likes} ❤️
            </button>
            <main>
                {/* <img src={urlFor(recipe?.mainImage).url()} /> */}
                <div>
                    <Card css={{ backgroundColor: '$accents4'}}>
                        <Card.Header>
                            <Card.Image
                                src={urlFor(recipe?.mainImage)}
                                objectFit='contain'
                                width="100%"
                                height={140}
                                alt={'NA'}
                            />
                            <Grid.Container css={{ backgroundColor: '$accents1', px: '$10' }} >
                                <Col>
                                <h4>Ingridients for {recipe?.name}</h4>
                                {recipe?.ingridient?.map((ingridient) => {
                                    console.log('ingridient',ingridient)
                                    return (
                                        <Row css={{alignItems: 'center', justifyContent: 'flex-start', alignSelf: 'center'}} key={ingridient?._key}>
                                            {/* <Image src={urlFor(ingridient?.ingrident?.image)} alt={'NA'} height={20} width={30}/> */}
                                            <Text h4 css={{}}>
                                            <Image src={urlFor(ingridient?.ingrident?.image)} alt={'NA'} height={20} width={30}/>
                                            ({ingridient?.wholeNumber})
                                            {ingridient?.fraction}
                                            {" "}
                                            {ingridient?.unit}
                                            {""}
                                            {ingridient?.ingrident?.name}
                                            </Text>
                                        </Row>
                                    )
                                })
                                }
                                </Col>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body>
                            <Card.Body css={{backgroundColor: '$primary', flexDirection: 'column', width: 'stretch', marginRight: '$10', borderRadius: '$base',}}>
                                <Col justify="center" align="center">
                                    <Text h6 size={15} color="white" css={{ m: 0, textAlign: 'justify' }}>
                                        {/* NextUI gives you the best developer experience with all the features
                                        you need for building beautiful and modern websites and
                                        applications. */}
                                        <PortableText
                                            value={recipe?.instructions}
                                        />
                                    </Text>
                                </Col>
                            </Card.Body>
                    </Card.Body>
                    </Card>
                    {/* <PortableText
                        value={recipe?.instructions}
                    /> */}
                </div>
            </main>
        </article>
    )
}


export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current 
            }
        }`
    );
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const recipe = await sanityClient.fetch(recipeQuery, { slug })
    return {
        props: {
            data: { recipe }
        }
    }
}