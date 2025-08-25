import { Component, OnInit } from '@angular/core';
import { BeachService } from '../../../../core/services/beach.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-beach',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-beach.component.html',
  styleUrls: ['./edit-beach.component.css'],
})
export class EditBeachComponent implements OnInit {
  beachForm!: FormGroup;
  loading = true;
  beachId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private beachService: BeachService
  ) {}

  ngOnInit(): void {
    this.beachId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadBeachData();
  }

  private initForm(): void {
    this.beachForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private loadBeachData(): void {
    this.beachService.getBeachById(this.beachId).subscribe({
      next: (beach) => {
        this.beachForm.patchValue(beach);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading beach data:', error);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.beachForm.valid) {
      this.beachService
        .updateBeach(this.beachId, this.beachForm.value)
        .subscribe({
          next: () => this.router.navigate(['/beaches']),
          error: (error) => console.error('Error updating beach:', error),
        });
    }
  }
}
