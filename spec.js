const {it} = require('mocha')
const {expect} = require('chai')
const matrix = require('./data.js')
const connectedCell = require('./index.js')

it('matrix 0', () => {
  expect(connectedCell(matrix[0]))
    .to.be.equal(5)
})

it('matrix 1', () => {
  expect(connectedCell(matrix[1]))
    .to.be.equal(8)
})

it('matrix 2', () => {
  expect(connectedCell(matrix[2]))
    .to.be.equal(5)
})

it('matrix 3', () => {
  expect(connectedCell(matrix[3]))
    .to.be.equal(15)
})

it('matrix 4', () => {
  expect(connectedCell(matrix[4]))
    .to.be.equal(9)
})

it('matrix 5', () => {
  expect(connectedCell(matrix[5]))
    .to.be.equal(1)
})

it('matrix 6', () => {
  expect(connectedCell(matrix[6]))
    .to.be.equal(29)
})