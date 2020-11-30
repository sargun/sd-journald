import { strict as assert } from 'assert'
import { Map as ImmutableMap } from 'immutable'

/* mask to extract priority part (internal) */
const LOG_PRIORITY_MASK = 0x07
const validKey = new RegExp("^[A-Z0-9][A-Z0-9_]+")

export function createBuffer(priority: number, message: string, kv: ImmutableMap<string, string>): Buffer {
    const iov: Array<Buffer> = [];
    const newline = Buffer.from("\n")

    assert.equal(priority & LOG_PRIORITY_MASK, priority)
    iov.push(Buffer.from("PRIORITY=" + (priority & LOG_PRIORITY_MASK).toString()));
    iov.push(newline);

    iov.push(Buffer.from("MESSAGE=" + message));
    iov.push(newline);

    for (const [key, value] of kv) {
        assert(typeof key === 'string')
        // The variable name must be in uppercase and consist only of characters,
        // numbers and underscores, and may not begin with an underscore.
        const upperKey = key.toUpperCase()
        if (!validKey.test(upperKey)) {
            process.emitWarning('Invalid logging key: ' + key)
            continue
        }

        /* Already includes a newline? Bummer, then
         * let's write the variable name, then a
         * newline, then the size (64bit LE), followed
         * by the data and a final newline */
        const vstr = String(value).valueOf()
        if (vstr.includes('\n')) {
            const buf = Buffer.alloc(upperKey.length + 1 + 8 + vstr.length)
            let n = 0;
            n += buf.write(upperKey)
            n += buf.write('\n', n)
            // writeBigUInt64LE is different, in that it returns
            // Returns: <integer> offset plus the number of bytes written.
            n = buf.writeBigUInt64LE(BigInt(vstr.length), n)
            buf.write(vstr, n)
            iov.push(buf)
        } else {
            iov.push(Buffer.from(`${upperKey}=${vstr}`))
        }

        iov.push(newline)
    }

    return Buffer.concat(iov)
}