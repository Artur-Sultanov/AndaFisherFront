import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BeachService } from '../../../services/beach.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fish-to-beach-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-fish-to-beach-list.component.html',
  styleUrl: './add-fish-to-beach-list.component.css',
})
export class AddFishToBeachListComponent implements OnInit {
  beaches: any[] = [];

  constructor(private beachService: BeachService, private router: Router) {}

  ngOnInit(): void {
    this.beachService.getBeaches().subscribe((beaches: any[]) => {
      this.beaches = beaches;
    });
  }

  selectBeach(beachId: number): void {
    this.router.navigate(['/add-fish-to-beach', beachId]);
  }
}
