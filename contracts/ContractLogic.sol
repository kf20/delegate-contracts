//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ContractLogic {

    function transfer(address _token, address _to, uint256 _amount) public {
        IERC20 token = IERC20(_token);
        token.transfer(_to, _amount);
    }

    function transferFrom(address _token, address _from, address _to, uint256 _amount) public {
        IERC20 token = IERC20(_token);
        token.transferFrom(_from, _to, _amount);
    }

}