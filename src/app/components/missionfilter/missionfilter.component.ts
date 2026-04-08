import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <section class="filter-shell">
      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>Launch year</mat-label>
        <input
          matInput
          [(ngModel)]="filterYear"
          placeholder="Enter a launch year"
          autocomplete="off"
        />
      </mat-form-field>

      <div class="filter-actions">
        <button mat-flat-button color="primary" (click)="applyFilter()">
          Search
        </button>
        <button mat-button (click)="clearFilter()">
          Clear
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .filter-shell {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        padding: 1rem 0;
      }

      .filter-field {
        flex: 0 0 260px;
        width: 260px;
        min-width: 220px;
      }

      ::ng-deep .filter-field .mat-form-field-flex {
        min-height: 36px;
        height: 36px;
        background: lightgray !important;
      }

      .filter-field .mat-form-field-infix {
        padding: 0 0.5rem;
        background: lightgray !important;
      }

      mat-form-field .mat-form-field-label {
        color: white;
      }

      input.mat-input-element {
        color: white !important;
        background: lightgray !important;
        border: 1px solid white;
      }

      input.mat-input-element::placeholder {
        color: white;
        opacity: 0.7;
      }

      ::ng-deep.filter-field .mat-mdc-text-field-wrapper {
        background: lightgray !important;
      }

      .mat-form-field-outline {
        color: white;
      }

      .mat-form-field-outline-thick {
        color: white;
      }

      mat-form-field {
        width: 100%;
      }

      .mat-mdc-form-field {
        width: 100%;
      }

      .mat-mdc-text-field-wrapper {
        padding-bottom: 0;
      }

      .mat-mdc-form-field-infix {
        padding-top: 0;
        padding-bottom: 0;
      }

      .filter-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        align-items: stretch;
      }

      .filter-actions button {
        min-height: 36px;
        height: 36px;
        padding: 0 1rem;
      }
    `
  ]
})
export class MissionFilterComponent {
  filterYear = '';

  @Output()
  yearChanged = new EventEmitter<string>();

  applyFilter(): void {
    this.yearChanged.emit(this.filterYear.trim());
  }

  clearFilter(): void {
    this.filterYear = '';
    this.yearChanged.emit('');
  }
}
