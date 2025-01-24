import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BeachService } from '../../../../core/services/beach.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-beach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-beach.component.html',
  styleUrl: './add-beach.component.css',
})
export class AddBeachComponent {
  beach = {
    name: '',
    location: '',
    description: '',
  };

  constructor(private beachService: BeachService, private router: Router) {}

  addBeach(beachForm: NgForm): void {
    if (beachForm.invalid) {
      return;
    }
    this.beachService.createBeach(this.beach).subscribe({
      next: (beach) => {
        beachForm.resetForm();
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }
}
