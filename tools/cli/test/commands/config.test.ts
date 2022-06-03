import {expect, test} from '@oclif/test'

describe('>>> roc-ctl config [COMMAND]', () => {
  test
    .stdout()
    .command(['config:set-url', 'https://example-platform.com'])
    .it('config:set-url', ctx => {
      expect(ctx.stdout).to.contain('[OK]')
    })

  test
    .stdout()
    .command(['config:get-url'])
    .it('config:get-url', ctx => {
      expect(ctx.stdout).to.contain('[OK]')
    })

  test
    .stdout()
    .command(['config:set-project', 'default-project'])
    .it('config:set-project', ctx => {
      expect(ctx.stdout).to.contain('[OK]')
    })

  test
    .stdout()
    .command(['config:get-project'])
    .it('config:get-project', ctx => {
      expect(ctx.stdout).to.contain('[OK]')
    })
})
