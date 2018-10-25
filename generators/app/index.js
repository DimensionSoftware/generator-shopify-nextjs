'use strict';
const Generator = require('yeoman-generator');
// Const chalk = require('chalk');
// const yosay = require('yosay');

module.exports = class extends Generator {
  writing() {
    const files = [
      'bin',
      'components',
      'data',
      'lib',
      'pages',
      'LICENSE',
      'next.config.js',
      'package.json',
      'README.md',
      'server.js'
    ];
    files.forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });
  }

  install() {
    this.installDependencies();
  }
};
