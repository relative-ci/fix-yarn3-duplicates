# fix-yarn3-duplicates

[![RelativeCI](https://badges.relative-ci.com/badges/5b2qrnSObnR0UgiYOlbW?branch=master)](https://app.relative-ci.com/projects/5b2qrnSObnR0UgiYOlbW)

## Issue 

When a package is a common dependency for multiple packages and the version range differs, Yarn 3 resolves correctly to a common version but **installs two different instances**:


| 1st level dependency | `react-draggable` version range |
|---|---|
| react-grid-layout | `^4.0.0` |
| react-resizable | `^4.0.3` |


```shell
~/w/r/e/test-yarn3-duplicates on master ⨯ yarn why react-draggable
├─ react-grid-layout@npm:1.3.4
│  └─ react-draggable@npm:4.4.5 (via npm:^4.0.0)
│
├─ react-grid-layout@npm:1.3.4 [8f25d]
│  └─ react-draggable@npm:4.4.5 [6c42a] (via npm:^4.0.0 [6c42a])
│
├─ react-resizable@npm:3.0.4
│  └─ react-draggable@npm:4.4.5 (via npm:^4.0.3)
│
└─ react-resizable@npm:3.0.4 [6c42a]
   └─ react-draggable@npm:4.4.5 [5d025] (via npm:^4.0.3 [5d025])
```

[RelativeCI Job #3 Duplicate packages](https://app.relative-ci.com/projects/5b2qrnSObnR0UgiYOlbW/jobs/3-And9ZTonT1ySvLLaN4mZ/packages?bp=%7B%22filters%22%3A%7B%22duplicate%22%3Atrue%7D%7D)


## Possible workarounds:

1. :no_entry_sign: webpack alias - webpack requires react-draggable as a dependency; yarn is not able to resolve react-draggable from react-grid-layout - https://github.com/relative-ci/fix-yarn3-duplicates/pull/4
2. :no_entry_sign: `package.json` resolutions: overrides the dependency version, but is still installing duplicate instances - https://github.com/relative-ci/fix-yarn3-duplicates/pull/5
3. :white_check_mark: packageExtensions - https://github.com/relative-ci/fix-yarn3-duplicates/pull/6
