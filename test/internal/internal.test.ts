import { createBuffer } from '../../src/internal/internal'
import { Map as ImmutableMap } from 'immutable'

test('Basic Buffer Creation', () => {
    createBuffer(1, "foo", ImmutableMap({ "foo": "bar" }))
})