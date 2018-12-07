import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ReportSeasonsComponent } from './report-seasons.component';

import { HomeComponent } from './home.component';
import { PreloadAllModules } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    { path: "report-seasons", component:ReportSeasonsComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,

            {
                enableTracing: false,

                // This will tell Angular to preload the lazy-loaded routes after the
                // application has been bootstrapped. This will extend to both top-level
                // and nested lazy-loaded modules.
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
