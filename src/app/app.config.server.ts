import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [provideRouter(
    routes,
    withViewTransitions({
      skipInitialTransition: true // ? que opmita la primera trasnsaccion
    })
  ),
  importProvidersFrom(
    HttpClientModule
  )
]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
