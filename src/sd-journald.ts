// Spec derived from: https://github.com/systemd/systemd/blob/c5b6b4b6d08cf4c16a871401358faeb5a186c02a/src/journal/journal-send.c

import unix, { Socket } from 'unix-dgram'
import { Map as ImmutableMap } from 'immutable'
import { strict as assert } from 'assert'
import { createBuffer } from './internal/internal'
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

class Journald {
    syslog_identifier: string | null = null;
    socket: Socket;
    constructor() {
        this.socket = unix.createSocket('unix_dgram')
        process.on('beforeExit', this.socket.close)
        this.syslog_identifier = null;
    }

    async send(priority: SyslogPrority, message: string, kv: ImmutableMap<string, string> | null): Promise<void> {
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