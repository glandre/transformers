'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var War = function () {
  function War(transformers) {
    _classCallCheck(this, War);

    this.decepticons = [];
    this.autobots = [];

    // Rule 1: sort transformers by rank (desc)
    transformers.sort(function (t1, t2) {
      return t2.rank - t1.rank;
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = transformers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var transformer = _step.value;

        if (transformer.team === 'A') {
          this.autobots.push(transformer);
        } else if (transformer.team === 'D') {
          this.decepticons.push(transformer);
        } else {
          throw Error('Invalid team!');
        }
      }

      // the number of the battles is equal
      // to the size of the smaller team
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.maxBattles = this.autobots.length < this.decepticons.length ? this.autobots.length : this.decepticons.length;
    this.totalBattles = 0;

    // each autobot win adds one to the score
    // each decepticon win removes one to the score
    this.score = 0;
    this.epicBattle = false;
  }

  _createClass(War, [{
    key: 'happen',
    value: function happen() {
      for (var i = 0; i < this.maxBattles; i++) {
        if (this.epicBattle) {
          break;
        }
        this.computeBattle(i);
      }
    }
  }, {
    key: 'summary',
    value: function summary() {
      return this.battleSummary() + '\n' + this.resultSummary() + '\n' + this.survivingLosers();
    }
  }, {
    key: 'computeBattle',
    value: function computeBattle(i) {
      if (i < 0 || i > this.maxBattles) {
        throw Error('Something unexpected: trying to check a battle that did not happened!');
      }

      this.totalBattles++;

      var autobot = this.autobots[i];
      var decepticon = this.decepticons[i];

      // Special Rules
      var autobotRules = false;
      var decepticonRules = false;

      var whoRules = ['Optimus Prime', 'Predaking'];
      if (whoRules.indexOf(autobot.name) !== -1) {
        autobotRules = true;
      }
      if (whoRules.indexOf(decepticon.name) !== -1) {
        decepticonRules = true;
      }

      // if there is a boss in the battle...
      if (autobotRules || decepticonRules) {
        // if both are boss...
        if (autobotRules && decepticonRules) {
          // all competitors destroyed!
          // game is over and tied
          this.epicBattle = true;
          this.score = 0;
        } else if (autobotRules) {
          // autobot wins
          this.score++;
        } else {
          // decepticon wins
          this.score--;
        }
        // battle is over!
        return;
      }

      // Rule 2.1: opponent run away
      // if score is positive, then autobot is winning
      // if score is negative, then decepticon is winning
      var courageScore = autobot.courage - decepticon.courage;
      var strengthScore = autobot.strength - decepticon.strength;

      // if there is a difference of 4
      // between their courage
      if (Math.abs(courageScore) >= 4) {
        // if there is a difference of 3
        // between their strength
        if (Math.abs(strengthScore) >= 3) {
          // if the two differences
          // balance on the same side
          // nagative * negative = positive
          // positive * positive = positive
          if (courageScore * strengthScore > 0) {
            // the battle is over
            // from this point, both courageScore
            // and strengthScore is guaranteed to have the same sign
            // (both negative or both positive)
            if (courageScore > 0) {
              // decepticon run away
              // autobot wins
              this.score++;
            } else {
              // autobot run away
              // decepticon wins
              this.score--;
            }
            // either way, the battle is over.
            return;
          }
        }
      }

      // Rule 2.2: skill
      // if the difference between their skills are 3 or above
      if (Math.abs(autobot.skill - decepticon.skill) >= 3) {
        if (autobot.skill > decepticon.skill) {
          // autobot wins
          this.score++;
        } else {
          // decepticon wins
          this.score--;
        }
        // battle is over
        return;
      }

      // Rule 2.3: overall rating
      var overallScore = autobot.overallRating() - decepticon.overallRating();
      if (overallScore > 0) {
        // autobot wins
        this.score++;
      } else if (overallScore < 0) {
        // decepticon wins
        this.score--;
      } else {
        // both are destoryed
        // no score difference
      }
    }
  }, {
    key: 'battleSummary',
    value: function battleSummary() {
      var suffix = this.totalBattles === 1 ? 'battle' : 'battles';
      return this.totalBattles + ' ' + suffix;
    }
  }, {
    key: 'resultSummary',
    value: function resultSummary() {
      var teamName = '';
      var team = this.autobots; // by reference
      var tie = false;
      if (this.score > 0) {
        teamName = '(Autobots)';
      } else if (this.score < 0) {
        teamName = '(Decepticons)';
        team = this.decepticons;
      } else {
        tie = true;
      }
      return tie ? 'Draw' : 'Winning team ' + teamName + ': ' + team.map(function (transformer) {
        return transformer.name;
      }).join(', ');
    }

    //
    // Returns a string representing the surviving members of the losing team
    //

  }, {
    key: 'survivingLosers',
    value: function survivingLosers() {
      var losing = '';
      var teamTerm = '';
      var largerTeam = null;

      if (this.epicBattle) {
        return 'No one survived';
      }

      if (this.score === 0) {
        return 'No losing team';
      }

      if (this.score !== 0) {
        losing = 'losing ';
        if (this.score > 0) {
          // losing team is...
          teamTerm = ' (Decepticons)';
          // if losing team was larger...
          if (this.autobots.length < this.decepticons.length) {
            largerTeam = this.decepticons;
          }
        } else {
          // losing team is...
          teamTerm = ' (Autobots)';
          // if losing team was larger...
          if (this.decepticons.length < this.autobots.length) {
            largerTeam = this.autobots;
          }
        }
      }
      var team = largerTeam ? largerTeam.slice(this.maxBattles).map(function (transformer) {
        return transformer.name;
      }).join(', ') : 'No one';
      return 'Survivors from the ' + losing + 'team' + teamTerm + ': ' + team;
    }
  }]);

  return War;
}();

var create = function create(transformers) {
  return new War(transformers);
};

exports.default = {
  create: create
};