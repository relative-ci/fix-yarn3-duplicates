# fix-yarn3-duplicates

[![RelativeCI](https://badges.relative-ci.com/badges/5b2qrnSObnR0UgiYOlbW?branch=master)](https://app.relative-ci.com/projects/5b2qrnSObnR0UgiYOlbW)

## Issue 

When a package is a common dependency for multiple packages and the version range differs, Yarn 3 resolves correctly to a common version but **installs two different instances**:


| 1st level dependency | `react-draggable` version range |
|---|---|
| [react-grid-layout@1.3.4](https://github.com/react-grid-layout/react-grid-layout) | `^4.0.0` |
| [react-resizable@1.4.5](https://github.com/react-grid-layout/react-resizable) | `^4.0.3` |


```shell
⋊> ~/w/r/e/test-yarn3-duplicates on master ⨯ yarn why react-draggable -R                            
└─ test-yarn3-duplicates@workspace:.
   └─ react-grid-layout@npm:1.3.4 [8f25d] (via npm:^1.3.4 [8f25d])
      ├─ react-draggable@npm:4.4.5 [6c42a] (via npm:^4.0.0 [6c42a])
      └─ react-resizable@npm:3.0.4 [6c42a] (via npm:^3.0.4 [6c42a])
         └─ react-draggable@npm:4.4.5 [5d025] (via npm:^4.0.3 [5d025])

⋊> ~/w/r/e/test-yarn3-duplicates on master ⨯ yarn info -AR --virtuals react-draggable
├─ react-draggable@npm:4.4.5
│  ├─ Instances: 2
│  ├─ Version: 4.4.5
│  │
│  └─ Dependencies
│     ├─ clsx@npm:^1.1.1 → npm:1.2.1
│     └─ prop-types@npm:^15.8.1 → npm:15.8.1
│
├─ react-draggable@npm:4.4.5 [5d025]
│  ├─ Version: 4.4.5
│  │
│  └─ Peer dependencies
│     ├─ @types/react-dom@* → ✘
│     ├─ @types/react@* → ✘
│     ├─ react-dom@>= 16.3.0 → ✘
│     └─ react@>= 16.3.0 → npm:17.0.2
│
└─ react-draggable@npm:4.4.5 [6c42a]
   ├─ Version: 4.4.5
   │
   └─ Peer dependencies
      ├─ @types/react-dom@* → ✘
      ├─ @types/react@* → ✘
      ├─ react-dom@>= 16.3.0 → npm:17.0.2 [8f25d]
      └─ react@>= 16.3.0 → npm:17.0.2
```

[RelativeCI Job #3 Duplicate packages](https://app.relative-ci.com/projects/5b2qrnSObnR0UgiYOlbW/jobs/3-And9ZTonT1ySvLLaN4mZ/packages?bp=%7B%22filters%22%3A%7B%22duplicate%22%3Atrue%7D%7D)


## Possible workarounds:

1. :no_entry_sign: webpack alias - webpack requires react-draggable as a dependency; yarn is not able to resolve react-draggable from react-grid-layout - https://github.com/relative-ci/fix-yarn3-duplicates/pull/4
2. :no_entry_sign: `package.json` resolutions: overrides the dependency version, but is still installing duplicate instances - https://github.com/relative-ci/fix-yarn3-duplicates/pull/5
3. :no_entry_sign: `yarn dedupe` does not have any impact - https://github.com/relative-ci/fix-yarn3-duplicates/pull/7
4. :white_check_mark: `packageExtensions` - align parent packages dependency version (force both parents to install the same version as a peerDependency) - https://github.com/relative-ci/fix-yarn3-duplicates/pull/6
5. :white_check_mark: `packageExtensions` - align parent package peerDependency (react-resizable does not have react-dom as a peerDependency) - https://github.com/relative-ci/fix-yarn3-duplicates/pull/8
