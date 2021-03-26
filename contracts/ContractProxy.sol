//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractProxy {

    address logicContract;

    function setLogic(address _address) public {
        logicContract = _address;
    }

    function getLogic() public view returns (address) {
        return logicContract;
    }

    function transfer(address _token, address _to, uint256 _amount ) public returns (bool success) {
        (success,) = logicContract.delegatecall(
            abi.encodeWithSignature("transfer(address,address,uint256)", _token, _to, _amount)
        );
    }

    function transferFrom(address _token, address _from, address _to, uint256 _amount ) public returns (bool success) {
        (success,) = logicContract.delegatecall(
            abi.encodeWithSignature("transferFrom(address,address,address,uint256)", _token, _from, _to, _amount)
        );
    }

}