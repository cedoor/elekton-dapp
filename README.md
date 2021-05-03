<p align="center">
    <a href="https://github.com/cedoor/elekton-contracts" target="_blank">
        elekton-contracts
    </a>
    | 
    <a href="https://github.com/cedoor/elekton.js" target="_blank">
        elekton.js
    </a>
    | 
    <a href="https://github.com/cedoor/elekton-dapp" target="_blank">
        elekton-dapp
    </a>
</p>

<p align="center">
    <h1 align="center">
        <img width="40" src="https://github.com/elekton/elekton-dapp/raw/main/public/logo192.png">
        Elekton DApp
    </h1>
    <p align="center">Elekton cross-platform decentralized application.</p>
</p>
    
<p align="center">
    <a href="https://github.com/elekton" target="_blank">
        <img src="https://img.shields.io/badge/project-Elekton-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/elekton/dapp/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/elekton/elekton-dapp.svg?style=flat-square">
    </a>
    <a href="https://eslint.org/" target="_blank">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint">
    </a>
    <a href="https://prettier.io/" target="_blank">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <img alt="Repository top language" src="https://img.shields.io/github/languages/top/elekton/elekton-dapp?style=flat-square&logo=typescript">
</p>


Elekton is a set of modules useful to create a simple e-voting system that uses non-interactive zero-knowledge proofs and blockchain technologies to allow users to vote anonymously in a verifiable and transparent way. In addition to this repository there are the Elekton [contracts](https://github.com/cedoor/elekton-contracts) and a JavaScript library ([elekton.js](https://github.com/cedoor/elekton.js)) with the functions to interact with them.

___
  
## Table of Contents

-   🛠 [Install](#install)
-   🕹 [Usage](#usage)
-   🔬 [Development](#development)
    -   [Rules](#scroll-rules)
        -   [Commits](https://github.com/cedoor/cedoor/tree/main/git#commits-rules)
        -   [Branches](https://github.com/cedoor/cedoor/tree/main/git#branch-rules)
-   🧾 [MIT License](https://github.com/elekton/elektonjs/blob/master/LICENSE)
-   ☎️ [Contacts](#contacts)
    -   [Developers](#developers)

## Install


Clone this repository and install the dependencies:

```bash
git clone https://github.com/elekton/elekton-dapp.git
cd elekton-dapp
yarn # or `npm i`
```

## Usage

1. Create the snark artifacts by running `yarn snark` on the [elekton-contracts](https://github.com/cedoor/elekton-contracts) repository,
2. copy the `main.wasm` and `circuit_final.zkey` files from the `./elekton-contracts/build/snark/` folder to the `./elekton-dapp/public` folder,
3. start the Besu development network with `yarn start` and deploy the `Elekton.sol` contract with `yarn deploy` on the [elekton-contracts](https://github.com/cedoor/elekton-contracts) repository,
4. copy the address of the deployed contract and put it in the `./elekton-dapp/src/config.ts` configuration file,
5. start a local [IPFS](https://docs.ipfs.io/install/command-line/) node,
6. finally run `yarn start` to start the application on a local server.

## Contacts

### Developers

-   e-mail : me@cedoor.dev
-   github : [@cedoor](https://github.com/cedoor)
-   website : https://cedoor.dev
