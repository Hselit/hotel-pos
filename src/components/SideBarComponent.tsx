import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";

export const SideBarComponent = ({cart, onClear,onUpdate}:any) => {

  const subtotal = cart.reduce((sum: number,item: { price: number; quantity: number; }) => sum + item.price * item.quantity,0);

  const tax = subtotal * 0.05;
  const total = subtotal + tax

  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 shadow-xl">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">New Order</h2>
        <button onClick={() => onClear()} className="text-xs text-rose-500 font0medium hover:bg-rose-50 px-3 py-1 rounded-full transition-colors flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {cart.length === 0 ? <>
          <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <ShoppingBasket />
              <p className="font-medium">Your Cart is Empty</p>
            </div>
          </div>
        </> : (
        <div className="space-y-4">
          {
            cart.map((item:any) => (
              <div key={item.id} className="flex items-center justify-between group">
                <div className="flex-1">
                   <h4 className="font-medium text-slate-700 text-sm">{item.name}</h4>
                   <p className="text-xs text-slate-400">${item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="cursor-pointer w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-red-200 text-slate-600" onClick={() => onUpdate(item,-1)}>
                    <Minus className="w-3 h-3"/>
                  </button>
                  <span className="w-6 text-center text-sm font-bold" >{item.quantity}</span>
                  <button className="cursor-pointer w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-green-200 text-slate-600" onClick={() => onUpdate(item,1)}>
                    <Plus  className="w-3 h-3"/>
                  </button>
                </div>
              </div>
            ))
          }  
        </div>
        )}

      </div>

      <div className="p-6 bg-slate-50 border-t border0slate-100 space-y-3">
        <div className="flex justify-between text-sm text-slate-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-slate-500">
          <span>GST (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>
    </div>
  )
}
