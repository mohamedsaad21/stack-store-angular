import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { UpdateProduct } from "./components/update-product/update-product";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, UpdateProduct],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('StackStore');
}

