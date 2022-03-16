# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Arabic translation.

## [2.11.0] - 2022-03-08

### Added
- Arabic and Norwegian translation.

## [2.10.3] - 2021-12-09

### Added:

- Info that you only will be able to access the telemarketing bar accessing through {accountName}.myvtex.com
- Related articles about the feature in Help Center

## [2.10.2] - 2020-06-02

### Fixed
- README.md file (updated the app documentation).

## [2.10.1] - 2020-02-18
### Changed
- Import session query directly, import less JS.

## [2.10.0] - 2020-02-10
### Changed
- Content is loaded lazily.

## [2.9.8] - 2019-12-03
### Added
-  New CSS handles. The previous ones were also updated.

## [2.9.7] - 2019-10-22
### Changed
- Only do session query when on myvtex.com domain.

## [2.9.6] - 2019-08-30
### Changed
- Set render mode to lazy

## [2.9.5] - 2019-08-29

## [2.9.4] - 2019-08-20
### Fixed
- Contrast of muted UI color
- Impersonate and despersonify
- Usage of React Intl

### Changed
- Use vtex.device-detector instead of custom hook

## [2.9.3] - 2019-08-08

### Fixed

- Issue with popover being displayed behind other elements.

## [2.9.2] - 2019-06-27

### Fixed

- Build assets with new builder hub.

## [2.9.1] - 2019-05-27

### Added

- Prettier dependency.

### Changed

- Eslint config.
- Remove unused files.
- Remove @types/prop-types dependency.

## [2.9.0] - 2019-04-25

### Changed

- Scope messages by domain

## [2.8.5] - 2019-04-11

### Fixed

- Fixed bug where the width would be limited by the Container's width.

## [2.8.4] - 2019-04-04

## [2.8.3] - 2019-03-25

### Changed

- Using tokens to define responsive width.

## [2.8.2] - 2019-03-20

### Changed

- Set width explicitly to `w-100` again

## [2.8.1] - 2019-03-20

### Fixed

- Infinite loop on useCallback.

## [2.8.0] - 2019-03-20

### Added

- Prettier.
- Add useDevice hook to allow resize.

### Changed

- No more class components due use of hooks.
- Using design tokens instead of raw colors.

### Fixed

- Icons sizes and viewboxes.
- Remove left gap on mobile devices.

## [2.7.6] - 2019-03-14

### Changed

- Set width explicitly to `w-100`

## [2.7.5] - 2019-03-14

### Changed

- Change language files to most generic.
- Upgrade test suite adding more complex tests.

## [2.7.4] - 2019-03-01

### Changed

- Add snapshot tests.
- Using `store-icons` instead of `dreamstore-icons`

## [2.7.3] - 2019-02-14

## [2.7.2] - 2019-02-14

## [2.7.1] - 2019-02-12

### Fixed

- Fix wrong rebase.

## [2.7.0] - 2019-01-30

### Changed

- Now, icons are import from `vtex.dreamstore-icons`.

## [2.6.2] - 2019-02-01

## [2.6.1] - 2019-01-29

### Fixed

- Fix wrong declarations of interfaces and blocks.

## [2.6.0] - 2019-01-22

## [2.5.1] - 2019-01-18

### Fixed

- Typescript errors and bump use-svg major.

## [2.5.0] - 2019-01-18

### Changed

- Update React builder to 3.x.
- Bump vtex.styleguide to 9.x.

## [2.4.2] - 2019-01-14

### Changed

- Add `Container` for adjusting search result to store padding.

## [2.4.1] - 2019-01-11

### Changed

- Remove `undefined` class.

## [2.4.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome store-builder.

## [2.3.0] - 2018-12-20

### Added

- Suport to messages builder.

### Changed

- Update `vtex.styleguide` major version.

## [2.2.0] - 2018-12-19

### Changed

- Suport to CSS modules.

## [2.1.4] - 2018-12-04

### Changed

- Update telemarketing icon.

## [2.1.3] - 2018-11-29

### Fixed

- Removed `z-999` from telemarketing toolbar.

## [2.1.2] - 2018-11-29

### Changed

- Use de `vtex.use-svg` lib to display icons.

## [2.1.1] - 2018-11-29

### Fixed

- Redo design tokens and fix icon size on bar

## [2.1.0] - 2018-11-28

### Changed

- Paddings and margins to match other components.

## [2.0.2] - 2018-11-27

## [2.0.1] - 2018-11-27

### Fixed

- Fix design issues on telemarketing popover and bar.

## [2.0.0] - 2018-11-08

### Changed

- Migrate app to typescript.
- Use icons from dreamstore icon pack.

### Fixed

- Refact to use design tokens.

## [1.4.2] - 2018-11-08

- Fix bug in mobile that misplaced Popover and add top margin to email.

## [1.4.1] - 2018-10-29

### Fixed

- Not depersonifying when clicking the logout button.

## [1.4.0] - 2018-10-02

### Changed

- Uses session query provided by vtex.store

## [1.3.3] - 2018-09-25

### Fixed

- Loading removed for the topbar.

## [1.3.2] - 2018-09-24

### Fixed

- Error on processSession when the profile wasn´t present

## [1.3.1] - 2018-09-18

### Fixed

- Refetch loop when impersonate is called

### Updated

- Remove unnecessary dependencies.

## [1.3.0] - 2018-09-05

### Changed

- Adjust bar height using tachyons
- Use render HOC to initialize the session
- Refact component to use the container/component strategie

### Fixed

- Regulate icon and text alignment

## [1.2.0] - 2018-08-24

## [1.1.0] - 2018-08-17

### Changed

- Layout to be compatible with mobile screens

## [1.0.1] - 2018-08-16

### Changed

- Undeprecate version 1.0.0.

## [1.0.0] - 2018-08-15

### Changed

- New design of the component

## [0.1.0] - 2018-08-13

### Added

- Add _Telemarketing_ app.
