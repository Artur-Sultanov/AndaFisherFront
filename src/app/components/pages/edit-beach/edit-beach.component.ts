import { Component, OnInit } from '@angular/core';
import { BeachService } from '../../../services/beach.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-beach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-beach.component.html',
  styleUrl: './edit-beach.component.css',
})
export class EditBeachComponent implements OnInit {
  beach: any = {
    id: null,
    name: '',
    location: '',
    description: '',
  };

  constructor(
    private beachService: BeachService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.beachService.getBeach(id).subscribe({
        next: (beach) => {
          this.beach = beach;
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
    }
  }
  editBeach(beachForm: NgForm): void {
    if (beachForm.invalid) {
      return;
    }
    this.beachService.updateBeach(this.beach.id, this.beach).subscribe({
      next: () => {
        beachForm.resetForm();
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error updating beach', error);
      },
    });
  }
}
