import journald, { SyslogPrority } from '../src/sd-journald'
import { Map as ImmutableMap } from 'immutable'
import child_process from 'child_process'
import util from 'util'
import fs from 'fs'
let t = test;

if (!fs.existsSync("/run/systemd/journal/socket")) {
    t = test.skip
}

const exec = util.promisify(child_process.exec)

t('Basic log entry', async () => {
    await journald.send(SyslogPrority.INFO, "testmessage", ImmutableMap({ "foo": "bar" }))
    const { stdout, stderr } = await exec(`journalctl -o json MESSAGE=testmessage _PID=${process.pid}`)
    const obj = JSON.parse(stdout)
    expect(obj).toBeTruthy()
    expect(stderr).toBeFalsy()
})


t('Newline log entry', async () => {
    const LONG_VALUE = "test\nvalue"
    await journald.send(SyslogPrority.INFO, "newlinemessage", ImmutableMap({ "LONG_VALUE": LONG_VALUE }))
    const { stdout, stderr } = await exec(`journalctl -o json MESSAGE=newlinemessage _PID=${process.pid}`)
    const obj = JSON.parse(stdout)
    expect(obj).toBeTruthy()
    expect(obj).toMatchObject({ 'LONG_VALUE': LONG_VALUE })
    expect(stderr).toBeFalsy()
})