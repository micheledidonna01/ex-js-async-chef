async function getChefBirthday(id){

    let ricetta;
    try{
        let prendiRicetta = await fetch(`https://dummyjson.com/recipes/${id}`);
        ricetta =  await prendiRicetta.json();
        // ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`);
    }catch(error){
        throw new Error("Ricetta con id: " + id + " non trovata");
    }

    if(ricetta.message){
        throw new Error(ricetta.message);
    }


    let chef;
    try{
        let prendiChef = await fetch(`https://dummyjson.com/users/${ricetta.userId}`);
        chef = await prendiChef.json();
        // chef = await fetchJson(`https://dummyjson.com/users/${ricetta.userId}`);
    }catch{
        throw new Error("Chef con id: " + ricetta.userId + " non trovato");
    }

    if(chef.message){
        throw new Error(chef.message);
    }

    chef.birthDate = chef.birthDate.replaceAll("-", "/");
    
    return {chefBirthday: chef.birthDate};
}

// async function fetchJson(url){
//     const response = await fetch(url);
//     const obj = await response.json();
//     return obj;
// }

(async () => {
    try{
        const birthDateChef = await getChefBirthday(1);
        console.log(birthDateChef);
    }catch(error){
        console.error("Errore durante il recupero dei dati:", error);
    }

})();