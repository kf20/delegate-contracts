const ContractProxy = artifacts.require("./ContractProxy.sol");
const ContractLogic = artifacts.require("./ContractLogic.sol");
const TokenA = artifacts.require("./TokenA.sol");


module.exports = function(deployer, _network, _accounts) {
    //deployer.deploy(ContractLogic);
    deployer.deploy(ContractProxy, "0xE0f2aE58d3D24ADA46571F5D0370D380Edd781aC");
    deployer.deploy(TokenA);
}
