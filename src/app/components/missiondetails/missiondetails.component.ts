import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <section class="details-shell">
      <button mat-button color="primary" [routerLink]="['/']">
        Back to list
      </button>

      <div *ngIf="loading" class="loading-shell">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <mat-card *ngIf="mission" class="details-card">
        <div class="details-header">
          <img
            *ngIf="mission.links.mission_patch_small"
            [src]="mission.links.mission_patch_small"
            [alt]="mission.mission_name"
          />
          <div>
            <h1>{{ mission.mission_name }}</h1>
            <p class="meta">Flight #{{ mission.flight_number }} • {{ mission.launch_year }}</p>
          </div>
        </div>

        <p class="mission-description">{{ mission.details || 'No extended details available.' }}</p>

        <div class="info-group">
          <div>
            <h2>Rocket</h2>
            <p>{{ mission.rocket.rocket_name }} • {{ mission.rocket.rocket_type }}</p>
          </div>
          <div>
            <h2>Links</h2>
            <p *ngIf="mission.links.article_link"><a href="{{ mission.links.article_link }}" target="_blank" rel="noreferrer">Article</a></p>
            <p *ngIf="mission.links.wikipedia"><a href="{{ mission.links.wikipedia }}" target="_blank" rel="noreferrer">Wikipedia</a></p>
            <p *ngIf="mission.links.video_link"><a href="{{ mission.links.video_link }}" target="_blank" rel="noreferrer">Video</a></p>
          </div>
        </div>
      </mat-card>

      <p *ngIf="!loading && !mission && !error" class="empty-state">Mission details are unavailable.</p>
      <p *ngIf="error" class="error-message">{{ error }}</p>
    </section>
  `,
  styles: [
    `
      .details-shell {
        padding: 1rem;
        max-width: 900px;
        margin: 0 auto;
      }

      .loading-shell {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
      }

      .details-card {
        display: grid;
        gap: 1.25rem;
        padding: 1.5rem;
      }

      .details-header {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .details-header img {
        width: 90px;
        height: 90px;
        object-fit: contain;
        border-radius: 8px;
        border: 1px solid gray;
      }

      .details-header h1 {
        margin: 0;
        font-size: 2rem;
      }

      .meta {
        margin: 0.5rem 0 0;
        color: white;
      }

      .mission-description {
        margin: 0;
        color: white;
        white-space: pre-line;
      }

      .info-group {
        display: grid;
        gap: 1.25rem;
      }

      .info-group h2 {
        margin: 0 0 0.5rem 0;
      }

      .info-group a {
        color: white;
        text-decoration: none;
      }

      .error-message,
      .empty-state {
        margin-top: 1rem;
        font-weight: 600;
        color: #d32f2f;
      }
    `
  ]
})
export class MissionDetailsComponent implements OnInit {
  mission?: Launch;
  loading = false;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly spacexService: SpacexService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.error = 'Invalid mission identifier.';
        return;
      }

      this.loading = true;
      this.error = '';

      this.spacexService.getLaunchById(id).subscribe({
        next: (mission) => {
          this.mission = mission;
          this.loading = false;
        },
        error: () => {
          this.error = 'Unable to load mission details at this time.';
          this.loading = false;
        }
      });
    });
  }
}
