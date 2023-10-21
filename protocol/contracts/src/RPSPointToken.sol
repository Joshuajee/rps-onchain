// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { IRPSGameBase } from "../interface/IRPSGameBase.sol";

contract RPSPointToken is IRPSGameBase, ERC20, ERC20Burnable, ERC20Permit {

    event TokenBalance(address indexed receiver, uint value);

    address public factory;

    function initialize(address _factory) external {
        if (factory != address(0)) revert AlreadyInitialized();
        factory = _factory;
    }
   
    constructor()
        ERC20("RPSPointToken", "RPSPT")
        ERC20Permit("RPSPointToken")
    {}

    function mint(address to, uint256 amount) external onlyFactory{
        _mint(to, amount);
        emit TokenBalance(to,  IERC20(address(this)).balanceOf(to));
    }

    function transfer(address to, uint256 amount) override(ERC20) public onlyFactory returns(bool) {
        bool _success = ERC20.transfer(to, amount);
        emit TokenBalance(to, IERC20(address(this)).balanceOf(to));
        emit TokenBalance(msg.sender, IERC20(address(this)).balanceOf(msg.sender));
        return _success;
    }

    function transferFrom(address from, address to, uint256 amount) override(ERC20) public returns(bool) {
        bool _success = ERC20.transferFrom(from, to, amount);
        emit TokenBalance(to, IERC20(address(this)).balanceOf(to));
        emit TokenBalance(from, IERC20(address(this)).balanceOf(from));
        return _success;
    }

    function burnLoserTokens(address from, uint value) external onlyFactory {
        _burn(from, value);
        emit TokenBalance(from, IERC20(address(this)).balanceOf(from));
    }


    modifier onlyFactory () {
        if (msg.sender != factory) revert CallerNotFactory();
        _;
    }


}