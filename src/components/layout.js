/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from "gatsby"
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Navigation from "./Navigation/Navigation";
import drupalOauth from '../components/drupal-oauth/drupalOauth';
import withDrupalOauthProvider from '../components/drupal-oauth/withDrupalOauthProvider';

// Initialize a new drupalOauth client which we can use to seed the context
// provider.
const drupalOauthClient = new drupalOauth({
  drupal_root: 'http://drupal-gatsby.docksal',
  client_id: 'be1eca22-01d7-4a18-b3ff-c25a8390e4c9',
  client_secret: '123qweasdzxc',
});

// const styles = theme => ({
//   root: {
//     width: 'auto',
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
//       width: 1100,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },
// });

const Layout = (props) => {
  const {children} = props;
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {name: 'description', content: 'Sample'},
        {name: 'keywords', content: 'sample, something'},
      ]}
          >
        <html lang="en"/>
      </Helmet>
      <Container maxWidth="lg">
        <Navigation siteTitle={data.site.siteMetadata.title} />
        
        <Box component="main">
          {children}
        </Box>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withDrupalOauthProvider(drupalOauthClient, Layout);