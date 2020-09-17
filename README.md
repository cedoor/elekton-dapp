<p align="center">
    <h1 align="center">
        <img width="40" src="https://github.com/elekton/dapp/raw/master/assets/images/icon.png">
        Elekton
    </h1>
    <p align="center">Elekton cross-platform decentralized application.</p>
</p>
    
<p align="center">
    <a href="https://github.com/elekton" target="_blank">
        <img src="https://img.shields.io/badge/project-Elekton-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/elekton/dapp/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/elekton/dapp.svg?style=flat-square">
    </a>
    <a href="https://david-dm.org/elekton/dapp" target="_blank">
        <img src="https://img.shields.io/david/elekton/dapp.svg?style=flat-square">
    </a>
    <a href="https://david-dm.org/elekton/dapp?type=dev" target="_blank">
        <img src="https://img.shields.io/david/dev/elekton/dapp.svg?style=flat-square">
    </a> 
</p>

___

## :paperclip: Table of Contents
- :hammer: [Install](#hammer-install)
- :video_game: [Usage](#video_game-usage)
- :chart_with_upwards_trend: [Development](#chart_with_upwards_trend-development)
  - :scroll: [Rules](#scroll-rules)
    - [Commits](#commits)
    - [Branches](#branches)
- :page_facing_up: [License](#page_facing_up-license)
- :telephone_receiver: [Contacts](#telephone_receiver-contacts)
  - :boy: [Developers](#boy-developers)

## :hammer: Install

With the following installed:
- git
- node >= 12
- npm >= 6

Clone the repo and install the dependencies from npm.

```bash
git clone https://github.com/elekton/dapp.git
cd dapp
npm i
```

## :video_game: Usage

For local *development* with expo:

```bash
npm start
```

## :chart_with_upwards_trend: Development

### :scroll: Rules

#### Commits

* Use this commit message format (angular style):  

    `[<type>] <subject>`
    `<BLANK LINE>`
    `<body>`

    where `type` must be one of the following:

    - feat: A new feature
    - fix: A bug fix
    - docs: Documentation only changes
    - style: Changes that do not affect the meaning of the code
    - refactor: A code change that neither fixes a bug nor adds a feature
    - test: Adding missing or correcting existing tests
    - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
    - update: Update of the library version or of the dependencies

and `body` must be should include the motivation for the change and contrast this with previous behavior (do not add body if the commit is trivial). 

* Use the imperative, present tense: "change" not "changed" nor "changes".
* Don't capitalize first letter.
* No dot (.) at the end.

#### Branches

* There is a master branch, used only for release.
* There is a dev branch, used to merge all sub dev branch.
* Avoid long descriptive names for long-lived branches.
* No CamelCase.
* Use grouping tokens (words) at the beginning of your branch names (in a similar way to the `type` of commit).
* Define and use short lead tokens to differentiate branches in a way that is meaningful to your workflow.
* Use slashes to separate parts of your branch names.
* Remove branch after merge if it is not important.

Examples:
    
    git branch -b docs/README
    git branch -b test/one-function
    git branch -b feat/side-bar
    git branch -b style/header

## :page_facing_up: License
* See [LICENSE](https://github.com/elekton/dapp/blob/master/LICENSE) file.

## :telephone_receiver: Contacts
### :boy: Developers
* e-mail : me@cedoor.dev
* github : [@cedoor](https://github.com/cedoor)
* website : https://cedoor.dev

