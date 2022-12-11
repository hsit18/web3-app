import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle"

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/4Q95BriG4DKjYvQd-dIkGSckLYAa4tAG',
      accounts: ['55a2f1d1a738911c3403f35112be649aed3fed7ce07133d39ed0f4f840e0966b']
    }
  }
};

export default config;
