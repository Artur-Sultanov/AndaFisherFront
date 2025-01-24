import { Component, OnInit } from '@angular/core';
import { BeachService } from '../../../../core/services/beach.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-beach',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './delete-beach.component.html',
  styleUrl: './delete-beach.component.css',
})
export class DeleteBeachComponent implements OnInit {
  beaches: any[] = [];
  beachToDelete: number | null = null;
  showConfirmModal: boolean = false;

  constructor(private beachService: BeachService, private router: Router) {}

  ngOnInit(): void {
    this.beachService.getBeaches().subscribe((beaches: any[]) => {
      this.beaches = beaches;
    });
  }

  confirmDelete(id: number): void {
    this.beachToDelete = id;
    this.showConfirmModal = true;
  }

  cancelDelete(): void {
    this.beachToDelete = null;
    this.showConfirmModal = false;
  }

  deleteBeach(): void {
    if (this.beachToDelete !== null) {
      this.beachService.deleteBeach(this.beachToDelete).subscribe({
        next: () => {
          this.beaches = this.beaches.filter(
            (beach) => beach.id !== this.beachToDelete
          );
          this.cancelDelete();
        },
        error: (error) => {
          console.error('Error deleting beach', error);
        },
      });
    }
  }
}
