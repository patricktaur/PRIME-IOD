(function(window) {
  window.bootstrapSettings = {
    production: true,
    hmr: false, //false for production
    version: 'V1', //env.npm_package_version + '-dev',
    appVersion: '0.0.00',
    site: 'devp', 
    serverUrl: 'http://localhost:8090',
    winAuthUrl: 'http://localhost:8091',
    defaultLanguage: 'en-US',
    supportedLanguages: ['en-US', 'fr-FR'],
    loginMode: 'win' // 'win' / 'pwd'
  };
})(this);
