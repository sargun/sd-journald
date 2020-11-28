import os from 'os'
import journald, { SyslogPrority } from './sd-journald'
import { Map as ImmutableMap } from 'immutable'
var t = test;

if (os.platform() !== 'linux') {
    t = test.skip
}

t('Basic log entry', async () => {
    await journald.send(SyslogPrority.INFO, "testmessage", ImmutableMap({ "foo": "bar" }))
})


t('Newline log entry', async () => {
    await journald.send(SyslogPrority.INFO, "Log message with newline", ImmutableMap({ "LONG_VALUE": "test\nvalue" }))
})