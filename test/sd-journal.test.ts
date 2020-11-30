import journald, { SyslogPrority } from '../src/sd-journald'
import { Map as ImmutableMap } from 'immutable'
import { spawn } from 'child_process'
import fs from 'fs'
async function journalctl(cmd: string): Promise<string> {
    return new Promise((resolve) => {
        let args = ['-f', '-o', 'json', '-n', '1000']
        args = args.concat(cmd.split(' '))
        const subprocess = spawn('journalctl', args)
        let body = ''
        subprocess.stdout.on('data', (data) => {
            body += data
            if (body.includes('\n')) {
                subprocess.unref()
                subprocess.kill(9)
            }
        })
        subprocess.stdout.on('end', () => {
            resolve(body)
        })
    })
}

describe('Journald End-to-End Suite', () => {
    let t = test
    if (!fs.existsSync("/run/systemd/journal/socket") || journald.socket === null) {
        console.log('Journald not enabled, skipping tests')
        t = test.skip
    }

    t('Basic log entry', async () => {
        await journald.send(SyslogPrority.INFO, "testmessage", ImmutableMap({ "foo": "bar" }))
        const body = await journalctl(`MESSAGE=testmessage _PID=${process.pid}`)
        console.log(`body: ${body}`)
        expect(JSON.parse(body)).toMatchObject({ "MESSAGE": "testmessage" })
    })


    t('Newline log entry', async () => {
        const LONG_VALUE = "test\nvalue"
        await journald.send(SyslogPrority.INFO, "newlinemessage", ImmutableMap({ "LONG_VALUE": LONG_VALUE }))
        const body = await journalctl(`-o json MESSAGE=newlinemessage _PID=${process.pid}`)
        expect(JSON.parse(body)).toMatchObject({ 'LONG_VALUE': LONG_VALUE })
    })
})
