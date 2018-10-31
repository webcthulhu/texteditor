import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FileComponent} from './file/file.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {TextService} from './text-service/text.service';
import {HttpClientModule} from '@angular/common/http';
import {ActionService} from './action-service/action.service';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ControlPanelComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ActionService,
    TextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
