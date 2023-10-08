// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract RPSPointToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
   
    constructor()
        ERC20("RPSPointToken", "RPSPT")
        Ownable()
        ERC20Permit("RPSPointToken")
    {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}