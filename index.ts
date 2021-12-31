import './style.css';

import {
  of,
  map,
  Observable,
  from,
  OperatorFunction,
  pipe,
  tap,
  MonoTypeOperatorFunction,
  ObservedValueOf,
  ObservableInput,
} from 'rxjs';
import { switchMap, toArray } from 'rxjs/operators';
type Cod = { codice: string; value: string };

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.
const obs$ = <T, K>(
  listauno: any[],
  listadue: any[]
): OperatorFunction<T[], K[]> => {
  return (input$: Observable<T[]>) =>
    input$.pipe(
      //tap(console.log),
      switchMap<T[],ObservableInput<T>>(lista => lista),
      map<T, K>((test) => {
        let cambio = listauno.find((item) => item.codice === test['codice']);
        if (cambio) {
          return cambio;
        } else {
          return test;
        }
      }),
      testTwo('proviamo con tag due'),
      toArray<K>()
    );
};

const testOne = <T>(
  tag?: string
): ((sorce$: Observable<T>) => Observable<T>) => {
  return (source$: Observable<T>) =>
    source$.pipe(
      tap((value) =>
        console.log((tag ? tag : 'nessun tag') + ' ' + JSON.stringify(value))
      )
    );
};

const testTwo = <T>(tag?: string): MonoTypeOperatorFunction<T> => {
  return (source$: Observable<T>) =>
    source$.pipe(
      tap((value) =>
        console.log(tag ? tag + JSON.stringify(value) : JSON.stringify(value))
      )
    );
};

let listaUno = [
  { codice: 'uno', value: 'cambio uno' },
  { codice: 'due', value: 'cambio due' },
  { codice: 'tre', value: 'cambio tre' },
  { codice: 'quattro', value: 'cambio quattro' },
  { codice: 'cinque', value: 'cambio cinque' },
];

of([
  { codice: 'uno', value: 'descrizione uno' },
  { codice: 'due', value: 'descrizione due' },
  { codice: 'tre', value: 'descrizione tre' },
  { codice: 'quattro', value: 'descrizione quattro' },
  { codice: 'sei', value: 'descrizione cinque' },
])
  .pipe(obs$(listaUno, listaUno), testOne('provimao'))
  .subscribe(console.log);
