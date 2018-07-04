if('serviceWorker' in navigator){
    console.log('Puedes usar los services workers en tu navegador');
    
    navigator.serviceWorker.register('./sw.js') 
            .then(res=>console.log('Service worker cargado correctamente',res))
            .catch (err=>console.log ('Service worker no se ha podido registrar',err));
     
    }else{
        console.log('No puedes usar los serviceWorker en tu navegador');
    }


