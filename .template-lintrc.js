/* eslint-env node */

'use strict';

module.exports = {
    extends: 'recommended',

    rules: {
        'block-indentation': 4,
        'no-bare-strings': true,
        'no-nested-interactive': false,
    },

    ignore: [
        '**/lib/handbook/**/*',
    ],
};
