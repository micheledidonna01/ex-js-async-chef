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

    // Formattazione della data di nascita del chef
    let formatDate = dayjs(chef.birthDate).format('YYYY/MM/DD');
    console.log(typeof chef.birthDate); // Controllo del tipo di dato
    return formatDate;
}

// async function fetchJson(url){
//     const response = await fetch(url);
//     const obj = await response.json();
//     return obj;
// }

(async () => {
    try{
        const birthDateChef = await getChefBirthday(1);
        console.log("il compleanno dello chef è:", birthDateChef);
    }catch(error){
        console.error("Errore durante il recupero dei dati:", error);
    }

})();