'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var folderNames = {
  component: 'components',
  page: 'pages',
  generic: ''
};

function basePath(props) {
  return folderNames[props.type] + '/' + props.name + '/' + props.name;
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-ringmd-web') + ' for ' + chalk.green('folders and files') + '!'
    ));

    var prompts = [
      {
        type: 'list',
        name: 'type',
        message: 'What are you creating?',
        choices: [
          {name: 'Component (directive)', value: 'component'},
          {name: 'Page (route, controller, template)', value: 'page'},
          {name: 'Generic (service, decorator, filter, etc)', value: 'generic'}
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name?'
      },
      {
        type: 'confirm',
        name: 'hasTemplate',
        message: 'Should it have a template?',
        default: true,
        when: function when(answers) {
          return answers.type === 'component';
        }
      },
      {
        type: 'confirm',
        name: 'hasService',
        message: 'Should it have a service (DAO)?',
        default: true,
        when: function when(answers) {
          return answers.type === 'component' || answers.type === 'page';
        }
      },
      {
        type: 'confirm',
        name: 'isConfigurable',
        message: 'Should it be configurable?',
        default: false
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var props = this.props;

    props._modules = [];
    props._basePath = basePath(props);
    props._capitalizedName = props.name.charAt(0).toUpperCase() + props.name.slice(1);

    if (props.type === 'component') {
      props._modules.push(props.name + '.directive');

      this.fs.copyTpl(
        this.templatePath('directive.js'),
        this.destinationPath(props._basePath + '.directive.js'),
        props
      );

      if (props.hasTemplate) {
        this.fs.copyTpl(
          this.templatePath('template.html.haml'),
          this.destinationPath(props._basePath + '.directive.html.haml'),
          props
        );
      }

    } else if (props.type === 'page') {
      props._modules.push(props.name + '.route');
      props._modules.push(props.name + '.controller');

      this.fs.copyTpl(
        this.templatePath('route.js'),
        this.destinationPath(props._basePath + '.route.js'),
        props
      );

      this.fs.copyTpl(
        this.templatePath('controller.js'),
        this.destinationPath(props._basePath + '.controller.js'),
        props
      );

      this.fs.copyTpl(
        this.templatePath('template.html.haml'),
        this.destinationPath(props._basePath + '.controller.html.haml'),
        props
      );

    }

    if (props.type === 'generic' || props.hasService) {
      props._modules.push(props.name + '.service');

      // user can rename the file manually
      this.fs.copyTpl(
        this.templatePath('service.js'),
        this.destinationPath(props._basePath + '.service.js'),
        props
      );
    }

    if (props.isConfigurable) {
      props._modules.push(props.name + '.config');

      this.fs.copyTpl(
        this.templatePath('config.js'),
        this.destinationPath(props._basePath + '.config.js'),
        props
      );
    }

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(props._basePath + '.module.js'),
      props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
