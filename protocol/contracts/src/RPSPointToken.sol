// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract RPSPointToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {

    event TokenBalance(address indexed receiver, uint value);
   
    constructor()
        ERC20("RPSPointToken", "RPSPT")
        Ownable()
        ERC20Permit("RPSPointToken")
    {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokenBalance(to,  IERC20(address(this)).balanceOf(to));
    }

    function transfer(address to, uint256 amount) override(ERC20) public onlyOwner returns(bool) {
        bool _success = ERC20.transfer(to, amount);
        emit TokenBalance(to, IERC20(address(this)).balanceOf(to));
        return _success;
    }

    function transferFrom(address from, address to, uint256 amount) override(ERC20) public onlyOwner returns(bool) {
        bool _success = ERC20.transferFrom(from, to, amount);
        emit TokenBalance(to, IERC20(address(this)).balanceOf(to));
        return _success;
    }

    function burnLoserTokens(address from, uint value) external onlyOwner {
        _burn(from, value);
    }


}