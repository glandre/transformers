class War {
  constructor (transformers) {
    this.decepticons = []
    this.autobots = []

    // Rule 1: sort transformers by rank (desc)
    transformers.sort((t1, t2) => t2.rank - t1.rank)

    for (const transformer of transformers) {
      if (transformer.team === 'A') {
        this.autobots.push(transformer)
      } else if (transformer.team === 'D') {
        this.decepticons.push(transformer)
      } else {
        throw Error('Invalid team!')
      }
    }

    // the number of the battles is equal
    // to the size of the smaller team
    this.maxBattles = this.autobots.length < this.decepticons.length
      ? this.autobots.length
      : this.decepticons.length
    this.totalBattles = 0

    // each autobot win adds one to the score
    // each decepticon win removes one to the score
    this.score = 0
    this.epicBattle = false
  }

  happen () {
    for (let i = 0; i < this.maxBattles; i++) {
      if (this.epicBattle) {
        break
      }
      this.computeBattle(i)
    }
  }

  summary () {
    return `${this.battleSummary()}\n${this.resultSummary()}\n${this.survivingLosers()}`
  }

  computeBattle (i) {
    if (i < 0 || i > this.maxBattles) {
      throw Error('Something unexpected: trying to check a battle that did not happened!')
    }

    this.totalBattles++

    const autobot = this.autobots[i]
    const decepticon = this.decepticons[i]

    // Special Rules
    let autobotRules = false
    let decepticonRules = false

    const whoRules = ['Optimus Prime', 'Predaking']
    if (whoRules.indexOf(autobot.name) !== -1) {
      autobotRules = true
    }
    if (whoRules.indexOf(decepticon.name) !== -1) {
      decepticonRules = true
    }

    // if there is a boss in the battle...
    if (autobotRules || decepticonRules) {
      // if both are boss...
      if (autobotRules && decepticonRules) {
        // all competitors destroyed!
        // game is over and tied
        this.epicBattle = true
        this.score = 0
      } else if (autobotRules) {
        // autobot wins
        this.score++
      } else {
        // decepticon wins
        this.score--
      }
      // battle is over!
      return
    }

    // Rule 2.1: opponent run away
    // if score is positive, then autobot is winning
    // if score is negative, then decepticon is winning
    const courageScore = autobot.courage - decepticon.courage
    const strengthScore = autobot.strength - decepticon.strength

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
            this.score++
          } else {
            // autobot run away
            // decepticon wins
            this.score--
          }
          // either way, the battle is over.
          return
        }
      }
    }

    // Rule 2.2: skill
    // if the difference between their skills are 3 or above
    if (Math.abs(autobot.skill - decepticon.skill) >= 3) {
      if (autobot.skill > decepticon.skill) {
        // autobot wins
        this.score++
      } else {
        // decepticon wins
        this.score--
      }
      // battle is over
      return
    }

    // Rule 2.3: overall rating
    const overallScore = autobot.overallRating() - decepticon.overallRating()
    if (overallScore > 0) {
      // autobot wins
      this.score++
    } else if (overallScore < 0) {
      // decepticon wins
      this.score--
    } else {
      // both are destoryed
      // no score difference
    }
  }

  battleSummary () {
    const suffix = this.totalBattles === 1 ? 'battle' : 'battles'
    return `${this.totalBattles} ${suffix}`
  }

  resultSummary () {
    let teamName = ''
    let team = this.autobots // by reference
    let tie = false
    if (this.score > 0) {
      teamName = '(Autobots)'
    } else if (this.score < 0) {
      teamName = '(Decepticons)'
      team = this.decepticons
    } else {
      tie = true
    }
    return tie ? 'Draw' : `Winning team ${teamName}: ${team.map(transformer => transformer.name).join(', ')}`
  }

  //
  // Returns a string representing the surviving members of the losing team
  //
  survivingLosers () {
    let losing = ''
    let teamTerm = ''
    let largerTeam = null

    if (this.epicBattle) {
      return 'No one survived'
    }

    if (this.score === 0) {
      return 'No losing team'
    }

    if (this.score !== 0) {
      losing = 'losing '
      if (this.score > 0) {
        // losing team is...
        teamTerm = ' (Decepticons)'
        // if losing team was larger...
        if (this.autobots.length < this.decepticons.length) {
          largerTeam = this.decepticons
        }
      } else {
        // losing team is...
        teamTerm = ' (Autobots)'
        // if losing team was larger...
        if (this.decepticons.length < this.autobots.length) {
          largerTeam = this.autobots
        }
      }
    }
    const team = largerTeam ? largerTeam.slice(this.maxBattles).map(transformer => transformer.name).join(', ') : 'No one'
    return `Survivors from the ${losing}team${teamTerm}: ${team}`
  }
}

const create = (transformers) => new War(transformers)

export default {
  create
}
