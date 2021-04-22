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
        contractAddress: "",
        ipfsProvider: "",
        ethereumProvider: ""
    }
}[process.env.NODE_ENV] as ElektonConfig
