import War from './war'
import Transformer from './transformer'
//
// Executes the command line interface for the program
//
(function run () {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  // handle stdin read line events
  process.stdin.on('data', (chunk) => {
    try {
      const lines = chunk.split('\n')
      let transformers = []
      lines.forEach((line) => {
        try {
          if (line) {
            transformers.push(Transformer.create(line))
          }
        } catch (error) {
          // invalid transformer
          console.log('[' + line + ']: Invalid Transformer (did not take part of the war): ' + error.message)
        }
      })

      const war = War.create(transformers)
      war.happen()
      console.log(war.summary())
    } catch (error) {
      console.log('\nThe file could not be processed...')
      console.log(error.message)
      console.log(error)
    } finally {
      process.exit(0)
    }
  })
}())
