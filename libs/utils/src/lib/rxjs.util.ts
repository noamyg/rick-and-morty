import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

export const skipInitial = () => <T>(source: Observable <T>): Observable<T> => source.pipe(skipWhile(value => value === undefined));

export const skipNull = () => <T>(source: Observable <T>): Observable<T> => source.pipe(skipWhile(value => value == null));
