import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    public variables: VariablesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/login']);
  }

}
