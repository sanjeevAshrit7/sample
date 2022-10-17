import { Card, Grid, Col, Row, Text } from '@nextui-org/react';
import Head from 'next/head'
import Link from 'next/link'
// import { Card, Col, Grid, Row, Text } from "@nextui-org/react";

import { sanityClient, SanityClient, urlFor } from '../lib/sanity';


const recipesQuery = '*[_type == "recipe"]{ _id,name,slug,mainImage,}'

export default function Home({ recipes }) {

  return (
    <div>
      <Head>
        <title>
          San's Kitchen
        </title>
      </Head>
      <h1>our recipes</h1>
      {/* <ul>
        {
          recipes?.length > 0 && recipes.map((recipe) => {
            return (
              <li>
                <Link href={'/'}>
                  <a href='/'>
                    <img src={urlFor(recipe.mainImage)} />
                    <span>{recipe.name}</span>
                  </a>
                </Link>
              </li>
            )
          })
        }
      </ul> */}
      <Grid.Container gap={2} justify="flex-start">
        {
          recipes?.length > 0 && recipes.map((recipe, index) => {
            // console.log('recipe', recipe)
            return (
              <Grid xs={6} sm={3} key={index}>
                <Card
                  isPressable
                >
                  <a href={`/recipes/${recipe.slug.current}`}>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={urlFor(recipe.mainImage)}
                        objectFit="cover"
                        width="100%"
                        height={140}
                        alt={'NA'}
                      />
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }}>
                      <Col>
                        <Row wrap="wrap" justify="space-between" align="center">
                          <Text b>{recipe.name}</Text>
                        </Row>
                      </Col>
                    </Card.Footer>
                  </a>
                </Card>
              </Grid>
            )
          })
        }
      </Grid.Container>
    </div>
  )
};

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery)
  return {
    props: {
      recipes
    }
  }
}
