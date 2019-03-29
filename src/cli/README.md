# CLI commend

## Fields

### name

Required, string / string[]

CLI arguments (Meow.Result.Input).

禁止多个 name 对应同一个命令, 如需要实现类似 `cli user`, `cli user login` 这样嵌套的命令, 可以通过填补参数 `default` 的方式来实现.

```ts
export name = ['user', 'default']
```

### Description

string

Display in help text

### alias

string

## Example

```ts
export const name = "name";
export const alias = "alias";
export const description = "description text";
export const command = (cli: Meow.Result) => {};
```
