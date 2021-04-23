import { abi as contractInterface } from "./contracts/Elekton.json"
import { ElektonConfig } from "elekton/dist/types/types"

const config: ElektonConfig = {
    contractAddress: "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
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
