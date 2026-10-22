

export default function Flight() {

    
type FlightDetail = {
  value: string;
  label: string;
};

const lastgrid: FlightDetail[] = [
  { value: "8", label: "Gate" },
  { value: "6", label: "Seat" },
  { value: "3", label: "Terminal" },
  { value: "AC006", label: "Flight" },
];
            


  return (





<main className="mx-auto max-w-4xl px-4 py-3">
 

      <section className="border p-8 rounded-2xl border-[#B22459]">
      
          <div className="text-sm text-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">🔴 Air Canada</p>
                <p className="mt-3 font-semibold">07h05</p>
                <p className="text-xs text-slate-500 mt-2">YUL</p>
              </div>

              <div className="text-center text-slate-500">
                <span aria-hidden="true">✈</span>
                <p className="text-xs">13h00</p>
              </div>

              <div className="text-right">
                <p>December 16th, 2022</p>
                <p className="mt-3 font-semibold">20h05</p>
                <p className="text-xs text-slate-500 mt-2">NRT</p>
              </div>
            </div>

        

<div className="mt-3 grid grid-cols-4  border-t pt-3 text-center">
  {lastgrid.map(({ value, label }) => (
    <div key={label}>
      <p className="text-slate-500">{value}</p>
      <p className="mt-1 text-xs">{label}</p>
    </div>
  ))}
</div>

            </div>
       
       
      </section>
    </main>
  );



}




