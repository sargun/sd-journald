# Minimal wrapper to log to journald


  [![NPM Version][npm-image]][npm-url]
  [![Build][github-image]][github-url]
  [![codecov](https://codecov.io/gh/sargun/sd-journald/branch/main/graph/badge.svg?token=91FMU8M65R)](https://codecov.io/gh/sargun/sd-journald)

# [Documentation](https://github.com/sargun/sd-journald/tree/main/docs)

# Installation

## Yarn

```sh
yarn add sd-journald
```

## npm

```
npm i sd-journald --save
```

# Interface:

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

The default export is an instance of journald. The syslog identifier by default is set to process.argv0, and it
can be changed. There are several strict *assertions* that prevent the user from sending bad data to journald.
You must the total size of the message is under 1MB. You must ensure that the keys start with A-Z, and only contain
the letters underscore, A-Z, and 0-9. It will be automatically upcased.

Logging is performed synchronously due to a limitation with the underlying library
[unix-dgram](https://www.npmjs.com/package/unix-dgram).


# Examples

## Typescript

Basic usage example:

```typescript
import journald, { SyslogPrority } from 'sd-journald'

/* Sending an unstructured message */
journald.send(SyslogPrority.INFO, "Test message")
```

Sending structured message:

```typescript
import journald, { SyslogPrority } from 'sd-journald'
import { Map as ImmutableMap } from 'immutable'

journald.send(SyslogPrority.INFO, "Test message", new ImmutableMap({"key": "value"}))
```


## Vanilla Javascript

```javascript
// TODO: Can someone please fill this in?
```

# Why?
This module has been written after because the alternative model has a dependency on libsystemd for compilaton. This means that you cannot
build it on Mac OS. Although journald is not available on Mac OS, the idea is that this is a minimal library, and in the future may support
remote destinations like [systemd-journald-remote](https://www.freedesktop.org/software/systemd/man/systemd-journal-remote.service.html). It
is meant to provide as low level as possible of an interface to systemd-journald writing without losing many features.

[npm-image]: https://img.shields.io/npm/v/sd-journald.svg
[npm-url]: https://npmjs.org/package/sd-journald
[github-image]: https://github.com/sargun/sd-journald/workflows/CI/badge.svg
[github-url]: https://github.com/sargun/sd-journald/actions?query=workflow%3A%22CI%22