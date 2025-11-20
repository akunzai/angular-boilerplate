import { Provider } from '@angular/core';
import { TranslateLoader, TranslationObject, provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation(): Observable<TranslationObject> {
    return of({});
  }
}

export const provideTranslateTesting = (): Provider[] => [
  provideTranslateService({
    loader: provideTranslateLoader(FakeTranslateLoader)
  })
];
