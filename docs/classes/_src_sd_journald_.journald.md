**[sd-journald](../README.md)**

> [Globals](../globals.md) / ["src/sd-journald"](../modules/_src_sd_journald_.md) / Journald

# Class: Journald

## Hierarchy

* **Journald**

## Index

### Constructors

* [constructor](_src_sd_journald_.journald.md#constructor)

### Properties

* [socket](_src_sd_journald_.journald.md#socket)
* [syslog\_identifier](_src_sd_journald_.journald.md#syslog_identifier)

### Methods

* [send](_src_sd_journald_.journald.md#send)

## Constructors

### constructor

\+ **new Journald**(`syslog_identifier?`: undefined \| string): [Journald](_src_sd_journald_.journald.md)

*Defined in [src/sd-journald.ts:34](https://github.com/sargun/sd-journald/blob/8062a5d/src/sd-journald.ts#L34)*

#### Parameters:

Name | Type |
------ | ------ |
`syslog_identifier?` | undefined \| string |

**Returns:** [Journald](_src_sd_journald_.journald.md)

## Properties

### socket

•  **socket**: Socket \| null

*Defined in [src/sd-journald.ts:34](https://github.com/sargun/sd-journald/blob/8062a5d/src/sd-journald.ts#L34)*

___

### syslog\_identifier

•  **syslog\_identifier**: string

*Defined in [src/sd-journald.ts:32](https://github.com/sargun/sd-journald/blob/8062a5d/src/sd-journald.ts#L32)*

## Methods

### send

▸ **send**(`priority`: [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md), `message`: string, `kv`: ImmutableMap\<string, string> \| null): Promise\<void>

*Defined in [src/sd-journald.ts:59](https://github.com/sargun/sd-journald/blob/8062a5d/src/sd-journald.ts#L59)*

This sends a mesage to journald. A syslog priority is required.

#### Parameters:

Name | Type |
------ | ------ |
`priority` | [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md) |
`message` | string |
`kv` | ImmutableMap\<string, string> \| null |

**Returns:** Promise\<void>
