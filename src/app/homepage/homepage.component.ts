import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SidebarComponent, AppComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
