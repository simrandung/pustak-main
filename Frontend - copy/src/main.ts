import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/core/interceptor/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations()
]
})
.catch(err => console.error(err));
