# Minimal wrapper to log to journald


  [![NPM Version][npm-image]][npm-url]
  [![Build][github-image]][github-url]

[Documentation](https://github.com/sargun/sd-journald/tree/main/docs)

Exports a default instance of Journald, but a custom one can be created. Each one corresponds
to a unix domain socket.

Basically:

Basic usage example:
```typescript
import {Journald, SyslogPrority } from 'sd-journald'

const journald = new Journald()
journald.send(SyslogPrority.INFO, "Test message", null)
```

```javascript
// TODO: Can someone please fill this in?
```

[npm-image]: https://img.shields.io/npm/v/sd-journald.svg
[npm-url]: https://npmjs.org/package/sd-journald
[github-image]: https://github.com/sargun/sd-journald/workflows/CI/badge.svg
[github-url]: https://github.com/sargun/sd-journald/actions?query=workflow%3A%22CI%22