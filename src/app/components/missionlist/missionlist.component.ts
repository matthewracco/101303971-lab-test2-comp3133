import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MissionFilterComponent],
  template: `
    <section class="page-shell">
      <header class="header-block">
        <div>
          <h1>SpaceX Mission List</h1>
          <p>Browse SpaceX launches and filter by launch year.</p>
        </div>
      </header>

      <app-missionfilter (yearChanged)="filterMissions($event)"></app-missionfilter>

      <div *ngIf="loading" class="loading-shell">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <p *ngIf="error" class="error-message">{{ error }}</p>

      <p *ngIf="!loading && missions.length === 0" class="empty-state">
        No missions were found for this year.
      </p>

      <section class="mission-grid">
        <mat-card *ngFor="let mission of missions" class="mission-card">
          <div class="mission-head">
            <img
              *ngIf="mission.links.mission_patch_small"
              [src]="mission.links.mission_patch_small"
              [alt]="mission.mission_name"
            />
            <div>
              <h2>{{ mission.mission_name }}</h2>
              <p class="meta">Flight #{{ mission.flight_number }} • {{ mission.launch_year }}</p>
            </div>
          </div>

          <p class="mission-details">{{ mission.details || 'Details unavailable for this launch.' }}</p>

          <div class="mission-info">
            <strong>Rocket:</strong>
            <span>{{ mission.rocket.rocket_name }} • {{ mission.rocket.rocket_type }}</span>
          </div>

          <div class="mission-links">
            <a *ngIf="mission.links.article_link" href="{{ mission.links.article_link }}" target="_blank" rel="noreferrer">Article</a>
            <a *ngIf="mission.links.wikipedia" href="{{ mission.links.wikipedia }}" target="_blank" rel="noreferrer">Wikipedia</a>
            <a *ngIf="mission.links.video_link" href="{{ mission.links.video_link }}" target="_blank" rel="noreferrer">Video</a>
          </div>

          <div class="card-actions">
            <button mat-flat-button color="primary" [routerLink]="['/missions', mission.flight_number]">
              View Details
            </button>
          </div>
        </mat-card>
      </section>
    </section>
  `,
  styles: [
    `
      .page-shell {
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header-block {
        margin-bottom: 1rem;
      }

      .header-block h1 {
        margin: 0 0 0.25rem 0;
        font-size: 2rem;
      }

      .header-block p {
        margin: 0;
        color: white;
      }

      .loading-shell {
        display: flex;
        justify-content: center;
        margin: 2rem 0;
      }

      .error-message,
      .empty-state {
        margin: 1rem 0;
        color: #d32f2f;
        font-weight: 600;
      }

      .mission-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }

      .mission-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: darkslategray;
        border: 1px solid gray;
      }

      .mission-head {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .mission-head img {
        width: 72px;
        height: 72px;
        object-fit: contain;
        border-radius: 8px;
        background: #2f2f3d;
        border: 1px solid gray;
      }

      .mission-head h2 {
        margin: 0;
        font-size: 1.25rem;
      }

      .meta {
        margin: 0.25rem 0 0;
        font-size: 0.95rem;
        color: white;
      }

      .mission-details {
        margin: 0;
        min-height: 3rem;
        color: white;
      }

      .mission-info {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        font-size: 0.95rem;
      }

      .mission-links {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .mission-links a {
        color: white;
        font-weight: 600;
        text-decoration: none;
      }

      .card-actions {
        margin-top: auto;
      }
    `
  ]
})
export class MissionListComponent implements OnInit {
  missions: Launch[] = [];
  loading = false;
  error = '';

  constructor(private readonly spacexService: SpacexService) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  filterMissions(year: string): void {
    this.loadMissions(year);
  }

  private loadMissions(year?: string): void {
    this.loading = true;
    this.error = '';

    this.spacexService.getLaunches(year).subscribe({
      next: (missions) => {
        this.missions = missions;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load missions. Please try again later.';
        this.loading = false;
      }
    });
  }
}
