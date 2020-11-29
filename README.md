# Minimal wrapper to log to journald


  [![NPM Version][npm-image]][npm-url]
  [![Build][github-image]][github-url]
  [![codecov](https://codecov.io/gh/sargun/sd-journald/branch/main/graph/badge.svg?token=91FMU8M65R)](https://codecov.io/gh/sargun/sd-journald)

[Documentation](https://github.com/sargun/sd-journald/tree/main/docs)

Exports a default instance of Journald, but a custom one can be created. Each one corresponds
to a unix domain socket.

Interface:

```typescript
import { Map as ImmutableMap } from 'immutable';
declare enum SyslogPrority {
    EMERG = 0,
    ALERT = 1,
    CRIT = 2,
    ERR = 3,
    ERROR = 3,
    WARNING = 4,
    WARN = 4,
    NOTICE = 5,
    INFO = 6,
    DEBUG = 7
}
declare class Journald {
    syslog_identifier: string;
    socket: Socket | null;
    constructor(syslog_identifier?: string);
    /**
     * This sends a mesage to journald. A syslog priority is required.
     */
    send(priority: SyslogPrority, message: string, kv: ImmutableMap<string, string> | null): void;
}
default journald = new Journald();
declare function send(priority: SyslogPrority, message: string, kv: ImmutableMap<string, string> | null): void;
```

Basic usage example:
```typescript
import journald, { SyslogPrority } from 'sd-journald'

journald.send(SyslogPrority.INFO, "Test message", null)
```

```javascript
// TODO: Can someone please fill this in?
```

[npm-image]: https://img.shields.io/npm/v/sd-journald.svg
[npm-url]: https://npmjs.org/package/sd-journald
[github-image]: https://github.com/sargun/sd-journald/workflows/CI/badge.svg
[github-url]: https://github.com/sargun/sd-journald/actions?query=workflow%3A%22CI%22