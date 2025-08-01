import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { BookSliderComponent } from 'src/app/shared/components/book-slider/book-slider.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

}
