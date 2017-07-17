/* global describe, it */
import assert from 'assert'
import Transformer from '../src/transformer'
import War from '../src/war'

describe('War', () => {
  describe('happen, summary and computeBattle', () => {
    describe('Rule 2.1: opponent run away', () => {
      it('Should compute one win for autobots by run away', () => {
        let transformers = []
        const aCourage = 5
        const dCourage = 1

        const aStrength = 5
        const dStrength = 2

        const aSkill = 6
        const dSkill = 9 // breaks Rule 2.2

        transformers.push(Transformer.create(`Bluestreak, D, ${dStrength},9,2,6,7,  ${dCourage}  ,6,${dSkill}`))
        transformers.push(Transformer.create(`Hubcap, A, ${aStrength},6,7,9,5,  ${aCourage}  ,9,${aSkill}`))

        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.summary(),
          '1 battle\nWinning team (Autobots): Hubcap\nSurvivors from the losing team (Decepticons): No one'
        )
      })
      it('Should compute one win for decepticons by run away', () => {
        let transformers = []
        const aCourage = 1
        const dCourage = 5

        const aStrength = 2
        const dStrength = 5

        const aSkill = 9
        const dSkill = 6 // breaks Rule 2.2

        transformers.push(Transformer.create(`Bluestreak, D, ${dStrength},9,2,6,7,  ${dCourage}  ,6,${dSkill}`))
        transformers.push(Transformer.create(`Hubcap, A, ${aStrength},6,7,9,5,  ${aCourage}  ,9,${aSkill}`))

        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.summary(),
          '1 battle\nWinning team (Decepticons): Bluestreak\nSurvivors from the losing team (Autobots): No one'
        )
      })
    })
    describe('Rule 2.2: skill', () => {
      it('Should compute one win for decepticon by skill', () => {
        let transformers = []
        const aCourage = 5
        const dCourage = 1

        const aStrength = 5
        const dStrength = 3 // breaks Rule 2.1

        const aSkill = 6
        const dSkill = 9

        transformers.push(Transformer.create(`Bluestreak, D, ${dStrength},9,2,6,7,  ${dCourage}  ,6,${dSkill}`))
        transformers.push(Transformer.create(`Hubcap, A, ${aStrength},6,7,9,5,  ${aCourage}  ,9,${aSkill}`))

        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.summary(),
          '1 battle\nWinning team (Decepticons): Bluestreak\nSurvivors from the losing team (Autobots): No one'
        )
      })
    })
    describe('Rule 2.3: overall rating', () => {
      it('Should compute one win for autobots by run away', () => {
        let transformers = []
        const aCourage = 5
        const dCourage = 1

        const aStrength = 5
        const dStrength = 3 // breaks Rule 2.1

        const aSkill = 6
        const dSkill = 8 // breaks Rule 2.2

        const decepticon = Transformer.create(`Bluestreak, D, ${dStrength},9,2,6,7,  ${dCourage}  ,6,${dSkill}`)
        assert.equal(
          decepticon.overallRating(),
          26
        )
        transformers.push(decepticon)
        const autobot = Transformer.create(`Hubcap, A, ${aStrength},6,7,9,5,  ${aCourage}  ,9,${aSkill}`)
        assert.equal(
          autobot.overallRating(),
          36
        )
        transformers.push(autobot)

        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.summary(),
          '1 battle\nWinning team (Autobots): Hubcap\nSurvivors from the losing team (Decepticons): No one'
        )
      })
    })
    describe('Special Rules', () => {
      it('Should end in a draw a battle between two O.P.', () => {
        let transformers = []
        transformers.push(Transformer.create('Optimus Prime, D, 8,9,2,6,7,5,6,10'))
        transformers.push(Transformer.create('Optimus Prime, A, 6,6,7,9,5,2,9,7'))
        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.epicBattle,
          true
        )
        assert.equal(
          war.summary(),
          '1 battle\nDraw\nNo one survived'
        )
      })
      it('Should end in a draw a battle between O.P. and Predaking', () => {
        let transformers = []
        transformers.push(Transformer.create('Predaking, D, 8,9,2,6,7,5,6,10'))
        transformers.push(Transformer.create('Optimus Prime, A, 6,6,7,9,5,2,9,7'))
        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.epicBattle,
          true
        )
        assert.equal(
          war.summary(),
          '1 battle\nDraw\nNo one survived'
        )
      })
      it('Should end in a draw a battle between two Predaking', () => {
        let transformers = []
        transformers.push(Transformer.create('Predaking, D, 8,9,2,6,7,5,6,10'))
        transformers.push(Transformer.create('Predaking, A, 6,6,7,9,5,2,9,7'))
        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.epicBattle,
          true
        )
        assert.equal(
          war.summary(),
          '1 battle\nDraw\nNo one survived'
        )
      })
      it('Should end in a draw a battle between two Predaking', () => {
        let transformers = []
        transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
        transformers.push(Transformer.create('Bluestreak, D, 6,6,7,9,5,2,9,7'))
        transformers.push(Transformer.create('Optimus Prime: A, 4,4,4,4,4,4,4,4'))
        const war = War.create(transformers)
        war.happen()
        assert.equal(
          war.epicBattle,
          false
        )
        assert.equal(
          war.summary(),
          '1 battle\nWinning team (Autobots): Optimus Prime\nSurvivors from the losing team (Decepticons): Bluestreak'
        )
      })
    })
  })
  describe('battleSummary', () => {
    it('Should return \'1 battle\' if the war is started with 2 autobots and 1 decepticon', () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      transformers.push(Transformer.create('Hubcap: A, 4,4,4,4,4,4,4,4'))
      const war = War.create(transformers)
      war.happen()
      assert.equal(
        war.battleSummary(),
        '1 battle'
      )
    })
    it('Should return \'1 battle\' if the war is started with 1 autobot and 2 decepticons', () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Bluestreak, D, 6,6,7,9,5,2,9,7'))
      transformers.push(Transformer.create('Hubcap: A, 4,4,4,4,4,4,4,4'))
      const war = War.create(transformers)
      war.happen()
      assert.equal(
        war.battleSummary(),
        '1 battle'
      )
    })
    it('Should return \'2 battles\' if the war is started with 2 autobots and 2 decepticons', () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Hubcap: D, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      transformers.push(Transformer.create('Hubcap: A, 4,4,4,4,4,4,4,4'))
      const war = War.create(transformers)
      war.happen()
      assert.equal(
        war.battleSummary(),
        '2 battles'
      )
    })
    it('Should return \'0 battles\' if the war is started with 2 autobots only', () => {
      let transformers = []
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      transformers.push(Transformer.create('Hubcap: A, 4,4,4,4,4,4,4,4'))
      const war = War.create(transformers)
      war.happen()
      assert.equal(
        war.battleSummary(),
        '0 battles'
      )
    })
  })
  describe('survivingLosers and resultSummary', () => {
    // epic battle
    it(`Should return 'No one survived' if there was an epic battle`, () => {
      const war = War.create([])
      war.epicBattle = true
      assert.equal(
        war.survivingLosers(),
        'No one survived'
      )
    })
    // autobots win (equal teams)
    it(`Should return 'Survivors from the losing team (Decepticons): No one' if autobots won in equal teams`, () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Hubcap: D, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      transformers.push(Transformer.create('Hubcap: A, 4,4,4,4,4,4,4,4'))
      const war = War.create(transformers)
      war.score = 1

      assert.equal(
        war.survivingLosers(),
        'Survivors from the losing team (Decepticons): No one'
      )
    })
    // autobots win (not-equal teams)
    it(`Should return the remaining decepticons team even if autobots won`, () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Bad Hubcap: D, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bad Hubcap(2): D, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bad Hubcap(3): D, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      const war = War.create(transformers)
      war.score = 1

      assert.equal(
        war.survivingLosers(),
        'Survivors from the losing team (Decepticons): Bad Hubcap, Bad Hubcap(2), Bad Hubcap(3)'
      )
    })
    // decepticons win (equal teams)
    it(`Should return 'Survivors from the losing team (Autobots): No one' if decepticons won in equal teams`, () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Hubcap: D, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      transformers.push(Transformer.create('Hubcap: A, 4,4,4,4,4,4,4,4'))
      const war = War.create(transformers)
      war.score = -1

      assert.equal(
        war.survivingLosers(),
        'Survivors from the losing team (Autobots): No one'
      )
    })
    // decepticons win (not-equal teams)
    it(`Should return the remaining autobots even if decepticons won`, () => {
      let transformers = []
      transformers.push(Transformer.create('Bad Hubcap(2): D, 4,4,4,4,2,4,4,4'))
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Bad Hubcap: A, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bad Hubcap(3): A, 4,4,4,4,1,4,4,4'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      const war = War.create(transformers)
      war.score = -1

      assert.equal(
        war.survivingLosers(),
        'Survivors from the losing team (Autobots): Bad Hubcap(3)'
      )
    })
    // autobots win (not-equal teams)
    it(`Should return the remaining decepticons even if autobots won`, () => {
      let transformers = []
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Bad Hubcap: A, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Bad Hubcap(2): D, 4,4,4,4,2,4,4,4'))
      transformers.push(Transformer.create('Bad Hubcap(3): A, 4,4,4,4,1,4,4,4'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      const war = War.create(transformers)
      war.score = 1

      assert.equal(
        war.resultSummary(),
        'Winning team (Autobots): Bluestreak, Bad Hubcap, Bad Hubcap(3)'
      )

      assert.equal(
        war.survivingLosers(),
        'Survivors from the losing team (Decepticons): No one'
      )
    })
    // autobots win (not-equal teams)
    it(`Should display 'No losing team' if the game is draw`, () => {
      let transformers = []
      transformers.push(Transformer.create('Bad Hubcap: A, 4,4,4,4,4,4,4,4'))
      transformers.push(Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10'))
      transformers.push(Transformer.create('Bluestreak, A, 6,6,7,9,5,2,9,7'))
      const war = War.create(transformers)
      war.score = 0

      assert.equal(
        war.resultSummary(),
        'Draw'
      )

      assert.equal(
        war.survivingLosers(),
        'No losing team'
      )
    })
  })
})
