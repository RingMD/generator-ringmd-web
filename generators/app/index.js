'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var camelcase = require('camelcase');
var uppercamelcase = require('uppercamelcase');
var path = require('path');

var folderNames = {
  component: 'components',
  page: 'pages',
  service: 'services',
  mixin: 'mixins'
};

function basePath(props) {
  // i.e. src/components/supertable/supertable
  var p = path.join(
    this.srcPath,
    folderNames[props.type],
    props.name,
    props.name
  );

  return p;
}

module.exports = yeoman.Base.extend({

  // http://yeoman.io/authoring/user-interactions.html
  constructor: function() {
    // super
    yeoman.Base.apply(this, arguments);

    this.argument('srcPath', {
      type: String,
      optional: true,
      desc: 'Target source path',
      defaults: 'src/app'
    });
  },

  prompting: function() {
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
          {name: 'Service', value: 'service'},
          {name: 'Mixin', value: 'mixin'}
          // TODO: Popup
        ]
      },
      {
        type: 'confirm',
        name: 'isExtension',
        message: 'Is it for an extension? I.e. ringwell',
        default: false
      },
      {
        type: 'input',
        name: 'extensionName',
        message: 'What is the extension name?',
        default: 'ringwell',
        when: function when(answers) {
          return answers.isExtension;
        }
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
        default: false,
        when: function when(answers) {
          return answers.type === 'component' || answers.type === 'page';
        }
      },
      {
        type: 'confirm',
        name: 'hasController',
        message: 'Should it have a controller?',
        default: true,
        when: function when(answers) {
          return answers.type === 'component';
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

    if (prop.isExtension && props.extensionName) {
      this.srcPath = 'extensions/' + props.extensionName + '/app';
    }

    props._modules = [];
    props._basePath = basePath.call(this, props);

    // cross-platform (/ or \)
    props._templatePath = props._basePath.replace(this.srcPath + path.sep, '');

    // https://github.com/mgechev/angularjs-style-guide#naming-conventions
    props._camelizedName = camelcase(props.name);
    props._upperCamelizedName = uppercamelcase(props.name);

    if (props.type === 'component') {
      props._modules.push(props.name + '.directive');

      this.fs.copyTpl(
        this.templatePath('directive.js'),
        this.destinationPath(props._basePath + '.directive.js'),
        props
      );

      if (props.hasTemplate) {
        this.fs.copyTpl(
          this.templatePath('template.pug'),
          this.destinationPath(props._basePath + '.directive.pug'),
          props
        );
      }

      if (props.hasController) {
        props._modules.push(props.name + '.ctrl');

        this.fs.copyTpl(
          this.templatePath('ctrl.js'),
          this.destinationPath(props._basePath + '.ctrl.js'),
          props
        );
      }

    } else if (props.type === 'page') {
      props._modules.push(props.name + '.route');
      props._modules.push(props.name + '.ctrl');

      this.fs.copyTpl(
        this.templatePath('route.js'),
        this.destinationPath(props._basePath + '.route.js'),
        props
      );

      this.fs.copyTpl(
        this.templatePath('ctrl.js'),
        this.destinationPath(props._basePath + '.ctrl.js'),
        props
      );

      this.fs.copyTpl(
        this.templatePath('template.pug'),
        this.destinationPath(props._basePath + '.ctrl.pug'),
        props
      );

    } else if (props.type === 'mixin') {
      props._modules.push(props.name + '.mixin');

      props._camelizedName += 'Mixin';
      props._upperCamelizedName += 'Mixin';

      this.fs.copyTpl(
        this.templatePath('mixin.js'),
        this.destinationPath(props._basePath + '.mixin.js'),
        props
      );
    }

    if (props.type === 'service' || props.hasService) {
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
  }
});
