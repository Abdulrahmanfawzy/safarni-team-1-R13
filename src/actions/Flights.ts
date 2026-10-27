export const SearchFlightsAction = async (data:any)=> { 

    
    const response = await fetch(`${process.env.API}/api/flights`, { 
    
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        }, 
        body :JSON.stringify(data)
    })
    return await response.json()
}

