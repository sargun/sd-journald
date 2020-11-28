**[sd-journald](../README.md)**

> [Globals](../globals.md) / "src/internal/internal"

# Module: "src/internal/internal"

## Index

### Variables

* [LOG\_PRIORITY\_MASK](_src_internal_internal_.md#log_priority_mask)
* [validKey](_src_internal_internal_.md#validkey)

### Functions

* [createBuffer](_src_internal_internal_.md#createbuffer)

## Variables

### LOG\_PRIORITY\_MASK

• `Const` **LOG\_PRIORITY\_MASK**: 7 = 7

*Defined in [src/internal/internal.ts:5](https://github.com/sargun/sd-journald/blob/2530053/src/internal/internal.ts#L5)*

___

### validKey

• `Const` **validKey**: RegExp = new RegExp("^[A-Z0-9][A-Z0-9\_]+")

*Defined in [src/internal/internal.ts:6](https://github.com/sargun/sd-journald/blob/2530053/src/internal/internal.ts#L6)*

## Functions

### createBuffer

▸ **createBuffer**(`priority`: number, `message`: string, `kv`: ImmutableMap\<string, string>): Buffer

*Defined in [src/internal/internal.ts:8](https://github.com/sargun/sd-journald/blob/2530053/src/internal/internal.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`priority` | number |
`message` | string |
`kv` | ImmutableMap\<string, string> |

**Returns:** Buffer
