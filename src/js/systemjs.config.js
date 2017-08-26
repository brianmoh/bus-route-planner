/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'js/lib/@angular/core/bundles/core.umd.js',
      '@angular/common': 'js/lib/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'js/lib/@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'js/lib/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'js/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'js/lib/@angular/http/bundles/http.umd.js',
      '@angular/router': 'js/lib/@angular/router/bundles/router.umd.js',
      '@angular/forms': 'js/lib/@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'js/lib/rxjs'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: 'bootstrap.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
