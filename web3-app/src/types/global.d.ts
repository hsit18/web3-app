export { };

declare global {

    interface Window {
        ethereum: any;
    }

    interface ITransaction {
        addressTo: string;
        amount: number;
        keyword: string;
        message: string;
        addressFrom?: string;
        timestamp?: string;
    }

    interface ITransactionContext {
        currentAccount: unknown;
        connectWallet: () => void;
        sendTransaction: (formData: ITransaction) => void;
        isLoading: boolean;
        transactions: Array<ITransaction>
    }
}