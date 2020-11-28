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

*Defined in [src/sd-journald.ts:32](https://github.com/sargun/sd-journald/blob/2530053/src/sd-journald.ts#L32)*

#### Parameters:

Name | Type |
------ | ------ |
`syslog_identifier?` | undefined \| string |

**Returns:** [Journald](_src_sd_journald_.journald.md)

## Properties

### socket

•  **socket**: Socket \| null

*Defined in [src/sd-journald.ts:32](https://github.com/sargun/sd-journald/blob/2530053/src/sd-journald.ts#L32)*

___

### syslog\_identifier

•  **syslog\_identifier**: string

*Defined in [src/sd-journald.ts:31](https://github.com/sargun/sd-journald/blob/2530053/src/sd-journald.ts#L31)*

## Methods

### send

▸ **send**(`priority`: [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md), `message`: string, `kv`: ImmutableMap\<string, string> \| null): Promise\<void>

*Defined in [src/sd-journald.ts:50](https://github.com/sargun/sd-journald/blob/2530053/src/sd-journald.ts#L50)*

This sends a mesage to journald. A syslog priority is required.

#### Parameters:

Name | Type |
------ | ------ |
`priority` | [SyslogPrority](../enums/_src_sd_journald_.syslogprority.md) |
`message` | string |
`kv` | ImmutableMap\<string, string> \| null |

**Returns:** Promise\<void>
