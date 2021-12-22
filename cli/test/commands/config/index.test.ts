import {expect, test} from '@oclif/test'

describe('config', () => {
  test
    .stdout()
    .command(['help'])
    .it('should run help', ctx => {
      expect(ctx.stdout).to.contain('Command line interface for ROC (Robot Operation Center)')
    })
})
