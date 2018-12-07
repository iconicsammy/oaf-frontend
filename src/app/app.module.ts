import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ApiService } from "./services/api.service";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { ReportSeasonsComponent } from "./report-seasons.component";
import { NavMenuComponent } from "./components/nav-menu.component";
import { HomeComponent } from "./home.component";
import { PaymentFlowComponent } from './components/payment-flow.component';
@NgModule({
  declarations: [
    AppComponent,
    ReportSeasonsComponent,
    NavMenuComponent,
    HomeComponent,
    PaymentFlowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
