# ember-cli-i18n-csv

Create a CSV file to manage your translations. For use with [ember-cli-i18n](https://github.com/dockyard/ember-cli-i18n).

##Installation

Depends on node version 0.12.0 for `path.isAbsolute`

First run `npm install`

##Usage

`node to-csv.js path\to\locales`

This creates a file named `i18n.csv` in your working dir. You can send it out to your translators. When you get it back, replace it with the old one and run the following command.

`node to-js.js path\to\locales`

This will update your locale js files with the new translations.
