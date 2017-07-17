'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// Transformer
// A transformer contains a name, some attributes, and is part of a team.
//
var Transformer = function () {
  function Transformer(str) {
    _classCallCheck(this, Transformer);

    Object.assign(this, parse(str));
  }

  _createClass(Transformer, [{
    key: 'overallRating',
    value: function overallRating() {
      return this.strength + this.intelligence + this.speed + this.endurance + this.firepower;
    }
  }]);

  return Transformer;
}();

// Enum of Specs


var Specs = {
  NAME: 0,
  TEAM: 1,
  STRENGTH: 2,
  INTELLIGENCE: 3,
  SPEED: 4,
  ENDURANCE: 5,
  RANK: 6,
  COURAGE: 7,
  FIREPOWER: 8,
  SKILL: 9,
  specName: function specName(spec) {
    switch (spec) {
      case undefined.NAME:
        return 'name';
      case undefined.TEAM:
        return 'team';
      case undefined.STRENGTH:
        return 'strength';
      case undefined.INTELLIGENCE:
        return 'intelligence';
      case undefined.SPEED:
        return 'speed';
      case undefined.ENDURANCE:
        return 'endurance';
      case undefined.RANK:
        return 'rank';
      case undefined.COURAGE:
        return 'courage';
      case undefined.FIREPOWER:
        return 'firepower';
      case undefined.SKILL:
        return 'skill';
    }
    throw Error('Invalid Spec');
  }
};

function parse(str) {
  var errors = [];

  // split for both ',' and ':'
  var items = str.split(/,|:/).map(function (item) {
    return item.trim();
  });

  // validate the number of items
  if (items.length !== 10) {
    throw Error('Insuficient fields!');
  }

  // validate the 'team' field (must be A or D)
  if (['A', 'D'].indexOf(items[1]) === -1) {
    errors.push(items[1] + ' is an invalid team');
  }

  // validate tech specs
  for (var i = 2; i < items.length; i++) {
    if (isNaN(items[i])) {
      errors.push(items[i] + ' is invalid for ' + Specs.specName(i));
    } else {
      items[i] = parseInt(items[i], 10);
      if (items[i] < 1 || items[i] > 10) {
        errors.push(Specs.specName(i) + ' should be a value between 1 and 10');
      }
    }
  }

  if (errors.length) {
    throw Error(errors.join(' / '));
  }

  return {
    name: items[0],
    team: items[1],
    strength: items[2],
    intelligence: items[3],
    speed: items[4],
    endurance: items[5],
    rank: items[6],
    courage: items[7],
    firepower: items[8],
    skill: items[9]
  };
}

var create = function create(str) {
  return new Transformer(str);
};

exports.default = {
  create: create,
  Specs: Specs
};