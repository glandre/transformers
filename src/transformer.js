//
// Transformer
// A transformer contains a name, some attributes, and is part of a team.
//
class Transformer {
  constructor (str) {
    Object.assign(this, parse(str))
  }

  overallRating () {
    return this.strength + this.intelligence + this.speed + this.endurance + this.firepower
  }
}

// Enum of Specs
const Specs = {
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
  specName: (spec) => {
    switch (spec) {
      case this.NAME: return 'name'
      case this.TEAM: return 'team'
      case this.STRENGTH: return 'strength'
      case this.INTELLIGENCE: return 'intelligence'
      case this.SPEED: return 'speed'
      case this.ENDURANCE: return 'endurance'
      case this.RANK: return 'rank'
      case this.COURAGE: return 'courage'
      case this.FIREPOWER: return 'firepower'
      case this.SKILL: return 'skill'
    }
    throw Error('Invalid Spec')
  }
}

function parse (str) {
  let errors = []

  // split for both ',' and ':'
  let items = str.split(/,|:/).map(item => item.trim())

  // validate the number of items
  if (items.length !== 10) {
    throw Error('Insuficient fields!')
  }

  // validate the 'team' field (must be A or D)
  if (['A', 'D'].indexOf(items[1]) === -1) {
    errors.push(`${items[1]} is an invalid team`)
  }

  // validate tech specs
  for (let i = 2; i < items.length; i++) {
    if (isNaN(items[i])) {
      errors.push(`${items[i]} is invalid for ${Specs.specName(i)}`)
    } else {
      items[i] = parseInt(items[i], 10)
      if (items[i] < 1 || items[i] > 10) {
        errors.push(`${Specs.specName(i)} should be a value between 1 and 10`)
      }
    }
  }

  if (errors.length) {
    throw Error(errors.join(' / '))
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
  }
}

const create = (str) => new Transformer(str)

export default {
  create,
  Specs
}
