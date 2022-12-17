import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import AddTransaction from './AddTransaction';

const TransactionPage = () => {
  const transactionCtx = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-between items-start p-4">
      <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full eth-card white-glassmorphism">
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
            <BsInfoCircle fontSize={17} color="#fff" />
          </div>
          <>
            {!transactionCtx?.currentAccount && (
              <button
                type="button"
                onClick={transactionCtx?.connectWallet}
                className="flex flex-row justify-center items-center my-1 bg-[#2952e3] p-2 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-sm font-semibold">
                  Connect Wallet
                </p>
              </button>
            )}
            {transactionCtx?.currentAccount &&
              <p className="text-white font-semibold text-lg mt-1">
                Ethereum:
                <span className="text-white font-light text-sm mx-2">
                  {shortenAddress(transactionCtx?.currentAccount)}
                </span>
              </p>
            }
          </>
        </div>
      </div>
      <AddTransaction />
    </div>
  );
};

export default TransactionPage;
