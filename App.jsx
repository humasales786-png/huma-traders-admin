import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { ShoppingCart, Users, Package, Printer, Plus } from 'lucide-react';

const firebaseConfig = {
  apiKey: "AIzaSyCl2Vx9dQsuXx306hj-mefwwp84IljlUVU",
  authDomain: "huma-traders.firebaseapp.com",
  projectId: "huma-traders",
  storageBucket: "huma-traders.firebasestorage.app",
  messagingSenderId: "133803780128",
  appId: "1:133803780128:web:8fc1a5a46e5ace7da2f445",
  measurementId: "G-YFH9WE747W"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [activeTab, setActiveTab] = useState('pos');
  const [items] = useState([
    { id: 1, name: 'Toor Dal (Loose)', price: 135, unit: 'kg', stock: 250 },
    { id: 2, name: 'Sugar (Mandi Special)', price: 42, unit: 'kg', stock: 500 },
    { id: 3, name: 'Groundnut Oil (15L)', price: 2450, unit: 'tin', stock: 40 },
    { id: 4, name: 'Wheat Lokwan', price: 38, unit: 'kg', stock: 1200 }
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-emerald-700 text-white p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">HUMA TRADERS - Solapur</h1>
          <p className="text-xs text-emerald-200">Wholesale Grocery & POS Admin System</p>
        </div>
      </header>

      <nav className="bg-white border-b flex justify-around p-2 text-sm font-medium">
        <button onClick={() => setActiveTab('pos')} className={`flex items-center gap-1 p-2 rounded-lg ${activeTab === 'pos' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-gray-600'}`}>
          <ShoppingCart size={18} /> POS Counter
        </button>
        <button onClick={() => setActiveTab('inventory')} className={`flex items-center gap-1 p-2 rounded-lg ${activeTab === 'inventory' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-gray-600'}`}>
          <Package size={18} /> Inventory & Mandi
        </button>
      </nav>

      <main className="p-4 max-w-4xl mx-auto">
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Package size={18} /> Items
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">₹{item.price}/{item.unit}</p>
                    </div>
                    <button onClick={() => addToCart(item)} className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                      <Plus size={14} /> Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-gray-700 mb-3">Current Bill</h2>
                {cart.map(c => (
                  <div key={c.id} className="flex justify-between text-sm border-b pb-1 mb-1">
                    <span>{c.name} x {c.qty}</span>
                    <span className="font-semibold">₹{c.price * c.qty}</span>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="border-t pt-3 mt-4">
                  <div className="flex justify-between font-bold text-lg mb-3">
                    <span>Total:</span>
                    <span className="text-emerald-700">₹{totalAmount}</span>
                  </div>
                  <button onClick={() => alert("Printing Bill...")} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                    <Printer size={18} /> Print Thermal Bill
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
