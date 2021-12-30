import './style.css';

import { of, map, Observable, from, OperatorFunction, pipe, tap } from 'rxjs';
import { toArray } from 'rxjs/operators';
type Cod = { codice: string; value: string };

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.
const obs$ = <T, K>(
  listauno: any[],
  listadue: any[]
): OperatorFunction<T, K[]> => {
  return (input$: Observable<T>) =>
    input$.pipe(
      //tap(console.log),
      map<T, K>((test) => {
        let cambio = listauno.find((item) => item.codice === test['codice']);
        if (cambio) {
          return cambio;
        } else {
          return test;
        }
      }),
      toArray<K>()
    );
};
let listaUno = [
  { codice: 'uno', value: 'cambio uno' },
  { codice: 'due', value: 'cambio due' },
  { codice: 'tre', value: 'cambio tre' },
  { codice: 'quattro', value: 'cambio quattro' },
  { codice: 'cinque', value: 'cambio cinque' },
];

from([
  { codice: 'uno', value: 'descrizione uno' },
  { codice: 'due', value: 'descrizione due' },
  { codice: 'tre', value: 'descrizione tre' },
  { codice: 'quattro', value: 'descrizione quattro' },
  { codice: 'sei', value: 'descrizione cinque' },
])
  .pipe(obs$(listaUno, listaUno))
  .subscribe(console.log);
