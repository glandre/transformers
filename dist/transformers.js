'use strict';

var _war = require('./war');

var _war2 = _interopRequireDefault(_war);

var _transformer = require('./transformer');

var _transformer2 = _interopRequireDefault(_transformer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Executes the command line interface for the program
//
(function run() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // handle stdin read line events
  process.stdin.on('data', function (chunk) {
    try {
      var lines = chunk.split('\n');
      var transformers = [];
      lines.forEach(function (line) {
        try {
          if (line) {
            transformers.push(_transformer2.default.create(line));
          }
        } catch (error) {
          // invalid transformer
          console.log('[' + line + ']: Invalid Transformer (did not take part of the war): ' + error.message);
        }
      });

      var war = _war2.default.create(transformers);
      war.happen();
      console.log(war.summary());
    } catch (error) {
      console.log('\nThe file could not be processed...');
      console.log(error.message);
      console.log(error);
    } finally {
      process.exit(0);
    }
  });
})();