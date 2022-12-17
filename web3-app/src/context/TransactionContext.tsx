import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext<ITransactionContext | null>(null);

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(provider, signer, transactionContract);
    return transactionContract;

}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState<string | null>(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState<Array<ITransaction>>([]);

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Please install metamask extenstion !!!");
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts);
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
            getAllTransactions();
        } else {
            console.log("No account available ...");
        }
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask extenstion !!!");
            const transactionsContract = getEthereumContract();
            const allTransactions = await transactionsContract.getAllTransactions();
            console.log(allTransactions);
            setTransactions(allTransactions.map((transaction: any) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            })));
        } catch (err) {
            console.error(err);
            throw new Error("no ethereum object");
        }
    }

    const checkIfTransactionExist = async () => {
        try {
            if (!ethereum) return alert("Please install metamask extenstion !!!");
            const transactionsContract = getEthereumContract();
            const transactionCount = await transactionsContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (err) {
            console.error(err);
            throw new Error("no ethereum object");
        }
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask extenstion !!!");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account available ...");
            }
        } catch (err) {
            console.error(err);
            throw new Error("no ethereum object");
        }
    }

    const sendTransaction = async (formData: ITransaction) => {
        try {
            if (ethereum) {
                const { addressTo, amount, keyword, message } = formData;
                const transactionsContract = getEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount.toString());

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                });

                const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                const transactionsCount = await transactionsContract.getTransactionCount();

                setTransactionCount(transactionsCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, []);

    return (
        <TransactionContext.Provider value={{ currentAccount, connectWallet, sendTransaction, isLoading, transactions }}>
            {children}
        </TransactionContext.Provider>
    )
}