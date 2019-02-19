'use strict'

const { iterate } = require('leakage')
const { test } = require('tap')

test('memory leak requiring nock', t => {
  const result = iterate(() => require('..'))

  result.printSummary()

  // Remove the first diff
  result.heapDiffs.shift()

  for (const diff of result.heapDiffs) {
    t.equal(diff.change.size_bytes, 0, 'Memory difference should be 0')
  }

  t.end()
})
