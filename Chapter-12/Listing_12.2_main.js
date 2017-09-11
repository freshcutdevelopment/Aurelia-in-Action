export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use.plugin('aurelia-html-import-template-loader'); //add the HTML import loader plugin

  aurelia.start().then(a => a.setRoot());