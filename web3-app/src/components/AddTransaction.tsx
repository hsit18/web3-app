import React, { FormEvent } from 'react';
import Input from './Input';
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";

const AddTransaction = () => {
    const [formData, setFormData] = React.useState<ITransaction>({ addressTo: '', amount: '', keyword: '', message: '' });
    const { sendTransaction, isLoading } = React.useContext(TransactionContext);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: e.target.value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { addressTo, amount, keyword, message } = formData;
        if (!addressTo || !amount || !keyword || !message) return;
        sendTransaction(formData);
    };

    return (
        <div className="p-3 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
                ? <Loader />
                : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                    >
                        Send now
                    </button>
                )}
        </div>
    )
}

export default AddTransaction;