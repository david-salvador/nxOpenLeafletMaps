export interface Place {
    id: string; //"place_id": "222020122",
    name: string; //"display_name": "Carrer de Montant, la Nova Esquerra de l'Eixample, Eixample, Barcelona, Barcelonés, Barcelona, Cataluña, 08014, España",
    bBox: number[]
    //   [
    //     "41.376089",    //bly lat
    //     "41.3769069",   //try lat
    //     "2.1519537",    //blx lon
    //     "2.1530324"     //trx lon
    //   ],
    lat: number; //0"41.3768435",
    lon: number; //"2.1520373",
    type: string; // residential, bus_stop, ...
  }