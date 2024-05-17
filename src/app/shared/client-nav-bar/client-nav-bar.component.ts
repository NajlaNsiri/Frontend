import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrls: ['./client-nav-bar.component.scss']
})
export class ClientNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  lougout(){
    this.router.navigate(['/']);
  }
}
