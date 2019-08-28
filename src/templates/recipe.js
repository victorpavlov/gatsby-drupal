import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Recipe from '../components/Recipe/Recipe';
import RecipeTeaser from '../components/RecipeTeaser/RecipeTeaser';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import DrupalOauthContext from '../components/drupal-oauth/DrupalOauthContext';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const recipeTemplate = (props) => {
  const { classes } = props;
  const { nodeRecipe: recipe } = props.data;

  const recipeClean = {
    drupal_id: recipe.drupal_id,
    title: recipe.title,
    difficulty: recipe.difficulty,
    cooking_time: recipe.cooking_time,
    preparation_time: recipe.preparation_time,
    category: recipe.relationships.category[0].name,
    tags: recipe.relationships.tags,
    summary: recipe.summary.processed,
    image: recipe.relationships.image,
  };

  return (
    <Layout>
      <Helmet
        title={`Umami - ${recipe.title}`}
        meta={[
          {name: 'description', content: recipe.title},
        ]}
      />
      <Paper className={classes.root}>
        <DrupalOauthContext.Consumer>
          {({userAuthenticated}) => (
            userAuthenticated ? <Recipe {...recipeClean} /> : <RecipeTeaser {...recipeClean} />
          )}
        </DrupalOauthContext.Consumer>
      </Paper>
    </Layout>
  )
};

export default withStyles(styles)(recipeTemplate);

// The $drupal_id variable here is obtained from the "context" object passed into
// the createPage() API in gatsby-node.js.
//
// Also note the use of field name aliasing in the query. This is done to
// help normalize the shape of the recipe data.
export const query = graphql`
  query RecipeTemplate($drupal_id: String!) {
    nodeRecipe(drupal_id: {eq: $drupal_id}) {
      drupal_id,
      title,
      cooking_time: field_cooking_time,
      difficulty: field_difficulty,
      preparation_time: field_preparation_time,
      number_of_servings: field_number_of_servings,
      summary: field_summary {
        processed,
      },
      relationships {
        category: field_recipe_category {
          name,
        }
        tags: field_tags {
          name,
        }
        image: field_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
