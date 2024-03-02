# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2023-03-02

### Changed

- Update to Node 20
- Update to latest `tool-reporter-action-template`

## [2.5.1] - 2024-01-31

### Fixed

- Fix clashing constructor variables initializations

## [2.5.0] - 2024-01-31

### Added

- Add `comment-pr-on-success` input to control when to comment on PRs

### Fixed

- Fix wrong condition for failed exit

## [2.4.0] - 2023-09-16

### Changed

- Improve `package.json`
- Improve `tsconfig.json`
- Bump `@typescript-eslint/eslint-plugin` from 6.6.0 to 6.7.0
- Bump `eslint` from 8.48.0 to 8.49.0
- Bump `@typescript-eslint/parser` from 6.6.0 to 6.7.0
- Bump `@actions/core` from 1.10.0 to 1.10.1
- Bump `jest` from 29.6.3 to 29.7.0
- Bump `@types/node` from 20.5.9 to 20.6.2

## [2.3.0] - 2023-09-09

### Changed

- Bump `actions/checkout` from 3 to 4
- Bump `@vercel/ncc` from 0.36.1 to 0.38.0
- Update to latest `tool-reporter-action-template`

## [2.2.0] - 2023-09-05

### Changed

- Update to latest `tool-reporter-action-template`

## [2.1.1] - 2023-08-30

### Fixed

- Fix input name

## [2.1.0] - 2023-07-03

### Changed

- Update dependencies

## [2.0.0] - 2023-07-03

### Added

- Add support for multi mode report
- Add support for failing the action if errors are found on the report

## [1.0.0] - 2023-06-22

### Added

- Implement `kube-linter-reporter-action` GitHub action

[3.0.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.5.1...v3.0.0
[2.5.1]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/tvcsantos/kube-linter-reporter-action/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/tvcsantos/kube-linter-reporter-action/releases/tag/v1.0.0
