'use strict';
const Generator = require('yeoman-generator');
/* // const chalk = require('chalk'); */
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: false });

    if (!this.options.name) {
      this.options.name = 'app';
    }
    console.log(yosay(`Generating a shopify-nextjs app named ${this.options.name}`));
  }

  writing() {
    const files = [
      'bin',
      'components',
      'data',
      'lib',
      'pages',
      'LICENSE',
      'next.config.js',
      'server.js',
      '.repl.js'
    ];

    const templates = ['README.md', 'package.json'];

    files.forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });
    this.fs.copy(this.templatePath('.npmignore'), this.destinationPath('.gitignore'));
    templates.forEach(t => {
      this.fs.copyTpl(this.templatePath(t), this.destinationPath(t), this.options);
    });
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
