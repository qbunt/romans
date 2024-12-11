<h1><a href="https://github.com/qbunt/romans" target="_blank"><img width="150" src="logo.png"></a></h1>

Transform ⚡ numbers into Roman numerals (and back again) with this zero-dependency library. Perfect for when X, V, and I are more your style than 1, 2, 3. As [battle-tested](https://app.codecov.io/gh/qbunt/romans) as a gladiator ⚔️ 🏛️ 

[![quality](https://api.codacy.com/project/badge/Grade/3642e8e1b1b940ce8faa04bb7083f0fb)](https://app.codacy.com/app/qbunt/romans?utm_source=github.com&utm_medium=referral&utm_content=qbunt/romans&utm_campaign=Badge_Grade_Dashboard)
[![tests](https://github.com/qbunt/romans/actions/workflows/nodejs.yml/badge.svg)](https://github.com/qbunt/romans/actions/workflows/nodejs.yml)
[![Socket Badge](https://socket.dev/api/badge/npm/package/romans/2.0.18)](https://socket.dev/npm/package/romans/overview/2.0.18)

## Install 🔨
With [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/) installed, run:

```shell
$ yarn add romans
```    

## Usage 🧮 

```js
const romans = require('romans');
romans.romanize(454)
// returns: 'CDLIV'

romans.deromanize('CDLIV')
// returns: 454

romans.allNumerals
// array containing the numeric equivalents of the roman characters
// [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ]

romans.allChars
// array containing all roman numeral characters
// [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ]

```
## Testing 🧪
[![coverage](https://codecov.io/gh/qbunt/romans/branch/master/graph/badge.svg?token=kD6QSvKfTe)](https://codecov.io/gh/qbunt/romans)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

Test coverage is reported via [codecov](https://codecov.io/gh/qbunt/romans), and run on every release

```shell
$ yarn test
```

## License 📜
[MIT](./LICENSE)

Open source license obligations are tracked via FOSSA scans.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fqbunt%2Fromans.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fqbunt%2Fromans?ref=badge_large)

_Note: The license obligation check says there are dependencies, they are purely used for dev tests, the core library has no direct dependencies 💪_

## Security 🔒
I take supply chain security extremely seriously and run [socket.dev scans](https://socket.dev/npm/package/romans/overview/) on all PRs and releases. Although there are no dependencies on the library, I value your trust.

## Contributions 🤝
If you'd like to contribute to this library, please [send a PR](https://github.com/qbunt/romans/pulls) or [file a new issue](https://github.com/qbunt/romans/issues). I aim to get PRs accepted in short order *should they align with the goals*. Also, be nice. 

If you'd just like to show appreciation, I love ☕.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D0BTCUA)
