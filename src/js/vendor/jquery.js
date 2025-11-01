// Local jQuery wrapper: re-exports the npm 'jquery' package and attaches it to window
// This file allows us to point ProvidePlugin to a local module if desired.
const jQuery = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = jQuery;
}
module.exports = jQuery;
