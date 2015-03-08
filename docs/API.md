# API

## shrinkwrap([options])

### options

Type: `Object`

Default:
```
{
  prefix: path_of_given_package_json,
  _exit: true
}
```

NPM config options. For a full list, see [NPM's official api docs](https://www.npmjs.org/doc/cli).

## shrinkwrap.lock([options])

### options

Type: `Object`

Default:
```
{
  dependencies: true,
  devDependencies: true
}
```

Options to configure locking. Set one or the other to `false` to ignore.
