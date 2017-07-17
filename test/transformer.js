/* global describe, it */
import assert from 'assert'
import Transformer from '../src/transformer'

describe('Transformer', () => {
  describe('create', () => {
    it('Should create a valid Transformer if the input is \'Soundwave,D,8, 9,  2,   6,   7 , 5 , 6 ,  10\'', () => {
      const transformer = Transformer.create('Soundwave:D,8, 9,  2,   6,   7 , 5 , 6 ,  10')
      assert.equal(transformer.name, 'Soundwave')
      assert.equal(transformer.team, 'D')
      assert.equal(transformer.strength, 8)
      assert.equal(transformer.intelligence, 9)
      assert.equal(transformer.speed, 2)
      assert.equal(transformer.endurance, 6)
      assert.equal(transformer.rank, 7)
      assert.equal(transformer.courage, 5)
      assert.equal(transformer.firepower, 6)
      assert.equal(transformer.skill, 10)
    })
  })
  describe('overAllRating', () => {
    it('Should return an over all rating of 31 if transformer contains these specs: 8,9,2,6,7,5,6,10', () => {
      const transformer = Transformer.create('Soundwave, D, 8,9,2,6,7,5,6,10')
      assert.equal(transformer.overallRating(), 31)
    })
  })
})
