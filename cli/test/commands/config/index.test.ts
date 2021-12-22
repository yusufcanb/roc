import {expect, test} from '@oclif/test'

describe('Config Command Tests', () => {
  test
  .stdout()
  .command(['config'])
  .it('should run config', ctx => {
    expect(ctx.stdout).to.contain('CLI configurations')
  })
})
