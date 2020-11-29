// Spec derived from: https://github.com/systemd/systemd/blob/c5b6b4b6d08cf4c16a871401358faeb5a186c02a/src/journal/journal-send.c
import os from 'os'
import { Socket } from 'unix-dgram'
import { Map as ImmutableMap } from 'immutable'
import { strict as assert } from 'assert'
import { createBuffer } from './internal/internal'
import fs from 'fs'
const JOURNALD_SOCKET_PATH = "/run/systemd/journal/socket"

export enum SyslogPrority {
    /* system is unusable */
    EMERG = 0,
    /* action must be taken immediately */
    ALERT = 1,
    /* critical conditions */
    CRIT = 2,
    /* error conditions */
    ERR = 3,
    ERROR = 3,
    /* warning conditions */
    WARNING = 4,
    WARN = 4,
    /* normal but significant condition */
    NOTICE = 5,
    /* informational */
    INFO = 6,
    /* debug-level messages */
    DEBUG = 7
}

export class Journald {
    syslog_identifier: string;
    socket: Socket | null;
    constructor(syslog_identifier?: string) {
        if (typeof syslog_identifier === 'string') {
            this.syslog_identifier = syslog_identifier
        } else {
            this.syslog_identifier = process.argv0;
        }
        if (os.platform() !== 'linux') {
            process.emitWarning(`Not supported on not platform ${os.platform()}`)
            this.socket = null
            return
        }
        if (!fs.existsSync(JOURNALD_SOCKET_PATH)) {
            process.emitWarning(`Journald socket ${JOURNALD_SOCKET_PATH} not found`)
            this.socket = null
            return
        }
        /* eslint-disable @typescript-eslint/no-var-requires */
        const socket = require('unix').createSocket('unix_dgram')
        assert(socket)
        process.on('beforeExit', socket.close)
        this.socket = socket
    }

    /**
     * This sends a mesage to journald. A syslog priority is required.
     */
    async send(priority: SyslogPrority, message: string, kv: ImmutableMap<string, string> | null): Promise<void> {
        if (this.socket === null) {
            process.emitWarning('Journald socket was unable to initialize')
            return
        }

        assert(priority >= 0)
        assert(priority <= 7)

        if (kv === null) {
            kv = ImmutableMap()
        }

        assert(!kv.contains('PRIORITY'));
        assert(!kv.contains('MESSAGE'))

        if (!kv.contains('SYSLOG_IDENTIFIER')) {
            if (this.syslog_identifier !== null) {
                kv = kv.set('SYSLOG_IDENTIFIER', this.syslog_identifier)
            } else {
                kv = kv.set('SYSLOG_IDENTIFIER', process.argv0)
            }
        }

        const socket = this.socket;
        const buf = createBuffer(priority, message, kv)
        return new Promise((resolve, reject) => {
            try {
                socket.sendto(buf, 0, buf.length, JOURNALD_SOCKET_PATH, () => resolve())
            } catch (err) {
                reject(err)
            }
        })
    }
}

const journald = new Journald()
export default journald