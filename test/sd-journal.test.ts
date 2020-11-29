import journald, { SyslogPrority } from '../src/sd-journald'
import { Map as ImmutableMap } from 'immutable'
import { spawn } from 'child_process'
import fs from 'fs'

async function journalctl(cmd: string): Promise<string> {
    return new Promise((resolve) => {
        let args = ['-f', '-o', 'json']
        args = args.concat(cmd.split(' '))
        const subprocess = spawn('journalctl', args)
        let body = ''
        subprocess.stderr.on('data', (data) => {
            body += data
            if (body.includes('\n')) {
                subprocess.disconnect()
                subprocess.kill(9)
            }
        })
        subprocess.stderr.on('end', () => {
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
        const prom = new Promise((resolve) => {
            journalctl(`-o json MESSAGE=testmessage _PID=${process.pid}`).then((body) => {
                console.log(`body: ${body}`)
                resolve(JSON.parse(body))
            })
        })
        expect(prom).resolves.toMatchObject({ "MESSAGE": "testmessage" })
    })


    t('Newline log entry', async () => {
        const LONG_VALUE = "test\nvalue"
        await journald.send(SyslogPrority.INFO, "newlinemessage", ImmutableMap({ "LONG_VALUE": LONG_VALUE }))
        const prom = new Promise((resolve) => {
            journalctl(`-o json MESSAGE=newlinemessage _PID=${process.pid}`).then((body) => {
                console.log(`body: ${body}`)
                resolve(JSON.parse(body))
            })
        })
        expect(prom).resolves.toMatchObject({ 'LONG_VALUE': LONG_VALUE })
    })
})
