**[sd-journald](../README.md)**

> [Globals](../globals.md) / "src/sd-journald"

# Module: "src/sd-journald"

## Index

### Enumerations

* [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md)

### Classes

* [Journald](../classes/_src_sd_journald_.journald.md)

### Variables

* [JOURNALD\_SOCKET\_PATH](_src_sd_journald_.md#journald_socket_path)
* [journald](_src_sd_journald_.md#journald)

### Functions

* [send](_src_sd_journald_.md#send)

## Variables

### JOURNALD\_SOCKET\_PATH

• `Const` **JOURNALD\_SOCKET\_PATH**: \"/run/systemd/journal/socket\" = "/run/systemd/journal/socket"

*Defined in [src/sd-journald.ts:8](https://github.com/sargun/sd-journald/blob/fd481d4/src/sd-journald.ts#L8)*

___

### journald

• `Const` **journald**: [Journald](../classes/_src_sd_journald_.journald.md) = new Journald()

*Defined in [src/sd-journald.ts:90](https://github.com/sargun/sd-journald/blob/fd481d4/src/sd-journald.ts#L90)*

## Functions

### send

▸ **send**(`priority`: [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md), `message`: string, `kv`: ImmutableMap\<string, string> \| null): Promise\<void>

*Defined in [src/sd-journald.ts:92](https://github.com/sargun/sd-journald/blob/fd481d4/src/sd-journald.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`priority` | [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md) |
`message` | string |
`kv` | ImmutableMap\<string, string> \| null |

**Returns:** Promise\<void>
