import { abi as contractInterface } from "./contracts/Elekton.json"
import { ElektonConfig } from "elekton/dist/types/types"

const config: ElektonConfig = {
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    wasmFilePath: `${window.location.origin}/main.wasm`,
    zkeyFilePath: `${window.location.origin}/circuit_final.zkey`,
    contractInterface
}

export default {
    development: config,
    test: config,
    production: {
        ...config,
        ethereumProvider: "wss://demetra-testnet.netserv.it/uechkws",
        ipfsProvider: "https://ipfs.infura.io:5001/api/v0",
        contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    }
}[process.env.NODE_ENV] as ElektonConfig
