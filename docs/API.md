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

npm config options. For a full list, [see npm's lib/config/defaults.js](https://github.com/npm/npm/blob/master/lib/config/defaults.js#L108).

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

Options to configure locking. Set one or the other to `false` to skip those `package.json` dependencies.