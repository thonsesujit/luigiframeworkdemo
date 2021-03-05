//you can now use ES6 goodies here
Luigi.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: 'openui5.html#/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: 'sample1/sample1.html'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: 'sample2/sample2.html'
          },
          {
            pathSegment: 'order',
            label: 'Order History',
            icon: 'history',
            viewUrl: 'http://localhost:8082/index.html'
          },
          {
            pathSegment: 'garage',
            label: 'Garage App',
            icon: 'vehicle-repair',
            viewUrl: 'http://localhost:8083/index.html'
          },
          {
            pathSegment: 'supplier',
            label: 'Supplier App',
            icon: 'supplier',
            viewUrl: 'http://localhost:8084/index.html'
          },
          {
            category: { label: 'Links', icon: 'cloud' },
            label: 'Luigi Project',
            externalLink: {
              url: 'https://luigi-project.io/'
            }
          },
          {
            category: 'Links',
            label: 'OpenUI5',
            externalLink: {
              url: 'https://openui5.hana.ondemand.com/'
            }
          }
        ]
      }
    ]
  },
  // uncomment if you want to use our mock oidc idp

  // auth: {
  //   // We have registered the following provider at the window object:
  //   // OAuth2 Implicit Grant: window.LuigiAuthOAuth2 - Docs: https://docs.luigi-project.io/docs/authorization-configuration?section=oauth2-implicit-grant-configuration
  //   // OIDC Implicit Grant: window.LuigiAuthOIDC - Docs: https://docs.luigi-project.io/docs/authorization-configuration/?section=openid-connect-configuration

  //   use: 'myOAuth2',
  //   myOAuth2: {
  //     idpProvider: window.LuigiAuthOAuth2,
  //     authorizeUrl: '/auth/idpmock/implicit.html',
  //     logoutUrl: '/auth/idpmock/logout.html',
  //     post_logout_redirect_uri: '/auth/logout.html',
  //     authorizeMethod: 'GET',
  //     oAuthData: {
  //       client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
  //       redirect_uri: '/auth/callback.html'
  //     }
  //   }
  // },
  routing: {
    /**
     * Development:
     * For path routing, set to false
     * For hash routing, set to true
     */
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'Luigi OpenUI5',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
