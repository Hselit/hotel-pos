import { Clock, Pizza, Search } from 'lucide-react'
import './App.css'
import { SideBarComponent } from './components/SideBarComponent'

import menuData from './data/menu.json'
import { useEffect, useState } from 'react'
import { MenuComponent } from './components/MenuComponent'

function App() {

  const categories = ["All",...new Set(menuData.map((item) => item.category))]

  const [selectedCategory,setSelectedCateogry] = useState("All");
  const [searchTerm,setSearchTerm] = useState("");
  
  const [cart,setCart] = useState(() => {
    const savedCart = localStorage.getItem("hotel-cart-items");
    return savedCart ? JSON.parse(savedCart) : [];
  })

  const updateCart = (item:any,quantity:any) =>{
    setCart((prev:any) =>{
      const existingItem = prev.find((i:any) => i.id === item.id);
      if(existingItem){
        const newQty = existingItem.quantity + quantity;
        if(newQty <= 0) return prev.filter((i:any) => i.id !== item.id)
          return prev.map((i: { id: any }) => (i.id === item.id ? {
        ...i,quantity:newQty}: i))
      }
      if(quantity>0) return [...prev,{...item,quantity:1}]
    })
  }

  const clearCart = () => {
    if(window.confirm("Clear all items from cart?")) {
      setCart([]);
    }
  }

  const filteredMenu = menuData.filter((item) =>{
    const matchedCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchedSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchedCategory && matchedSearch;
  })



  useEffect(()=> {
    localStorage.setItem("hotel-cart-items",JSON.stringify(cart))
  },[cart])

  return (
    <>
      <div className='flex h-screen bg-slate-50 overflow-hidden'>
        <main className='flex-1 flex flex-col min-w-0'>
          
          {/* header */}
          <header className='bg-white border-b border-slate-200 p-6 flex item-center justify-between'>
            <div className='flex items-center'>
              <div>
                <h1 className='text-2xl font-black tracking-tight flex items-center gap-2 text-orange-500 mb-2'>
                  <Pizza size={32}/> T K HOTEL
                </h1>
                  <p className='text-slate-400 text-sm font-medium'>Traditional Restaurant</p>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <button className='flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-bold text-sm'>
                <Clock />
                History
              </button>
              <div className='relative'>
                <Search className='absolute top-2.5 left-2 w-4 h-4'/>
                <input type='text' className='pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-slate-900 w-64 transition-all' placeholder='Search food' onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}/>
              </div>
            </div>
          </header>

          {/* category */}
          <div className='p-6 overflow-x-auto bg-white border-b border-slate-100 no-scrollbar'>
            <div className='flex space-x-2'>
              {categories.map((cat,index)=> (
                <button className={`rounded-xl text-sm font-bold px-5 py-2 transition-sall ${selectedCategory === cat ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`} key={index} onClick={() => setSelectedCateogry(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          {/* Food Items */}
          <div className='flex-1 overflow-y-auto p-6 custom-scrollbar'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {filteredMenu.map((item) => (
                  <MenuComponent key={item.id} item={item} onUpdate={updateCart}/>
                ))}
            </div>
          </div>
        </main>

        <aside>
          <SideBarComponent cart={cart} onUpdate={updateCart} onClear={clearCart}/>
        </aside>
      </div>      
    </>
  )
}

export default App
