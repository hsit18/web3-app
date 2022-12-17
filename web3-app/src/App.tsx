import Header from './components/Header';
import Transactions from './components/Transactions';
import TransactionPage from './components/TransactionPage';

function App() {
  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Header />
        <TransactionPage />
      </div>
      <Transactions />
    </div>
  )
}

export default App
