import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BeachService } from '../../../services/beach.service';
import { FishService } from '../../../services/fish.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-fish-to-beach',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-fish-to-beach.component.html',
  styleUrl: './add-fish-to-beach.component.css',
})
export class AddFishToBeachComponent implements OnInit {
  beach: any = {};
  fishList: any[] = [];
  selectedFish: any = null;

  constructor(
    private beachService: BeachService,
    private fishService: FishService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const beachId = this.route.snapshot.paramMap.get('id');
    if (beachId) {
      this.beachService.getBeach(beachId).subscribe((beach) => {
        this.beach = beach;
      });
      this.fishService.getFishes().subscribe((fishes: any[]) => {
        this.fishList = fishes;
      });
    }
  }

  selectFish(fish: any): void {
    this.selectedFish = fish;
  }

  addFishToBeach(): void {
    if (this.selectedFish && this.beach.id) {
      this.beachService
        .addFishToBeach(this.beach.id, this.selectedFish.id)
        .subscribe({
          next: () => {
            this.selectedFish = null;
            alert('Fish added successfully!');
          },
          error: (error) => {
            console.error('Error adding fish to beach', error);
          },
        });
    }
  }
}
